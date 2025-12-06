import { client } from "@/lib/client";
import { Blog } from "@/app/types/blog";
import { highlightMarkdown } from "@/lib/highlight";

export async function getBlogData(id: string | undefined): Promise<Blog | null> {
  if (!id) {
    console.error("Error: ID is undefined.");
    return null;
  }

  try {
    const data = await client.get({
      endpoint: `tech-blog/${id}`,
    });

    const highlightedBody = await highlightMarkdown(data.body);
    return { ...data, body: highlightedBody };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}
