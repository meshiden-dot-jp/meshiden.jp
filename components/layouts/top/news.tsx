"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/lib/client";
import { Blog } from "@/app/types/blog";
import { Button } from "@/components/ui/button";
import Skeleton from "../sk_bar";
import Zero from "@/components/layouts/zero";
import Error from "@/components/layouts/error"; import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

export default function BlogPage() {
  const [blog, setBlog] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false); // 記事が6つ以上あるかを判定

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const startTime = Date.now();
        const data = await client.get({ endpoint: "news", queries: { limit: 7 } }); // ✅ limitを7に変更
        setBlog(data.contents.slice(0, 6) || []); // ✅ 6記事のみ表示
        setHasMore(data.contents.length > 6); // ✅ 記事が6つ以上あるか判定
        const elapsedTime = Date.now() - startTime; // ✅ データ取得にかかった時間を計算
        const delay = Math.max(1000 - elapsedTime, 0); // ✅ 2秒未満なら残りの時間を待機

        setTimeout(() => {
          setLoading(false);
        }, delay);
      } catch (error) {
        console.error("Error fetching microCMS data:", error);
        setError(true);
        setLoading(false); // エラー時はすぐに終了
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div>

      {/* 🔄 ローディング表示 */}
      {loading && <Skeleton />}

      {/* ⚠ エラー表示 */}
      {error && (
        <div>
          <Error />
        </div>
      )}

      {/* ❌ 記事がない場合の表示 */}
      {!loading && !error && blog.length === 0 && (
        <div>
          <Zero />
        </div>
      )}

      {/* ✅ 記事がある場合の表示 */}
      {!loading && !error && blog.length > 0 && (
        <>
          <Table>
            <TableBody>
              {blog.map((post) => (
                <TableRow key={post.id} className="flex flex-wrap sm:table-row border-b bg-none">
                  <TableCell className="w-1/4 sm:w-1/12 align-text-top  pl-2 sm:pl-4">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="w-1/4 sm:w-1/12 text-[10px] align-text-top font-medium text-center min-w-32">
                    <p className="text-[10px] bg-gray-100 px-2 leading-5 rounded-sm">
                      {post.tag}
                    </p>
                  </TableCell>
                  <TableCell className="w-full sm:w-auto align-text-top pt-0 px-2 sm:px-4">
                    <Link href={post.link} className="hover:underline block sm:inline font-bold">
                      {post.title}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* ✅ 記事が6つ以上あるときのみ表示 */}
          {hasMore && (
            <div className="flex justify-end mt-4">
              <a href="/news">
                <Button variant="ghost">
                  すべて見る <i className="fa-solid fa-chevron-right"></i>
                </Button>
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
