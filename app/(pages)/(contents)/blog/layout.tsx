import type { Metadata } from "next";

const url = "https://meshiden.jp/blog";
const title = "技術ブログ｜飯田優斗のポートフォリオサイト";
const description = "飯田優斗が執筆した技術ブログの一覧です。開発や技術に関する知見を発信しています。";
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

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
