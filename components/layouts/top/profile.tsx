"use client"

import React from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const profile = () => {
  return (
    <div>
      <div className='lg:flex items-center gap-[5%] bg-none^ rounded-[16px]'>
        <Image
          className='lg:w-1/3 lg:m-0 m-auto w-full p-0 rounded-xl'
          src='/image/profile.JPG'
          width='900'
          height='900'
          alt='飯田優斗のポートレート。'
        />
        <div className='w-full lg:pt-0 pt-6 sm:text-base text-sm'>
          <p>青山学院大学理工学部情報テクノロジー学科３年</p>
          <p className='sm:text-4xl text-3xl font-bold sm:leading-[84px] leading-[64px]'>飯田 優斗<span className='sm:text-2xl text-xl pl-[5%]'>IIDA Yuto</span></p>
          <p className='sm:text-xl text-base font-bold sm:leading-10 leading-8'>
            はじめまして。 UIデザインとフロントエンド構築をしています。 &quot;Accessibility for All.&quot; を目標に、 誰もが使いやすいUI設計を探求しています。
          </p>
        </div>

      </div>
      <div className='flex justify-end pt-8'>
        <a href="/profile">
          <Button variant="ghost">詳しく見る<i className="fa-solid fa-chevron-right"></i></Button>
        </a>
      </div>
    </div>
  )
}

export default profile