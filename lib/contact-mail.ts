export type ContactMailInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const LOGO_URL = "https://meshiden.jp/mail/wordmark.png";

const FONT = "Roboto, Arial, 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif";
const SUBJECT = "【飯田優斗】お問い合わせを受け付けました";
const PREVIEW = "お問い合わせを受け付けました。内容を確認のうえ、改めてご連絡いたします。";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const multiline = (value: string) => escapeHtml(value).replace(/\n/g, "<br>");

function formatReceivedAt(date: Date): string {
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}年${get("month")}月${get("day")}日 ${get("hour")}:${get("minute")}`;
}

function detail(label: string, valueHtml: string): string {
  return `
              <div style="margin:0 0 20px;">
                <div style="font-size:12px; line-height:16px; color:#5f6368; margin:0 0 4px;">${label}</div>
                <div style="font-size:14px; line-height:22px; color:#202124;">${valueHtml}</div>
              </div>`;
}

function buildHtml(input: ContactMailInput, receivedAt: string, year: string): string {
  const details = [
    detail("氏名・組織名", escapeHtml(input.name)),
    detail("メールアドレス", escapeHtml(input.email)),
    ...(input.phone ? [detail("電話番号", escapeHtml(input.phone))] : []),
    detail("受付日時", receivedAt),
    detail(
      "お問い合わせ内容",
      `<div style="background-color:#f8f9fa; border-radius:8px; padding:12px 16px;">${multiline(input.message)}</div>`,
    ),
  ].join("");

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${SUBJECT}</title>
</head>
<body style="margin:0; padding:0; background-color:#ffffff;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:#ffffff;">
    ${PREVIEW}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; table-layout:fixed;">

          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #dadce0; border-radius:8px; border-collapse:separate; table-layout:fixed;">
                <tr>
                  <td align="center" style="padding:40px 32px 0px; font-family:${FONT};">
                    <h1 style="margin:0 0 20px; font-family:${FONT}; font-size:24px; line-height:32px; font-weight:400; color:#202124;">お問い合わせを受け付けました</h1>
                    <img src="${LOGO_URL}" width="140" height="28" alt="meshiden.jp" style="display:block; margin:0 auto 28px; border:0; outline:none;">
                  </td>
                </tr>
                <tr>
                  <td style="border-top:1px solid #dadce0; padding:28px 32px 16px; font-family:${FONT}; font-size:14px; line-height:22px; color:#202124; word-break:break-word; overflow-wrap:anywhere;">
                    <p style="margin:0 0 16px;">${escapeHtml(input.name)} 様</p>
                    <p style="margin:0 0 24px;">
                      この度はお問い合わせいただき、ありがとうございます。以下の内容で受け付けました。内容を確認のうえ、改めてご連絡いたします。回答までにお時間をいただく場合がございますので、あらかじめご了承ください。
                    </p>${details}
                    <table role="presentation" width="50%" align="center" cellpadding="0" cellspacing="0" border="0" style="width:50%; margin:8px auto 12px;">
                      <tr>
                        <td align="center" style="background-color:#202124; border-radius:8px;">
                          <a href="https://meshiden.jp" style="display:block; padding:10px 24px; font-family:${FONT}; font-size:14px; line-height:20px; font-weight:500; color:#ffffff; text-align:center; text-decoration:none;">サイトを見る</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 8px 0; font-family:${FONT}; font-size:11px; line-height:18px; color:#5f6368; text-align:left;">
              このメールは、お問い合わせフォームの送信を受け付けたことをお知らせするために、自動で送信されました。<br>
              お心当たりのない場合は、恐れ入りますが破棄していただきますようお願いいたします。<br><br>
              &copy; ${year} IIDA Yuto All Rights Reserved.
            </td>
          </tr>

        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(input: ContactMailInput, receivedAt: string): string {
  const rule = "--------------------------------------------------";
  return [
    `${input.name} 様`,
    "",
    "この度はお問い合わせいただき、誠にありがとうございます。",
    "以下の内容でお問い合わせを受け付けました。",
    "内容を確認のうえ、改めてご連絡いたします。回答までにお時間をいただく場合が",
    "ございますので、あらかじめご了承ください。",
    "",
    `■ 受付内容（受付日時：${receivedAt}）`,
    `  氏名・組織名　：${input.name}`,
    `  メールアドレス：${input.email}`,
    ...(input.phone ? [`  電話番号　　　：${input.phone}`] : []),
    "  お問い合わせ内容：",
    ...input.message.split("\n").map((line) => `    ${line}`),
    "",
    "【ご留意事項】",
    "・本メールは自動送信されています。",
    "・ご入力いただいたメールアドレス宛に、内容確認後にご連絡いたします。",
    "",
    rule,
    "飯田優斗",
    "E-mail：contact@meshiden.jp",
    "URL：https://meshiden.jp",
    rule,
    "本メールは、お問い合わせフォームにご入力いただいたメールアドレス宛に",
    "自動送信しています。お心当たりのない場合は、恐れ入りますが破棄していただき",
    "ますようお願いいたします。",
    "",
  ].join("\n");
}

export function buildConfirmationMail(input: ContactMailInput, now: Date = new Date()) {
  const receivedAt = formatReceivedAt(now);
  const year = String(now.getFullYear());
  return {
    subject: SUBJECT,
    text: buildText(input, receivedAt),
    html: buildHtml(input, receivedAt, year),
  };
}
