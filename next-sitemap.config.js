/** @type {import('next-sitemap').IConfig} */

const fetchMicroCMSBlogPaths = async () => {
  const limit = 100
  let offset = 0
  let allPosts = []

  while (true) {
    const res = await fetch(
      `https://${process.env.NEXT_PUBLIC_SERVICE_DOMAIN}.microcms.io/api/v1/tech-blog?limit=${limit}&offset=${offset}&fields=id,publishedAt`,
      {
        headers: {
          'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    )

    if (!res.ok) {
      throw new Error(`microCMS fetch failed: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    allPosts = allPosts.concat(data.contents)

    if (allPosts.length >= data.totalCount) break
    offset += limit
  }

  return allPosts
}

module.exports = {
  siteUrl: 'https://meshiden.jp',
  generateRobotsTxt: true,
  exclude: ['/draft/*'],
  additionalPaths: async (config) => {
    const posts = await fetchMicroCMSBlogPaths()

    return posts.map((post) => ({
      loc: `/blog/${post.id}`,
      lastmod: post.publishedAt,
      changefreq: 'daily',
      priority: 0.7,
    }))
  },
}