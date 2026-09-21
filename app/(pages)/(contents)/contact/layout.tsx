import type { Metadata } from "next";

const url = "https://meshiden.jp/contact";
const title = "お問い合わせ｜飯田優斗のポートフォリオサイト";
const description = "飯田優斗へのお問い合わせはこちらから。フォーム・メール・書簡でのご連絡に対応しています。";
const ogImage = "https://meshiden.jp/ogp-default.jpg";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "website",
    images: [{ url: ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
