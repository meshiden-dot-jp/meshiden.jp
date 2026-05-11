import React from 'react'
import Image from 'next/image';

const name = () => {
  return (
    <div className='lg:flex items-center gap-[5%] '>
        <div className='relative pt-2 lg:w-2/3 lg:m-0 m-auto w-full p-0 '>
          <Image
            className='rounded-[16%] select-none'
            src='/image/profile.JPG'
            width='900'
            height='900'
            alt='飯田優斗のポートレート。'
            draggable="false"
          />
          <div className="balloon4 absolute top-[-42px] left-[-32px] text-sm sm:text-base text-gray-600">
              <div className="balloon4-inner">
                <p className=' leading-6'>
                  アソビ心が挑戦のカギ🔑<br />
                  このサイトの<a href="/" className="text-blue-500 hover:underline">トップページ</a>上部にある、動くシルエットは見つけられましたか？
                </p>
              </div>
          </div>
          {/* <div className='absolute bottom-[-16%] lg:bottom-[-12%] right-[-14%] lg:right-[-18%] w-[50%] h-[50%] rotate-[-20deg]'>
            <img src="/image/sticker.png" alt="sticker" />
          </div> */}
        </div>
        <div className='w-full lg:pt-0 pt-6 sm:text-base text-sm'>
            
            <p className='sm:text-4xl text-3xl font-bold sm:pt-0 pt-2 sm:pb-4 pb-2'>飯田 優斗<span className='sm:text-2xl text-xl pl-[5%]'>IIDA Yuto</span></p>
            <p className='pb-8'>青山学院大学 理工学部 情報テクノロジー学科 ４年
              {/* <br/><a href="https://www.rcl-aoyama.jp" target="_blank" rel="noopener noreferrer">戸辺研究室所属</a> */}
              </p>
            <p className='sm:text-xl text-base font-bold sm:leading-10 leading-8'>
            はじめまして。 UIデザインとフロントエンド構築をしています。 &quot;Accessibility for All.&quot; を目標に、 誰もが使いやすいUI設計を探求しています。
            </p>
        </div>

    </div>
  )
}

export default name