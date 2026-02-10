"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Work from "@/components/layouts/top/work";
import Profile from "@/components/layouts/top/profile";
import News from "@/components/layouts/top/news";
import Techblog from "@/components/layouts/top/blog";
import Contact from "@/components/layouts/top/contact";
import Head from "next/head";

type UnityLoadedMessage = { type: "UNITY_LOADED" };

const isUnityLoadedMessage = (v: unknown): v is UnityLoadedMessage => {
  if (!v || typeof v !== "object") return false;
  return (v as { type?: unknown }).type === "UNITY_LOADED";
};

export default function Home() {
const fadeMs = 550;

  const [loadingVisible, setLoadingVisible] = useState(true);
  const [loadingFading, setLoadingFading] = useState(false);

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
      hideOverlayWithFade();
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [hideOverlayWithFade]);

  useEffect(() => {
    document.body.style.overflow = loadingVisible ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loadingVisible]);

  return (
    <div className="overflow-hidden">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full -z-10">
          <iframe
            src="/unity/index.html"
            className="w-full h-full border-0 pointer-events-none blur-3xl scale-110"
            allowFullScreen
          />
          <div className="fade"></div>
        </div>

        {loadingVisible && (
          <div
            className={[
              "fixed inset-0 z-[80] flex items-center justify-center bg-white text-black",
              "transition-opacity ease-out",
              loadingFading ? "opacity-0" : "opacity-100",
            ].join(" ")}
            style={{ transitionDuration: `${fadeMs}ms` }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/40 border-t-black" />
              <p className="text-sm tracking-wide">Loading…</p>
            </div>
          </div>
        )}

        <main className="relative w-[90%] m-auto sm:pt-[2%] mb-[4%] sm:mt-0 mt-8 z-10">
          <Head>
            <link
              rel="preload"
              as="image"
              href="https://res.cloudinary.com/dxsccj7j7/image/upload/v1747444269/IMG_8945_hcewea.jpg"
            />
          </Head>

          <Image
            className="sm:w-[50%] w-[100%] mx-auto sm:mx-0 sm:pt-0 mt-4 relative sm:ml-auto z-0 rounded-[10%] object-cover aspect-square"
            src="https://res.cloudinary.com/dxsccj7j7/image/upload/f_auto,q_auto/v1747444269/IMG_8945_hcewea.jpg"
            alt="飯田優斗が背を向けてポーズを取っている画像"
            width={2048}
            height={2048}
            priority
          />

          <div className="sm:absolute relative sm:bottom-[10px] bottom-auto pt-12 font-bold">
            <p className="sm:text-[5vw] text-[9vw] w-fit mb-2">飯田優斗の</p>
            <p className="sm:text-[9vw] text-[18vw] sm:leading-relaxed leading-snug font-black">
              Portfolio
            </p>
          </div>
        </main>
      </div>

      <div className="sm:w-[70%] w-[90%] m-auto">
        <div>
          <h1 id="work">作品一覧</h1>
          <Work />
        </div>
        <div>
          <h1 id="profile">自己紹介</h1>
          <Profile />
        </div>
        <div>
          <h1 id="news">お知らせ</h1>
          <News />
        </div>
        <div>
          <h1 id="blog">技術ブログ</h1>
          <Techblog />
        </div>
        <div className="pb-32 bg-white">
          <h1 id="contact">お問い合わせ</h1>
          <Contact />
        </div>
      </div>
    </div>
  );
}
