import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://meshiden.jp/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}