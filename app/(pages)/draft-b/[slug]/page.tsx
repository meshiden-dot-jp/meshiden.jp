// app/draft/[slug]/page.tsx
import { client } from "@/lib/microcms";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeReact from "rehype-react";
import React from "react";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";


export const dynamic = "force-dynamic";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

type Props = {
  params: { slug: string };
  searchParams: { draftKey?: string };
};

export default async function DraftPage({ params, searchParams }: Props) {
  const { slug } = params;
  const { draftKey } = searchParams;

  if (!draftKey) return notFound();

  try {
    const blog = await client.get({
      endpoint: "work",
      contentId: slug,
      queries: { draftKey },
    });

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

    const headerImageUrl = blog.header_image?.url || "/ogp-default.jpg";

    return (
      <div className="lg:w-[50%] sm:w-[70%] w-[90%] m-auto pt-12 pb-32 min-h-screen">
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
            <p>{new Date(blog.publishedAt).toLocaleDateString()}</p>
            {jsxContent}
          </div>
        </div>
        <a className="flex justify-center w-full" href="/blog">
          <Button className="sm:w-[50%] w-full">一覧に戻る</Button>
        </a>
      </div>
    );
  } catch (error) {
    console.error("ドラフト取得エラー:", error);
    return notFound();
  }
}
