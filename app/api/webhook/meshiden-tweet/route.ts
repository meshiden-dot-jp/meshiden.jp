import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { TwitterApi } from "twitter-api-v2";

// microCMSカスタム通知の実際のペイロード構造
type MicroCmsWebhookPayload = {
  service: string;
  api: string; // エンドポイント名。例: "articles", "works"
  id: string | null;
  type: "new" | "edit" | "delete";
  contents: {
    old: MicroCmsContentSnapshot | null;
    new: MicroCmsContentSnapshot | null;
  } | null;
};

type MicroCmsContentSnapshot = {
  id: string;
  status: string[]; // "PUBLISH" | "DRAFT" | "CLOSED"
  publishValue: Record<string, unknown> | null;
  draftValue: Record<string, unknown> | null;
};

// APIエンドポイント名ごとの設定
// キーはmicroCMSの「API設定」→「基本情報」に表示される実際のエンドポイント名と一致させる
// （表示名ではなく、URLにも出てくるエンドポイント名なので注意）
const API_ENDPOINT_CONFIG = {
  "tech-blog": { pathPrefix: "blog", label: "記事" },
  work: { pathPrefix: "work", label: "作品" },
} as const;

type ApiEndpoint = keyof typeof API_ENDPOINT_CONFIG;

// 環境変数
const WEBHOOK_SECRET = process.env.MESHIDEN_WEBHOOK_SECRET!;
const SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://meshiden.jp";

function getTwitterClient(): TwitterApi {
  return new TwitterApi({
    appKey: process.env.X_API_KEY!,
    appSecret: process.env.X_API_SECRET!,
    accessToken: process.env.X_ACCESS_TOKEN!,
    accessSecret: process.env.X_ACCESS_TOKEN_SECRET!,
  });
}

export async function GET() {
  // 動作確認用。実際の通知はPOSTで届く
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  // 診断ログ：各環境変数が読み込めているかどうか（値そのものは出さない）
  console.log("ENV CHECK", {
    hasWebhookSecret: !!process.env.MESHIDEN_WEBHOOK_SECRET,
    hasApiKey: !!process.env.X_API_KEY,
    hasApiSecret: !!process.env.X_API_SECRET,
    hasAccessToken: !!process.env.X_ACCESS_TOKEN,
    hasAccessTokenSecret: !!process.env.X_ACCESS_TOKEN_SECRET,
  });

  // 1. 署名の検証
  // カスタム通知の設定画面で「シークレット」に設定した値と同じものを
  // MESHIDEN_WEBHOOK_SECRET に設定しておく
  const rawBody = await req.text();
  const signature = req.headers.get("x-microcms-signature");

  if (!isValidSignature(rawBody, signature)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let payload: MicroCmsWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  // 2. APIエンドポイント名から作品/記事を判定
  const endpoint = payload.api;
  if (!isKnownEndpoint(endpoint)) {
    // 対応していないAPIからの通知は無視する
    console.log(`Webhook skipped: unknown api "${endpoint}"`);
    return NextResponse.json({ skipped: true, reason: `unknown api: ${endpoint}` });
  }

  // 3. 新規公開時のみツイートする
  // typeが"new"でも下書き保存の場合があるため、公開ステータスも確認する
  const newContent = payload.contents?.new;
  const isNewlyPublished =
    payload.type === "new" && newContent?.status.includes("PUBLISH");

  if (!isNewlyPublished || !newContent?.publishValue) {
    console.log(`Webhook skipped: type=${payload.type}, status=${newContent?.status}`);
    return NextResponse.json({ skipped: true, reason: "not a new publish" });
  }

  const title = newContent.publishValue.title as string | undefined;
  const slug = newContent.publishValue.slug as string | undefined;
  if (!title) {
    return NextResponse.json({ error: "title not found in payload" }, { status: 400 });
  }

  const { pathPrefix, label } = API_ENDPOINT_CONFIG[endpoint];
  const contentUrl = `${SITE_BASE_URL}/${pathPrefix}/${slug ?? newContent.id}`;
  const tweetText = buildTweetText(title, contentUrl, label);

  try {
    const twitterClient = getTwitterClient();
    const tweet = await twitterClient.v2.tweet(tweetText);
    return NextResponse.json({ success: true, tweetId: tweet.data.id });
  } catch (err) {
    console.error("Tweet post failed:", err);
    return NextResponse.json({ error: "tweet post failed" }, { status: 500 });
  }
}

function isKnownEndpoint(endpoint: string): endpoint is ApiEndpoint {
  return endpoint in API_ENDPOINT_CONFIG;
}

// x-microcms-signature の検証
// シークレット値とリクエストボディ（生のテキスト）からHMAC-SHA256で計算した値と比較する
function isValidSignature(rawBody: string, signature: string | null): boolean {
  if (!signature || !WEBHOOK_SECRET) return false;

  const expectedSignature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  return (
    signatureBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  );
}

// ツイート文言の組み立て
// X Free枠の文字数上限（280文字）を超えないようにタイトルを丸める
function buildTweetText(title: string, url: string, label: string): string {
  const prefix = `【${label}を更新】\n`;
  const suffix = `\n\n${url}`;
  const maxTitleLength = 280 - prefix.length - suffix.length - 1;
  const trimmedTitle =
    title.length > maxTitleLength ? `${title.slice(0, maxTitleLength - 1)}…` : title;
  return `${prefix}${trimmedTitle}${suffix}`;
}