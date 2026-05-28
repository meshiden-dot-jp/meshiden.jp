import React from 'react'
// import Icons from './icons'
import Lowernav from './lowernav'
import Copyright from './copyright'
import Image from 'next/image'
// import { Separator } from '../ui/separator'
const footer = () => {
    return (
        <div className='bg-[#f5f5f7] text-[#6c6c6c] py-8 no-print'>
            <div className='h-auto w-[90%]  m-auto'>
                {/* <Separator className='my-8'/> */}
                <div className='lg:flex lg:flex-row-reverse justify-between mt-8 mb-16'>
                    {/* <div className='flex justify-center pb-6'>
                        <Icons />
                    </div> */}
                    <ul className='flex flex-wrap justify-center gap-8 gap-y-0 pb-8 sm:pb-0'>
                        <Lowernav />
                    </ul>
                    <Copyright />
                </div>
                {/* <small className="flex gap-[2px] pt-2 leading-6 before:content-['※']">
                    <span>
                        本サイト内のイラストには一部、Googleが提供する
                        <a href="https://gemini.google.com/app" className='b'>Gemini</a>
                        を使用して作成したものが含まれます。
                    </span>
                </small>
                <small className="flex gap-[2px] leading-6 before:content-['※'] mb-16">
                    <span>本サイト内の画像およびイラストの無断使用はこれを禁止します。</span>
                </small> */}
                {/* <Separator className='my-8'/> */}
                <Image
                    src="/wordmark.svg"
                    alt="ワードマーク"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto select-none"
                    draggable="false"
                />
            </div>
        </div>
    )
}

export default footer