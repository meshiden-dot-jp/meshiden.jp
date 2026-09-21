import type { Metadata } from "next";

const url = "https://meshiden.jp/profile";
const title = "自己紹介｜飯田優斗のポートフォリオサイト";
const description = "飯田優斗の経歴やスキルセット、受賞歴などを紹介するプロフィールページです。";
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

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
