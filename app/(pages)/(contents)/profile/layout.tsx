import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://meshiden.jp/profile",
  },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}