"use client";

import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/layouts/breadcrumb";

export default function BreadcrumbWrapper() {
  const pathname = usePathname();

  // ルート("/")では Breadcrumb を表示しない
  if (pathname === "/") return null;

  return <Breadcrumb />;
}
