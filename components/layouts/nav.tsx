import React from 'react'
import Link from 'next/link'

const lists = () => {
    return (
        <>
            <li><Link href="/work">作品一覧</Link></li>
            <li><Link href="/profile">自己紹介</Link></li>
            <li><Link href="/news">お知らせ</Link></li>
            <li><Link href="/blog">技術ブログ</Link></li>
            <li><Link href="/contact">お問い合わせ</Link></li>
        </>
    )
}

export default lists
