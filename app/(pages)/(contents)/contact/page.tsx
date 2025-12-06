"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner"
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator"
import Link from "next/link";

const ContactPage = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("toastSuccess")) {
      toast.success("送信が完了しました。");
      sessionStorage.removeItem("toastSuccess"); // 1回表示したら削除
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.error("reCAPTCHA not loaded");
      toast.error("reCAPTCHAの読み込みに失敗しました。");
      return;
    }

    try {
      // 1秒遅延させて Google フォームに送信
      setTimeout(() => {
        const form = document.getElementById("contact-form") as HTMLFormElement;
        if (form) {
          form.submit();
        }

        sessionStorage.setItem("toastSuccess", "true");

        setTimeout(() => {
          window.location.reload()
        }, 1500);

      }, 1000);
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      toast.error("エラーが発生しました。再試行してください。");
    }
  };

  return (
    <div className="sm:w-[70%] w-[90%] m-auto pb-32 bg-white">
      <h1 id="contact">お問い合わせ</h1>
      <p>お問い合わせは次の２つの方法からお選びいただけます。必要に応じてご利用ください。</p>
      <h2 id="form">フォームでお問い合わせ（推奨）</h2>
      <p className="pb-8">
        本ページおよびサイト運営者に関するお問い合わせは、以下のフォームにご記入ください。
        このフォームに入力された個人情報は、お問い合わせ内容の回答のみに使用されます。
      </p>
      <Separator />
      <p className="nes text-sm pt-4 pb-12">*必須の質問です。</p>

      <form
        id="contact-form"
        action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeXjov6LEg5wA6uvZRpzURut9OZFU0Q8ZGM9LXwl2zorSaXag/formResponse"
        method="POST"
        target="hidden_iframe"
        onSubmit={handleSubmit}
        className="c-form"
      >
        <div className="pb-4">
          <div className="pb-6">
            <label htmlFor="field-name">氏名・組織名
              <span className="nes">*</span>
            </label>
            <Input
              className="mt-2 h-[56px] rounded-[8px] border-[1px]"
              name="entry.1130227589"
              type="text"
              id="field-name"
              placeholder="山田太郎"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="field-email">メールアドレス
              <span className="nes">*</span>
            </label>
            <Input
              className="mt-2 h-[56px] rounded-[8px] border-[1px]"
              name="entry.213641340"
              type="email"
              id="field-email"
              placeholder="info@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="field-tel">電話番号（任意）</label>
            <Input
              className="mt-2 h-[56px] rounded-[8px] border-[1px]"
              name="entry.1399266169"
              type="tel"
              id="field-tel"
              placeholder="000-0000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="pb-12">
            <label htmlFor="field-message">お問い合わせ内容
              <span className="nes">*</span>
            </label>
            <Textarea
              field-sizing-content="true"
              className="mt-2 h-[56px] rounded-[8px] border-[1px]"
              name="entry.1450192857"
              id="field-message"
              placeholder="お問い合わせ内容"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <Button className="sm:w-[50%] w-full" type="submit">送信する</Button>
          </div>
          <div className="grid justify-center leading-8">
            <small className="flex gap-[2px] pt-12 leading-6 before:content-['※']">
              <span>このフォームでパスワードを送信しないでください。</span>
            </small>
            <small className="flex gap-[2px] pt-2 leading-6 before:content-['※']"><span>このフォームはreCAPTCHAによって保護されており、 Googleの
              <a className="b" href="https://www.google.com/intl/ja/policies/privacy/">プライバシーポリシー</a>と
              <a className="b" href="https://www.google.com/intl/ja/policies/terms/">利用規約</a>が適用されます。</span>
            </small>
            <small className="flex gap-[2px] pt-2 leading-6 before:content-['※']"><span>送信することで、 当サイトの
              <a className="b" href="/privacy">プライバシーポリシー</a>と
              <a className="b" href="/disclaimer">免責事項</a>に同意したことになります。</span>
            </small>
          </div>
        </div>
      </form>
      <h2 id="mail">メールでお問い合わせ</h2>
      <p>メールでのお問い合わせは次のアドレス宛にお願いいたします。返信は2-3週お時間を頂戴する場合があります。</p>
      <small>※ [at]を@に変換してご利用ください</small>
      <address>contact[at]meshiden.jp</address>

      <h2 id="pgp">PGP公開鍵</h2>
      <p className="pb-12">
        データの送信について、必要に応じて以下の公開鍵をご利用ください。
      </p>
      <div className="flex justify-center">
        <Button asChild className=''>
          <Link className="sm:w-[50%] w-full" href="/飯田優斗_0x5FCD7250_public.asc" download>PGP鍵をダウンロード</Link>
        </Button>
      </div>

      <iframe
        name="hidden_iframe"
        id="hidden_iframe"
        style={{ display: "none" }}
      ></iframe>
    </div>
  );
};

export default ContactPage;
