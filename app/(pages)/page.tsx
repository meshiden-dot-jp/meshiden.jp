"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Work from "@/components/layouts/top/work";
import Profile from "@/components/layouts/top/profile";
import News from "@/components/layouts/top/news";
import Techblog from "@/components/layouts/top/blog";
import Head from "next/head";

type UnityLoadedMessage = { type: "UNITY_LOADED" };

const isUnityLoadedMessage = (v: unknown): v is UnityLoadedMessage => {
  if (!v || typeof v !== "object") return false;
  return (v as { type?: unknown }).type === "UNITY_LOADED";
};

export default function Home() {
  const fadeMs = 550;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [loadingFading, setLoadingFading] = useState(false);
  // const [isPrideMonth, setIsPrideMonth] = useState(false);

  // useEffect(() => {
  //   setIsPrideMonth(new Date().getMonth() === 5);
  // }, []);

  const hideOverlayWithFade = useCallback(() => {
    if (!loadingVisible || loadingFading) return;
    setLoadingFading(true);
    window.setTimeout(() => {
      setLoadingVisible(false);
      setLoadingFading(false);
    }, fadeMs);
  }, [loadingVisible, loadingFading, fadeMs]);

  useEffect(() => {
    const onMessage = (event: MessageEvent<unknown>) => {
      if (event.origin !== window.location.origin) return;
      if (!isUnityLoadedMessage(event.data)) return;

      const extraDelay = 2500;
      window.setTimeout(() => {
        hideOverlayWithFade();
      }, extraDelay);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [hideOverlayWithFade]);

  useEffect(() => {
    iframeRef.current?.setAttribute("allow", "autoplay");
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-8 select-none">
          <iframe
            ref={iframeRef}
            src="/unity/index.html"
            className="w-full h-full border-0 pointer-events-none blur-3xl scale-110"
            allowFullScreen
          />
          <div className="fade"></div>
        </div>

        {loadingVisible && (
          <div
            className={[
              "absolute inset-0 z-9 bg-white",
              "transition-opacity ease-out select-none",
              loadingFading ? "opacity-0" : "opacity-100",
            ].join(" ")}
            style={{ transitionDuration: `${fadeMs}ms` }}
          >
          </div>
        )}

        <main className="relative w-[90%] m-auto mb-[4%] pt-[5vh] z-10">
          <Head>
            <link
              rel="preload"
              as="image"
              href="https://res.cloudinary.com/dxsccj7j7/image/upload/v1747444269/IMG_8945_hcewea.jpg"
            />
          </Head>

          <Image
            className="sm:max-w-[50%] sm:w-auto w-[100%] sm:max-h-[80vh] sm:h-auto mx-auto sm:mx-0 sm:pt-0 relative sm:ml-auto z-0 rounded-[12%] object-cover aspect-square select-none"
            src="https://res.cloudinary.com/dxsccj7j7/image/upload/f_auto,q_auto/v1747444269/IMG_8945_hcewea.jpg"
            alt="飯田優斗が背を向けてポーズを取っている画像"
            width={1024}
            height={1024}
            priority
            loading="eager"
            draggable="false"
          />

          <div className="sm:absolute relative sm:bottom-[10px] bottom-auto pt-12 font-bold">
            <p className="sm:text-[5vw] text-[9vw] w-fit mb-2 select-none">飯田優斗の</p>
            <p className="sm:text-[9vw] text-[18vw] sm:leading-relaxed leading-snug font-black p-0 select-none">
              Portfolio
            </p>
            <h1 className="hidden">飯田優斗のオフィシャルポートフォリオサイト</h1>
          </div>
        </main>
      </div>
      <div className="sm:w-[70%] w-[90%] m-auto mb-32">
        {/* {isPrideMonth && (
          <p className="text-center my-12 text-base leading-relaxed">
            すべての人が自分らしく生きられる社会を願って<br />
            プライド月間はデザインを一部変更しています
          </p>
        )} */}
        <div>
          <h2 id="work">作品一覧</h2>
          <Work />
        </div>
        <div>
          <h2 id="profile">自己紹介</h2>
          <Profile />
        </div>
        <div>
          <h2 id="news">お知らせ</h2>
          <News />
        </div>
        <div>
          <h2 id="blog">技術ブログ</h2>
          <Techblog />
        </div>
      </div>
    </div>
  );
}
