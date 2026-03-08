import { client } from "@/lib/client";
import { Blog } from "@/app/types/blog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeReact from "rehype-react";
import React from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const baseUrl = "https://meshiden.jp";
  const defaultOGP = `${baseUrl}/ogp-default.jpg`;

  try {
    const data = await client.get({ endpoint: "tech-blog", contentId: params.id });

    return {
      title: data.title,
      description: data.description || "iIDaの技術ブログ記事です。",
      openGraph: {
        title: data.title,
        description: data.description,
        url: `${baseUrl}/tech-blog/${params.id}`,
        type: "article",
        images: [{ url: data.header_image?.url || defaultOGP }],
      },
      twitter: {
        card: "summary_large_image",
        title: data.title,
        description: data.description,
        images: [data.header_image?.url || defaultOGP],
      },
    };
  } catch (error) {
    console.error("OGPメタデータ取得エラー:", error);
    return {
      title: "記事が見つかりませんでした",
      description: "指定された記事は存在しないか、読み込みに失敗しました。",
    };
  }
}

// ブログの詳細データを取得する関数
async function getBlogData(id: string | undefined): Promise<Blog | null> {
  if (!id) {
    console.error("Error: ID is undefined.");
    return null;
  }

  try {
    const data = await client.get({
      endpoint: "tech-blog",
      contentId: id,
      queries: {
        fields: "id,title,body,publishedAt,header_image,description,category", // ← category を追加
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

// 静的なパスを生成する関数（SSG 相当）
export async function generateStaticParams() {
  try {
    const data = await client.get({ endpoint: "tech-blog" });

    if (!data || !data.contents) {
      console.error("No blog data found!");
      return [];
    }

    const paths = data.contents.map((content: { id: string }) => ({
      params: { id: content.id },
    }));

    return paths;
  } catch (error) {
    console.error("Error fetching blog data for static paths:", error);
    return [];
  }
}

// ブログ詳細ページのコンポーネント
export default async function BlogDetail({ params }: { params?: { id?: string } }) {

  if (!params || !params.id) {
    notFound();
  }

  const blog = await getBlogData(params.id);

  if (!blog) {
    notFound();
  }

  const htmlString = blog.body;

  const processor = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypePrettyCode, {
      theme: "github-dark",
      defaultLang: "tsx",
    })
    .use(rehypeReact, {
      jsx,
      jsxs,
      Fragment,
    });


  const file = await processor.process(htmlString);
  const jsxContent = file.result;
  // デフォルト画像のURL
  const headerImageUrl = blog.header_image?.url || "/ogp-default.jpg";

  return (
    <div className="pb-32">
      <div className="lg:w-[50%] sm:w-[70%] w-[90%] m-auto pt-12 min-h-screen overflow-hidden">
        <div className="pb-16">
          <Image
            src={headerImageUrl}
            alt={blog.title}
            width={900}
            height={900}
            className="object-cover p-0 rounded-lg"
          />
          <div className="article" >
            <h1>{blog.title}</h1>
            <div className="flex items-center">
              <p>{new Date(blog.publishedAt).toLocaleDateString()}</p>
            {/* カテゴリがある場合のみ表示 */}
            {blog.category && blog.category.length > 0 && (
              <div className="flex p-0 pt-4 pl-2">
                {blog.category.map((cat, index) => (
                  <Link  
                    href={`/blog?tag=${typeof cat === "string" ? cat : cat.name}`} 
                    className="!bg-none"
                    key={`${cat}-${index}`}
                  >
                    <Badge
                      variant="hashtag"
                      className="text-black"
                    >
                      {typeof cat === "string" ? cat : cat.name}
                  </Badge>
                  </Link>
                ))}
              </div>
            )}
            </div>
            {jsxContent}
          </div>
        </div>
        <a className="flex justify-center w-full" href="/blog">
          <Button className="sm:w-[50%] w-full">一覧に戻る</Button>
        </a>
      </div>
    </div>
  );
}
