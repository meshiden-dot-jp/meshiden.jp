// app/work/[id]/page.tsx
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

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const baseUrl = "https://meshiden.jp";
  const defaultOGP = `${baseUrl}/ogp-default.jpg`;

  try {
    const data = await client.get({ endpoint: `work/${params.id}` });

    return {
      title: data.title,
      description: data.description || "飯田優斗の作品紹介ページです。",
      alternates: {
        canonical: `${baseUrl}/work/${params.id}`,
      },
      openGraph: {
        title: data.title,
        description: data.description,
        url: `${baseUrl}/work/${params.id}`,
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
      title: "作品が見つかりませんでした",
      description: "指定された作品は存在しないか、読み込みに失敗しました。",
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
      endpoint: `work/${id}`,
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
    const data = await client.get({ endpoint: "work" });

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

  return (
    <div className="lg:w-[50%] sm:w-[70%] w-[90%] m-auto pt-12 pb-32 min-h-screen">
      <div className="pb-16">
        <Image
          src={blog.header_image.url}
          alt={blog.title}
          width={900}
          height={900}
          className="object-cover p-0 rounded-lg"
        />
        <div className="article" >
          <h1>{blog.title}</h1>
          <p>{new Date(blog.publishedAt).toLocaleDateString()}</p>
          {jsxContent}
        </div>
      </div>
      <a className="flex justify-center w-full" href="/work">
        <Button className="sm:w-[50%] w-full">一覧に戻る</Button>
      </a>
    </div>
  );
}