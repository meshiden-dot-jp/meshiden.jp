import type { Metadata } from "next";
import { client } from "@/lib/client";
import { Noto_Sans_JP } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import Script from "next/script";
import BreadcrumbWrapper from "@/components/layouts/breadcrumbwrapper";
import ConsoleArt from "@/components/console-art";

// ✅ フォント設定（Noto Sans JP）
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

// ✅ デフォルトOGP画像
const defaultOGP = "https://meshiden.jp/ogp-default.jpg";

// ✅ メタデータを動的に生成
export async function generateMetadata(
  { params }: { params: { id?: string } }
): Promise<Metadata> {
  const baseUrl = "https://meshiden.jp";
  let ogImage = defaultOGP;
  let title = "飯田優斗｜ポートフォリオサイト";
  let description = "飯田優斗のポートフォリオサイトです。過去に作成した作品や技術ブログ、最新のお知らせなどを掲載しています。また、経歴やスキルセットも紹介しています。飯田優斗の活動に興味がある方はぜひご覧ください。";
  let url = baseUrl;

  if (params?.id) {
    try {
      const isBlog = process.env.NEXT_PUBLIC_PAGE_TYPE === "blog";
      const isWork = process.env.NEXT_PUBLIC_PAGE_TYPE === "work";
      const endpoint = isBlog ? "tech-blog" : isWork ? "work" : null;

      if (endpoint) {
        const data = await client.get({ endpoint, contentId: params.id });
        title = data.title || title;
        description = data.description || description;
        ogImage = data.header_image?.url || ogImage;
        url = `${baseUrl}/${isBlog ? "blog" : "work"}/${params.id}`;
      }
    } catch (error) {
      console.error(`OGP取得エラー:`, error);
    }
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// ✅ ルートレイアウト
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/rvs7vvb.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></link>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/icon.png"></link>
        <link rel="canonical" href="https://meshiden.jp"></link>
      </head>
      <body className={`${notoSansJP.variable} antialiased flex min-h-screen flex-col`}>
        <Header />
        <Toaster position="top-right" />
        <div className="flex-grow overflow-hidden">{children}</div>
        <BreadcrumbWrapper />
        <Footer />
        <ConsoleArt />

        {/* ✅ FontAwesome */}
        <Script src="https://kit.fontawesome.com/4e6b2556d7.js" strategy="afterInteractive" />

        {/* ✅ Google Analytics */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=G-Y05F7K44N3`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y05F7K44N3');
          `}
        </Script>

        {/* ✅ Google reCAPTCHA */}
        <Script src="https://www.google.com/recaptcha/api.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
