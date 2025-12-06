import { getHighlighter } from "shiki";
import rehypeShiki from "rehype-shiki";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";



const highlighterPromise = getHighlighter({
  themes: ["nord"],
  langs: ["javascript", "typescript", "html", "css", "bash"],
});

export async function highlightMarkdown(markdown: string): Promise<string> {
  const highlighter = await highlighterPromise;

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeShiki, { highlighter })
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
