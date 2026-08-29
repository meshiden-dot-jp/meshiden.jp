import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://meshiden.jp/ai",
  },
};

export default function aipolicy() {
    return (
        <main className="sm:w-[70%] w-[90%] m-auto pb-32 min-h-screen">
            <h3 id='ai' className='text-center'>AIポリシー</h3>
            <p>
                当サイトのAI利用に関するポリシーについてご説明します。
            </p>
            <h4 id='purpose'>AIの利用目的</h4>
            <p>
                当サイトはAI技術を活用し、ユーザー体験の向上、業務の効率化、データ分析の精度向上を目的としています。
            </p>
            <h4 id='data_handring'>データの取り扱い</h4>
            <p>
                AIによるデータ処理は、プライバシーとセキュリティを最優先にし、適用される法律や規制を遵守します。
            </p>
            <h4 id='decision_making'>AIによる意思決定</h4>
            <p>
                AIは補助的なツールとして活用され、最終的な判断は人間によって行われます。重要な意思決定にはAIのみを使用しません。
            </p>
            <h4 id='user_rights'>ユーザーの権利</h4>
            <p>
                ユーザーは、AIによるデータ処理について説明を求める権利を持ちます。また、データの利用停止をリクエストすることができます。
            </p>
            <h4 id='acconutability'>AIの透明性と説明責任</h4>
            <p>
                AIの使用に関する情報は公開し、適切な監査・評価を行うことで、透明性を確保します。
            </p>
            <h4 id='improvement'>継続的な改善</h4>
            <p>
                当サイトは、AIの倫理的な利用と継続的な改善に努め、安全で公平な技術を提供することを約束します。
            </p>
            <h4 id='contact'>お問い合わせ</h4>
            <p>本ポリシーに関するお問い合わせは、当サイト内の<a className='b' href='/contact'>お問い合わせフォーム</a>までお願いいたします。</p>

            <p className='flex justify-end pt-16'>最終更新日: 2025年2月7日</p>
        </main>
    );
}