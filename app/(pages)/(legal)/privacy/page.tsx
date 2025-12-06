import React from 'react'

const page = () => {
    return (
        <div  className='sm:w-[70%] w-[90%] m-auto pb-32'>
            <h3 id='privacy' className='text-center'>プライバシーポリシー</h3>
            <p>本プライバシーポリシーは、当サイトにおける個人情報の取扱いについて説明するものです。</p>

            <h4 id='collection'>個人情報の収集について</h4>
            <p>当サイトでは、以下の方法で利用者の個人情報を収集することがあります。</p>
            <ul className='pt-4 pl-8 list-disc'>
                <li>お問い合わせフォームの送信時</li>
                <li>コメント投稿時</li>
                <li>アクセス解析ツールによるデータ収集</li>
            </ul>

            <h4 id='purpose'>個人情報の利用目的</h4>
            <p>当サイトでは、取得した個人情報を以下の目的で利用します。</p>
            <ul className='pt-4 pl-8 list-disc'>
                <li>お問い合わせへの対応</li>
                <li>サービスの提供・改善</li>
                <li>不正行為の防止</li>
                <li>法的義務の履行</li>
            </ul>

            <h4 id='offer'>個人情報の第三者提供</h4>
            <p>取得した個人情報は、以下の場合を除き第三者に開示することはありません。</p>
            <ul className='pt-4 pl-8 list-disc'>
                <li>本人の同意がある場合</li>
                <li>法令に基づく要請がある場合</li>
                <li>当サイトの権利・財産を保護する必要がある場合</li>
            </ul>

            <h4 id='cookies'>クッキー（Cookies）について</h4>
            <p>当サイトでは、ユーザーの利便性向上やアクセス解析のためにクッキーを使用する場合があります。クッキーの使用を拒否することも可能ですが、一部の機能が制限される場合があります。</p>

            <h4 id='control'>個人情報の管理</h4>
            <p>当サイトは、利用者の個人情報を適切に管理し、外部への漏洩や改ざんを防ぐための適切な対策を講じます。</p>

            <h4 id='change'>プライバシーポリシーの変更</h4>
            <p>本ポリシーの内容は、必要に応じて変更される場合があります。変更後のプライバシーポリシーは、当サイトに掲載された時点で効力を持ちます。</p>

            <h4 id='contact'>お問い合わせ</h4>
            <p>本ポリシーに関するお問い合わせは、当サイト内の<a className='b' href='/contact'>お問い合わせフォーム</a>までお願いいたします。</p>
        
            <p className='flex justify-end pt-16'>最終更新日: 2025年2月7日</p>

        </div>
    )
}

export default page