"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/client";
import { Blog } from "@/app/types/blog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Skeleton from "../sk_card";
import Zero from "@/components/layouts/zero";
import Error from "@/components/layouts/error";

export default function BlogPage() {
  const [blog, setBlog] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const startTime = Date.now();

        const data = await client.get({ endpoint: "work", queries: { limit: 7 } });
        setBlog(data.contents.slice(0, 6) || []);
        setHasMore(data.contents.length > 6);

        const elapsedTime = Date.now() - startTime;
        const delay = Math.max(1000 - elapsedTime, 0);

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
          <ul className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[1vw] sm:gap-[1.5vw] gap-[5vw]">
            {blog.map((post) => (
              <li key={post.id} className="h-full">
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
                    <CardTitle className="text-lg font-bold line-clamp-2">{post.title}</CardTitle>
                  </CardFooter>
                </Card>
              </Link>
                <CardContent className="inline-flex items-center rounded-full border px-0 py-0.5 transition-colors font-normal border-transparent text-muted-foreground text-xs">
                  <CardDescription className="text-xs">
                    <small className="inline-flex items-center rounded-full border px-0 py-0.5 transition-colors font-normal border-transparent text-muted-foreground text-xs">{new Date(post.publishedAt).toLocaleDateString()}</small>
                  </CardDescription>
                </CardContent>
              </li>
            ))}
          </ul>

          {/* ✅ 記事が6つ以上あるときのみ表示 */}
          {hasMore && (
            <div className="flex justify-end mt-4">
              <a href="/work">
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
