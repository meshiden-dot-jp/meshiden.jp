# meshiden.jp

**meshiden.jp** は、フロントエンドエンジニア兼 UI デザイナーである飯田優斗のポートフォリオ兼情報発信サイトです。Next.js で構築されており、ブログ、プロフィール、実績、ニュース、問い合わせフォームなどのページを備えています。

## 使用技術

- フレームワーク: [Next.js](https://nextjs.org/)
- 言語: TypeScript / JavaScript
- スタイリング: Tailwind CSS
- CI/CD: Google Cloud Build + Cloud Run
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

/work/[id]：制作実績（IDごとの詳細ページ）

/blog/[id]：ブログ記事詳細

/news：お知らせ

/contact：問い合わせ

/legal/privacy, /legal/pride など：法的情報・ポリシー

## デプロイ
`Git Bash`で以下のコマンドを実行する。
- `./build.sh`
- `gcloud run deploy meshiden-jp --image gcr.io/poised-charger-449311-q9/meshiden-jp --platform managed --region asia-northeast1 --allow-unauthenticated`

## コンタクト
サイト上のフォーム、または以下の連絡先よりお問い合わせください。
https://meshiden.jp/contact

## ライセンス
本リポジトリの内容は著作権によって保護されており、無断転載・複製を禁止します。再利用を希望する場合はお問い合わせください。