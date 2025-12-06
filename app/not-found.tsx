import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const notfound = () => {
    return (
        <div className="sm:w-[70%] w-[90%] m-auto flex-grow">
            <h1 className=''>404</h1>
            <div className='sm:flex gap-12'>
                <div className='sm:w-1/2'>
                    <h2 className='pt-0'>指定されたページは存在しません</h2>
                    <p className=''>アクセスしていただいたページは、削除もしくは移動した可能性があります。</p>
                </div>
                <div className='sm:w-1/2'>
                    <h2 className='sm:pt-0'>Page not found</h2>
                    <p className=''>The page you have accessed may have been deleted or moved.</p>
                </div>
            </div>

            <div className="flex justify-center pt-10">
                <Button asChild className='mt-3 mb-24 sm:mt-20'>
                    <Link className="sm:w-[50%] w-full" href="/">ホームへ戻る</Link>
                </Button>

            </div>
        </div>
    )
}

export default notfound