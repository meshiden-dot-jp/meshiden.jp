import type { Metadata } from "next";

const url = "https://meshiden.jp/work";
const title = "作品一覧｜飯田優斗のポートフォリオサイト";
const description = "飯田優斗がこれまでに制作したデザイン・開発作品の一覧です。";
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

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
