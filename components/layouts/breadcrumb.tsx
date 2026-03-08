"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { client } from "@/lib/client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// パスのマッピング（スラッグを適切なタイトルに変更）
const pathTitleMap: { [key: string]: string } = {
    work: "作品一覧",
    profile: "自己紹介",
    news: "お知らせ",
    blog: "技術ブログ",
    contact: "お問い合わせ",
    thanks:"送信完了",
    disclaimer: "免責事項",
    privacy: "プライバシーポリシー",
    ai: "AIポリシー",
    accessibility: "ウェブアクセシビリティ",
    pride: "プライドポリシー",
};

const BreadcrumbComponent = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter((segment) => segment);
    const [titleMap, setTitleMap] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        async function fetchTitle(id: string, type: "work" | "tech-blog") {
            try {
                const data = await client.get({ endpoint: type, contentId: id });
                setTitleMap((prev) => ({ ...prev, [id]: data.title }));
            } catch (error) {
                console.error(`Error fetching ${type} title:`, error);
            }
        }

        pathSegments.forEach((segment, index) => {
            if (index > 0) {
                const prevSegment = pathSegments[index - 1];
                if (prevSegment === "blog") {
                    fetchTitle(segment, "tech-blog"); // ✅ `blog` のタイトル取得
                } else if (prevSegment === "work") {
                    fetchTitle(segment, "work"); // ✅ `work` のタイトル取得
                }
            }
        });
    }, [pathSegments]);

    return (
        <div className="w-[90%] flex m-auto pb-6 no-print">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">
                            <i aria-label="ホームボタン" className="fa-solid fa-house"><span className="hidden">ホーム</span></i>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {pathSegments.map((segment, index) => {
                        const path = "/" + pathSegments.slice(0, index + 1).join("/");
                        const isLast = index === pathSegments.length - 1;
                        const displayText =
                            pathTitleMap[segment] || titleMap[segment] || decodeURIComponent(segment);

                        return (
                            <React.Fragment key={path}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage>{displayText}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={path}>{displayText}</BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default BreadcrumbComponent;
