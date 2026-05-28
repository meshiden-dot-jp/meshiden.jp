import { algoliasearch } from 'algoliasearch';
import { createClient } from 'microcms-js-sdk';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// .env を読み込む
const lines = readFileSync(resolve(process.cwd(), '.env'), 'utf-8').split('\n');
for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx).trim();
  const val = trimmed.slice(idx + 1).trim();
  if (key && !(key in process.env)) process.env[key] = val;
}

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);

const microcms = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN,
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

async function fetchAll(endpoint, fields) {
  const all = [];
  let offset = 0;
  while (true) {
    const res = await microcms.get({
      endpoint,
      queries: { limit: 100, offset, fields },
    });
    all.push(...res.contents);
    if (all.length >= res.totalCount) break;
    offset += 100;
  }
  return all;
}

function stripHtml(html) {
  return (html ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

// HTML を段落単位で分割し、800文字以内のチャンクにまとめる
function chunkBody(html, maxLength = 800) {
  const blocks = (html ?? '')
    .split(/<\/(?:p|h[1-6]|li|blockquote|div|td|th)>/i)
    .map(b => stripHtml(b))
    .filter(b => b.length > 0);

  const chunks = [];
  let current = '';
  for (const block of blocks) {
    if (current.length + block.length > maxLength && current.length > 0) {
      chunks.push(current.trim());
      current = block;
    } else {
      current += (current ? ' ' : '') + block;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

const processRecords = async () => {
  const [blogs, works, news] = await Promise.all([
    fetchAll('tech-blog', 'id,title,publishedAt,category,body'),
    fetchAll('work',      'id,title,publishedAt,category,body'),
    fetchAll('news',      'id,title,publishedAt,tag,link'),
  ]);

  const objects = [
    ...blogs.flatMap((p) => {
      const chunks = chunkBody(p.body);
      const base = {
        type: 'blog',
        title: p.title,
        publishedAt: p.publishedAt,
        category: (p.category ?? []).map((c) => (typeof c === 'string' ? c : c.name)),
        url: `/blog/${p.id}`,
      };
      if (chunks.length === 0) return [{ objectID: `blog_${p.id}`, ...base }];
      return chunks.map((body, i) => ({ objectID: `blog_${p.id}_${i}`, ...base, body }));
    }),
    ...works.flatMap((p) => {
      const chunks = chunkBody(p.body);
      const base = {
        type: 'work',
        title: p.title,
        publishedAt: p.publishedAt,
        category: (p.category ?? []).map((c) => (typeof c === 'string' ? c : c.name)),
        url: `/work/${p.id}`,
      };
      if (chunks.length === 0) return [{ objectID: `work_${p.id}`, ...base }];
      return chunks.map((body, i) => ({ objectID: `work_${p.id}_${i}`, ...base, body }));
    }),
    ...news.map((p) => ({
      objectID: `news_${p.id}`,
      type: 'news',
      title: p.title,
      publishedAt: p.publishedAt,
      tag: p.tag,
      url: p.link || '/news',
    })),
  ];

  console.log(`ブログ: ${blogs.length} 件 / 作品: ${works.length} 件 / お知らせ: ${news.length} 件`);
  console.log(`合計 ${objects.length} レコード — インデックスをクリアして再構築中...`);

  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;

  // distinct 用の設定（URL単位で重複除去）
  await algolia.setSettings({
    indexName,
    indexSettings: {
      attributeForDistinct: 'url',
      distinct: true,
    },
  });

  await algolia.clearObjects({ indexName });
  return await algolia.saveObjects({ indexName, objects });
};

processRecords()
  .then(() => console.log('インデックス完了！'))
  .catch((err) => console.error(err));
