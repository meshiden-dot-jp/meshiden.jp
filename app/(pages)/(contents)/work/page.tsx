"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/layouts/sk_card";
import Zero from "@/components/layouts/zero";
import Error from "@/components/layouts/error";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

// microCMS のレスポンス型（必要なら別ファイルに切り出してもOK）
type WorkListResponse = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};

const POSTS_PER_PAGE = 24;

/**
 * ✅ ラッパーコンポーネント
 * useSearchParams は使わず、Suspense で中身を包むだけ
 */
export default function WorkPage() {
  return (
    <Suspense
      fallback={
        <div className="sm:w-[70%] w-[90%] m-auto pb-32">
          <h1 id="work">作品一覧</h1>
          <Skeleton />
        </div>
      }
    >
      <WorkPageInner />
    </Suspense>
  );
}

/**
 * ✅ 本体コンポーネント
 * useSearchParams / useRouter / usePathname はここで使う
 */
function WorkPageInner() {
  const [blog, setBlog] = useState<Blog[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true); // ローディング状態
  const [error, setError] = useState(false); // エラー状態

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // クエリ (?page=) から現在ページを取得
  const pageFromQuery = Number(searchParams.get("page") || "1");
  const currentPage =
    Number.isNaN(pageFromQuery) || pageFromQuery < 1 ? 1 : pageFromQuery;

  // 総ページ数（totalCount を使う）
  const totalPages =
    totalCount > 0 ? Math.ceil(totalCount / POSTS_PER_PAGE) : 1;

  // page クエリを書き換えるための URL ヘルパー
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      // 1ページ目は ?page を消してもOK
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  // ページ変更処理
  const goToPage = (page: number) => {
    const safePage = Math.min(Math.max(page, 1), totalPages || 1); // 1〜totalPages にクランプ
    router.push(createPageUrl(safePage));
  };

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        setError(false);

        const startTime = Date.now();
        const offset = (currentPage - 1) * POSTS_PER_PAGE;

        const data = await client.get<WorkListResponse>({
          endpoint: "work",
          queries: {
            limit: POSTS_PER_PAGE,
            offset,
          },
        });

        setBlog(data.contents || []);
        setTotalCount(data.totalCount || 0);

        const elapsedTime = Date.now() - startTime;
        const delay = Math.max(500 - elapsedTime, 0);

        setTimeout(() => {
          setLoading(false);
        }, delay);
      } catch (error) {
        console.error("Error fetching microCMS data:", error);
        setError(true);
        setLoading(false);
      }
    }

    fetchBlogs();
    // currentPage が変わるたびにそのページのデータを取り直す
  }, [currentPage]);

  return (
    <div className="sm:w-[70%] w-[90%] m-auto pb-32">
      <h1 id="work">作品一覧</h1>

      {/* 🔄 ローディング表示 */}
      {loading && <Skeleton />}

      {/* ⚠ エラー表示 */}
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

      {/* ❌ 記事がない場合の表示（ロード完了＆エラーなし＆件数0） */}
      {!loading && !error && blog.length === 0 && (
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

      {/* ✅ 記事がある場合の表示 */}
      {!loading && !error && blog.length > 0 && (
        <>
          <ul className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[1vw] sm:gap-[1.5vw] gap-[5vw]">
            {blog.map((post) => (
              <li key={post.id}>
                <Link href={`/work/${post.id}`}>
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
                <CardContent className="inline-flex items-center rounded-full border px-0 py-0.5 transition-colors font-normal border-transparent text-muted-foreground text-xs">
                  <CardDescription className="text-xs">
                    <small className="inline-flex items-center rounded-full border px-0 py-0.5 transition-colors font-normal border-transparent text-muted-foreground text-xs">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </small>
                  </CardDescription>
                </CardContent>
              </li>
            ))}
          </ul>

          {/* 🧭 ページネーション */}
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
