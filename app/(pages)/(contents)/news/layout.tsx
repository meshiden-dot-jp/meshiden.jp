import type { Metadata } from "next";

const url = "https://meshiden.jp/news";
const title = "お知らせ｜飯田優斗のポートフォリオサイト";
const description = "飯田優斗のポートフォリオサイトの更新情報やお知らせを掲載しています。";
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

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
