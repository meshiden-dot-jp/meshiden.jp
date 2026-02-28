"use client"

import React from 'react'
import { Button } from '@/components/ui/button';
import Name from '@/components/layouts/profile/name';

const profile = () => {
  return (
    <div>
      <Name />
      <div className='flex justify-end pt-8'>
        <a href="/profile">
          <Button variant="ghost">詳しく見る<i className="fa-solid fa-chevron-right"></i></Button>
        </a>
      </div>
    </div>
  )
}

export default profile