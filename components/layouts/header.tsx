"use client";

import { useState, useEffect } from "react";
import React from 'react'
import Lowernav from './lowernav'
import Nav from './nav'
import AlgoliaSearch from './algolia-search'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"



const Header = () => {
    const [isPrideMonth, setIsPrideMonth] = useState(false);

    useEffect(() => {
        setIsPrideMonth(new Date().getMonth() === 5);
    }, []);

    return (
        <div className='sticky top-0 w-full z-50 text-black bg-white/80 backdrop-saturate-[180%] backdrop-blur-xl no-print'>
            <div className='lg:h-14 h-12 w-[90%] m-auto flex justify-between items-center'>
                <a className='flex' href="/">
                    {isPrideMonth && (
                        <p className='lg:text-3xl text-2xl leading-[48px] pr-4 font-[din-2014] font-bold select-none' style={{background:'linear-gradient(90deg, #E40303 0% 20%, #FF8C00 20% 35%, #FFD700 35% 50%, #008026 50% 65%, #004DFF 65% 80%, #750787 80% 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>daman</p>
                    )}
                    {!isPrideMonth && (
                        <p className='lg:text-3xl text-2xl leading-[48px] pr-4 font-[din-2014] font-bold select-none'>daman</p>
                    )}
                </a>
                <div className='lg:hidden flex items-center gap-2'>
                    <AlgoliaSearch />
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

                <div className='gap-4 font-bold lg:flex hidden text-sm items-center'>
                    <ul id='header' className='gap-8 font-bold flex text-sm'>
                        <Nav />
                    </ul>
                    <AlgoliaSearch />
                </div>
            </div>
        </div>
    )
}

export default Header