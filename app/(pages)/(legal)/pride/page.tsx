import React from 'react'

const PridePolicyPage = () => {
    return (
        <div className='sm:w-[70%] w-[90%] m-auto pb-32'>
            <h3 id='pride' className='text-center'>プライドポリシー</h3>
            <p>私の制作・開発において、<strong>多様性（ダイバーシティ）と包摂性（インクルージョン）</strong>はとても大切な価値観です。
                性別、性的指向、性自認、文化、国籍、年齢、障がいの有無など、さまざまな背景を持つすべての人が、安心して利用できるプロダクト・サービスを目指しています。</p>

            <h4 id='user-experience'>ユーザー体験としての多様性配慮</h4>
            <p>デザインやUI/UXでは、誰もが心地よく利用できるインターフェース・表現・ナビゲーションを意識しています。色使い、表現、文言選びにおいてもステレオタイプにとらわれない配慮を心がけています。</p>

            <h4 id='development'>開発・実装としてのインクルージョン</h4>
            <p>アクセシビリティ基準（WCAG等）に配慮したコーディングを行い、すべてのユーザーがアクセスしやすいシステム設計を実践しています。また、性別・名前の入力項目などでも多様な選択肢を考慮します。</p>

            <h4 id='privacy'>プライバシーと安全性への配慮</h4>
            <p>個人の肖像を含む個人情報やプライバシーに十分配慮し、安全に取り扱うことを徹底しています。</p>
            <small>※ この項目は<a className='b' href="/privacy">プライバシーポリシー</a>も併せてご覧ください。</small>

            <h4 id='learning'>学び続ける姿勢</h4>
            <p>多様性と表現のあり方は日々進化しています。私は常に新しい知見を学び、偏りに気づき、アップデートし続ける姿勢を大切にしています。</p>
            <p>私は、<a className='b' href='https://pride.tokyo/' target="_blank" rel="noopener noreferrer">Tokyo Pride 2025 <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i></a> などのイベントに積極的に参加し、さまざまな価値観の違いを積極的に取り入れます。</p>

            <h4 id='contact'>お問い合わせ</h4>
            <p>本ポリシーに関するお問い合わせは、当サイト内の<a className='b' href='/contact'>お問い合わせフォーム</a>までお願いいたします。</p>

            <p className='pt-8'>多様性は創造の源泉であり、イノベーションを生み出す力だと信じています。<br />
                ものづくりを通して、誰もが自分らしくいられる世界の一助となることを目指しています。</p>

            <p className='flex justify-end pt-16'>最終更新日: 2025年6月1日</p>
        </div>
    )
}

export default PridePolicyPage
