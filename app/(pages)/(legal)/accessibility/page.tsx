import React from 'react'
import type { Metadata } from 'next'

const url = 'https://meshiden.jp/accessibility'
const title = 'ウェブアクセシビリティ｜飯田優斗のポートフォリオサイト'
const description = '当サイトのウェブアクセシビリティ向上に向けた取り組みについて説明しています。'
const ogImage = 'https://meshiden.jp/ogp-default.jpg'

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
        title,
        description,
        url,
        type: 'website',
        images: [{ url: ogImage }],
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImage],
    },
}

const page = () => {
    return (
        <div className='sm:w-[70%] w-[90%] m-auto pb-32'>
            <h3 id='accessibility' className='text-center'>ウェブアクセシビリティ</h3>
            <p>当サイトは、すべてのユーザーが快適にウェブサイトを利用できるよう、ウェブアクセシビリティの向上に努めています。</p>

            <h4 id='effort'>アクセシビリティ対応の取り組み</h4>
            <ul className='pt-4 pl-8 list-disc'>
                <li>適切なコントラスト比を確保し、視認性を向上</li>
                <li>スクリーンリーダー対応のための適切なHTML構造を維持</li>
                <li>キーボード操作によるナビゲーションの最適化</li>
                <li>画像には代替テキスト（alt属性）を適切に設定</li>
                <li>動画コンテンツには字幕やテキスト説明を提供</li>
            </ul>

            <h4 id='standard'>アクセシビリティ基準の準拠</h4>
            <p>当サイトは、<a className='b' href="https://www.w3.org/TR/WCAG/" target="_blank" rel="noopener noreferrer">WCAG (Web Content Accessibility Guidelines)</a> に準拠することを目標としています。</p>

            <h4 id='after_effort'>今後の取り組み</h4>
            <p>ユーザーの皆様からのフィードバックをもとに、引き続きウェブアクセシビリティの改善に取り組んでまいります。</p>

            <h4 id='contact'>お問い合わせ</h4>
            <p>当サイトのアクセシビリティに関するご意見・ご質問は、当サイト内の<a className='b' href='/contact'>お問い合わせフォーム</a>までお願いいたします。</p>

            <p className='flex justify-end pt-16'>最終更新日: 2025年2月7日</p>
        </div>
    )
}

export default page