import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://meshiden.jp/disclaimer",
  },
};

const page = () => {
    return (
        <div  className='sm:w-[70%] w-[90%] m-auto pb-32'>
            <h3 id='disclaimer' className='text-center'>免責事項</h3>

            <p>当サイトをご利用いただく際には、以下の免責事項をお読みいただき、同意された場合にのみご利用ください。</p>

            <h4 id='accuracy'>情報の正確性について</h4>
            <p>当サイトでは、可能な限り正確な情報を提供するよう努めておりますが、内容の正確性や完全性を保証するものではありません。掲載されている情報に基づいて行動する際は、自己責任でお願いいたします。</p>

            <h4 id='contents_change'>コンテンツの変更・削除について</h4>
            <p>当サイトに掲載されている情報は、予告なしに変更・削除されることがあります。当サイトの情報を利用したことによる損害について、一切の責任を負いません。</p>

            <h4 id='external_links'>外部リンクについて</h4>
            <p>当サイトには外部サイトへのリンクが含まれていますが、それらのサイトの内容や運営については一切関知しておりません。リンク先のサイトの利用に関して生じたトラブル等についても、当サイトは責任を負いかねます。</p>

            <h4 id='disc_change'>免責事項の変更について</h4>
            <p>当サイトの免責事項は、必要に応じて変更・改訂されることがあります。最新の免責事項をご確認のうえ、ご利用ください。</p>

            <h4 id='copyright'>著作権について</h4>
            <p>当サイトに掲載されている文章、画像、その他のコンテンツの著作権は、運営者に帰属します。無断での転載や使用はご遠慮ください。</p>

            <h4 id='contact'>お問い合わせ</h4>
            <p>免責事項に関するお問い合わせは、当サイト内の<a className='b' href='/contact'>お問い合わせフォーム</a>までお願いいたします。</p>
        
            <p className='flex justify-end pt-16'>最終更新日: 2025年2月7日</p>

        </div>
    )
}

export default page