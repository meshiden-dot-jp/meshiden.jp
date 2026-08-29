import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://meshiden.jp/work",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}