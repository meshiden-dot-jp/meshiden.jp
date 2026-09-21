# meshiden.jp

**meshiden.jp** は、フロントエンドエンジニア兼 UI デザイナーである飯田優斗のポートフォリオ兼情報発信サイトです。Next.js で構築されており、ブログ、プロフィール、実績、ニュース、問い合わせフォームなどのページを備えています。

## 使用技術

- フレームワーク: [Next.js](https://nextjs.org/)
- 言語: TypeScript / JavaScript
- スタイリング: Tailwind CSS
- CI/CD: AWS Amplify
- CMS: microCMS
- セキュリティ: reCAPTCHA
- 画像配信: Cloudinary

## ディレクトリ構成

- `app/`: ルーティング定義と各ページのコンポーネント
- `components/`: ヘッダーやフッターなどの再利用 UI コンポーネント
- `lib/`: テーマ設定やユーティリティ関数
- `public/`: 静的ファイル（画像、OGPなど）
- `types/`: 型定義
- `.next/`: ビルド後の成果物（自動生成）

## ページ一覧
/：トップページ

/profile：プロフィール

/work, /work/[id]：制作実績一覧・IDごとの詳細ページ

/blog, /blog/[id]：技術ブログ一覧・記事詳細（?tag= でカテゴリ絞り込み）

/news：お知らせ

/contact：問い合わせ

/sns：SNSアカウント一覧

/privacy, /disclaimer, /ai, /accessibility, /pride：法的情報・ポリシー（`app/(pages)/(legal)/` 配下、URLに `/legal` は付かない）

## SEO / メタデータ

- 各ページの `<title>` / `description` / OGP・Twitterカード / canonical URL は、対応するルート内の `page.tsx`（サーバーコンポーネント）または `layout.tsx`（`"use client"` な page.tsx に対して）で個別に定義しています。ルート直下の `app/layout.tsx` はサイト全体のフォールバック（トップページ用）のみを担い、各ページはそれを上書きする形です。
- サイトマップは `next-sitemap`（`next-sitemap.config.js`）により `npm run build` の `postbuild` で自動生成され、`public/sitemap.xml` / `public/sitemap-0.xml` に出力されます。管理者権限限定の `/draft-b`, `/draft-w` は生成対象から除外し、`noindex` も設定しています。
- サイト全体の構造化データ（Person / WebSite の JSON-LD）は `app/layout.tsx` に定義しています。

## コンタクト
サイト上のフォーム、または以下の連絡先よりお問い合わせください。
https://meshiden.jp/contact

## ライセンス
本リポジトリの内容は著作権によって保護されており、無断転載・複製を禁止します。再利用を希望する場合はお問い合わせください。