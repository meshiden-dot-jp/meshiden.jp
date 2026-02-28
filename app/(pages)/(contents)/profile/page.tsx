"use client";
import React from 'react'
import Name from '@/components/layouts/profile/name';
import Biography from '@/components/layouts/profile/bios';
import Award from '@/components/layouts/profile/awards';
import Skills from '@/components/layouts/profile/skills'
import Links from '@/components/layouts/profile/links';

const page = () => {
  return (
    <div className='sm:w-[70%] w-[90%] m-auto pb-32'>
      <h1 id='profile'>自己紹介</h1>
      <Name />
      <Skills />
      <Biography />
      <Award />
      <Links />
          
    </div>
  )
}

export default page