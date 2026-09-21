export type ContactMailInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const FONT = "Arial, 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif";
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

function detailRow(label: string, valueHtml: string, isLast: boolean): string {
  const border = isLast ? "" : " border-bottom:1px solid #e6e9ee;";
  return `
                <tr>
                  <td width="120" valign="top" style="padding:12px 16px; font-size:14px; color:#6b7280;${border}">${label}</td>
                  <td valign="top" style="padding:12px 16px; font-size:14px;${border}">${valueHtml}</td>
                </tr>`;
}

function buildHtml(input: ContactMailInput, receivedAt: string, year: string): string {
  const rows: [string, string][] = [
    ["氏名・組織名", escapeHtml(input.name)],
    ["メールアドレス", escapeHtml(input.email)],
    ...(input.phone ? ([["電話番号", escapeHtml(input.phone)]] as [string, string][]) : []),
    ["お問い合わせ内容", multiline(input.message)],
  ];
  const detailRows = rows.map(([label, value], i) => detailRow(label, value, i === rows.length - 1)).join("");

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${SUBJECT}</title>
</head>
<body style="margin:0; padding:0; background-color:#eef1f5;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:#eef1f5;">
    ${PREVIEW}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eef1f5;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px; max-width:100%; background-color:#ffffff; border:1px solid #d9dee5;">

          <tr>
            <td style="background-color:#1f3a5f; padding:20px 32px; font-family:${FONT};">
              <div style="font-size:12px; letter-spacing:2px; color:#a9bcd6;">CONTACT</div>
              <div style="font-size:20px; font-weight:bold; color:#ffffff; margin-top:6px;">飯田優斗　ポートフォリオサイト</div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#c8a35a; height:4px; font-size:0; line-height:0;">&nbsp;</td>
          </tr>

          <tr>
            <td style="padding:32px; font-family:${FONT}; font-size:15px; line-height:1.8; color:#2b2f36;">

              <p style="margin:0 0 24px; font-size:13px; color:#6b7280;">受付日時：${receivedAt}</p>

              <h1 style="margin:0 0 20px; padding:0 0 12px; font-size:20px; line-height:1.5; color:#1f3a5f; border-bottom:2px solid #1f3a5f;">
                お問い合わせを受け付けました
              </h1>

              <p style="margin:0 0 16px;">${escapeHtml(input.name)} 様</p>

              <p style="margin:0 0 16px;">
                この度はお問い合わせいただき、誠にありがとうございます。<br>
                以下の内容でお問い合わせを受け付けました。
              </p>

              <p style="margin:0 0 16px;">
                内容を確認のうえ、改めてご連絡いたします。回答までにお時間をいただく場合がございますので、あらかじめご了承ください。
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0; border:1px solid #d9dee5; border-collapse:collapse;">
                <tr>
                  <td colspan="2" style="background-color:#f3f5f8; padding:10px 16px; font-size:14px; font-weight:bold; color:#1f3a5f; border-bottom:1px solid #d9dee5;">
                    ■ 受付内容
                  </td>
                </tr>${detailRows}
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 8px;">
                <tr>
                  <td style="background-color:#fff8e6; border-left:4px solid #c8a35a; padding:14px 18px; font-size:14px; line-height:1.8;">
                    <strong style="color:#8a6a1f;">【ご留意事項】</strong><br>
                    ・本メールは自動送信されています。<br>
                    ・ご入力いただいたメールアドレス宛に、内容確認後にご連絡いたします。
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 32px; font-family:${FONT};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #d9dee5;">
                <tr>
                  <td style="padding-top:20px; font-size:13px; line-height:1.8; color:#2b2f36;">
                    <strong style="font-size:14px;">飯田優斗</strong><br>
                    E-mail：<a href="mailto:contact@meshiden.jp" style="color:#1f5fbf; text-decoration:none;">contact@meshiden.jp</a><br>
                    URL：<a href="https://meshiden.jp" style="color:#1f5fbf; text-decoration:none;">https://meshiden.jp</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color:#f3f5f8; padding:18px 32px; font-family:${FONT}; font-size:11px; line-height:1.7; color:#6b7280; border-top:1px solid #d9dee5;">
              本メールは、お問い合わせフォームにご入力いただいたメールアドレス宛に自動送信しています。<br>
              お心当たりのない場合は、恐れ入りますが破棄していただきますようお願いいたします。<br>
              &copy; ${year} IIDA Yuto All Rights Reserved.
            </td>
          </tr>

        </table>
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
