import React from 'react'
// import Icons from './icons'
import Lowernav from './lowernav'
import Copyright from './copyright'
import Image from 'next/image'
import { Separator } from '../ui/separator'
const footer = () => {
    return (
        <div className='bg-[#f5f5f7] text-[#6c6c6c] py-12 no-print'>
            <div className='h-auto w-[90%]  m-auto'>
                <div className='lg:flex lg:flex-row-reverse justify-between lg:pb-12'>
                    {/* <div className='flex justify-center pb-6'>
                        <Icons />
                    </div> */}
                    <ul className='flex flex-wrap justify-center gap-8 gap-y-0 pb-6'>
                        <Lowernav />
                    </ul>
                </div>
                <Image 
                    src="/wordmark.svg"
                    alt="ワードマーク"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto select-none"
                    draggable="false"
                />
                <Separator className='my-4'/>
                <Copyright />
            </div>
        </div>
    )
}

export default footer