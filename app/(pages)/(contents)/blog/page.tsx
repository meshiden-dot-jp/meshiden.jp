"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/client";
import { Blog } from "@/app/types/blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Skeleton from "@/components/layouts/sk_card";
import { Button } from "@/components/ui/button";
import Zero from "@/components/layouts/zero";
import Error from "@/components/layouts/error";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import type { MicroCMSQueries } from "microcms-js-sdk";

// microCMS のレスポンス用
type BlogListResponse = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};

const POSTS_PER_PAGE = 24;

/**
 * ✅ ラッパーコンポーネント
 * ここでは useSearchParams を使わず、単に <Suspense> で囲むだけ
 */
export default function BlogPage() {
  return (
    <Suspense fallback={<div className="sm:w-[70%] w-[90%] m-auto pb-32"><Skeleton /></div>}>
      <BlogPageInner />
    </Suspense>
  );
}

/**
 * ✅ 実際のページ本体
 * useSearchParams / useRouter / usePathname などのフックは全部こっちで使う
 */
function BlogPageInner() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // クエリから tag / page を取得
  const tag = searchParams.get("tag") || null;
  const pageFromQuery = Number(searchParams.get("page") || "1");
  const currentPage =
    Number.isNaN(pageFromQuery) || pageFromQuery < 1 ? 1 : pageFromQuery;

  // 総ページ数
  const totalPages =
    totalCount > 0 ? Math.ceil(totalCount / POSTS_PER_PAGE) : 1;

  // page クエリを書き換える URL を作る
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  // ページ移動
  const goToPage = (page: number) => {
    const safePage = Math.min(Math.max(page, 1), totalPages || 1);
    router.push(createPageUrl(safePage));
  };

  // -----------------------------
  // ① microCMS からページ単位で取得
  // -----------------------------
  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        setError(false);

        const startTime = Date.now();
        const offset = (currentPage - 1) * POSTS_PER_PAGE;

        const queries: MicroCMSQueries = {
          limit: POSTS_PER_PAGE,
          offset,
        };

        // tag があれば filters 追加
        if (tag) {
          queries.filters = `category[contains]${tag}`;
        }

        const data = await client.get<BlogListResponse>({
          endpoint: "tech-blog",
          queries,
        });

        setBlogs(data.contents || []);
        setTotalCount(data.totalCount || 0);

        const elapsed = Date.now() - startTime;
        const delay = Math.max(1000 - elapsed, 0);
        setTimeout(() => setLoading(false), delay);
      } catch (error) {
        console.error("Error fetching microCMS data:", error);
        setError(true);
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [currentPage, tag]);

  // -----------------------------
  // ② 表示部分
  // -----------------------------
  return (
    <div className="sm:w-[70%] w-[90%] m-auto pb-32">
      <div className="flex">
        <h1 id="blog">
          技術ブログ
          {tag && (
            <span className="ml-2 text-sm text-muted-foreground font-normal">
              {tag}
            </span>
          )}
        </h1>

        {tag && (
          <Link href="/blog" className="mt-auto mb-6 ml-auto">
            <Button variant="ghost">絞り込みを解除</Button>
          </Link>
        )}
      </div>

      {/* ローディング */}
      {loading && <Skeleton />}

      {/* エラー */}
      {error && (
        <div>
          <Error />
          <div className="flex justify-center">
            <Button asChild>
              <Link className="sm:w-[50%] w-full" href="/">
                トップへ戻る
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* 記事なし */}
      {!loading && !error && blogs.length === 0 && (
        <div>
          <Zero />
          <div className="flex justify-center">
            <Button asChild>
              <Link className="sm:w-[50%] w-full" href="/">
                トップへ戻る
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* 記事表示 & ページネーション */}
      {!loading && !error && blogs.length > 0 && (
        <>
          <ul className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[1vw] sm:gap-[1.5vw] gap-[5vw]">
            {blogs.map((post) => (
              <li key={post.id} className="overflow-hidden">
                <Link href={`/blog/${post.id}`}>
                  <Card className="p-0 border-none shadow-none">
                    <CardHeader className="p-0 pb-2">
                      {post.header_image?.url && (
                        <div className="overflow-hidden rounded-lg">
                          <Image
                            src={post.header_image.url}
                            alt={post.title}
                            width={900}
                            height={900}
                            className="object-cover transition-transform duration-300 ease-in-out lg:hover:scale-105 p-0"
                          />
                        </div>
                      )}
                    </CardHeader>

                    <CardFooter className="p-0 pt-1">
                      <CardTitle className="text-lg font-bold line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardFooter>
                  </Card>
                </Link>

                <div className="flex p-0">
                  <CardContent className="inline-flex items-center rounded-full border px-0 py-0.5 transition-colors font-normal border-transparent text-muted-foreground text-xs">
                    <CardDescription className="text-xs">
                      <small className="p-6 inline-flex items-center rounded-full border px-0 py-0.5 transition-colors font-normal border-transparent text-muted-foreground text-xs">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </small>
                    </CardDescription>
                  </CardContent>

                  {/* タグ表示 */}
                  {post.category && post.category.length > 0 && (
                    <div className="flex pl-2 overflow-hidden whitespace-nowrap">
                      {post.category.map((cat, index) => {
                        const label =
                          typeof cat === "string" ? cat : cat.name;

                        return (
                          <Link
                            key={`${label}-${index}`}
                            href={`/blog?tag=${label}`}
                            className="p-0 m-0"
                          >
                            <Badge
                              variant="hashtag"
                              className="text-[0.75rem]"
                            >
                              {label}
                            </Badge>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <Pagination>
                <PaginationContent>
                  {/* 前へ */}
                  <PaginationItem>
                    <PaginationPrevious
                      href={createPageUrl(currentPage - 1)}
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) goToPage(currentPage - 1);
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {/* ページ番号 */}
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href={createPageUrl(page)}
                          isActive={page === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            goToPage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {/* 次へ */}
                  <PaginationItem>
                    <PaginationNext
                      href={createPageUrl(currentPage + 1)}
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          goToPage(currentPage + 1);
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}
