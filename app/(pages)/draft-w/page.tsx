import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const notfound = () => {
    return (
        <>
        <head>
            <meta name="robots" content="noindex, nofollow" />
        </head>
        <div className="sm:w-[70%] w-[90%] m-auto flex-grow">
            <h1 className=''>###</h1>
            <div className='sm:flex gap-12'>
                <div className='sm:w-1/2'>
                    <h2 className='pt-0'>権限がありません</h2>
                    <p className=''>アクセスしていただいたページは、管理者権限でのみ閲覧ができます。</p>
                </div>
                <div className='sm:w-1/2'>
                    <h2 className='sm:pt-0'>Not authorized</h2>
                    <p className=''>Accessed pages can only be viewed with administrative privileges.</p>
                </div>
            </div>

            <div className="flex justify-center pt-10">
                <Button asChild className='mt-3 mb-24 sm:mt-20'>
                    <Link className="sm:w-[50%] w-full" href="/">ホームへ戻る</Link>
                </Button>

            </div>
        </div>
        </>
    )
}

export default notfound