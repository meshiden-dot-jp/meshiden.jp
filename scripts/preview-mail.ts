import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { buildConfirmationMail, LOGO_URL } from "../lib/contact-mail";

const OUTPUT = "/tmp/mail-preview.html";

const mail = buildConfirmationMail({
  name: "山田太郎",
  email: "taro@example.com",
  phone: "090-1234-5678",
  message: "はじめまして。\nポートフォリオを拝見しました。\nご相談です。",
});

// デプロイ前でもロゴが表示されるよう、プレビューではローカルのファイルを参照する
const localLogo = pathToFileURL(resolve(__dirname, "../public/mail/wordmark.png")).href;
writeFileSync(OUTPUT, mail.html.replaceAll(LOGO_URL, localLogo));

console.log(`件名: ${mail.subject}`);
console.log(`書き出しました: ${OUTPUT}`);
