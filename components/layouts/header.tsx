"use client";

// import { useState, useEffect } from "react";
import React from 'react'
import Lowernav from './lowernav'
import Nav from './nav'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"



const Header = () => {
    return (
        <div className='sticky top-0 w-full z-50 text-black bg-white/80 backdrop-saturate-[180%] backdrop-blur-xl no-print'>
            <div className='lg:h-14 h-12 w-[90%] m-auto flex justify-between items-center'>
                <a className='flex' href="/">
                    <p className='lg:text-3xl text-2xl leading-[48px] pr-4 font-[din-2014] font-bold'>IIDA</p>
                </a>

                <div className='lg:hidden flex'>
                    <Sheet>
                        <SheetTrigger aria-label="メニューバー"><i className="fa-solid fa-bars"></i></SheetTrigger>
                        <SheetContent className='w-screen pt-24'>
                            <SheetHeader>
                                <SheetDescription>
                                    <ul className='text-2xl text-black font-bold grid gap-8 pl-8 text-left'>
                                        <Nav />
                                    </ul>
                                    <div className='text-left pt-16  pl-8'>
                                        <ul className='list-none grid gap-4'>
                                            <Lowernav />
                                        </ul>
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>

                <ul id='header'  className='gap-8 font-bold lg:flex hidden text-sm'>
                    <Nav />
                </ul>
            </div>
        </div>
    )
}

export default Header