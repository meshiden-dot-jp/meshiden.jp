import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://meshiden.jp/news",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}