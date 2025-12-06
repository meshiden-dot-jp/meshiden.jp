/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://meshiden.jp', // あなたのサイトのURLに置き換える
    generateRobotsTxt: true,           // robots.txt の生成を有効にする（任意）
    // その他オプションは必要に応じて設定可能
    exclude: ['/draft/*'],
  };
  