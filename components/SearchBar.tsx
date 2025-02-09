"use client";

import React from 'react'
import { Combobox,Transition } from '@headlessui/react'
import Image from 'next/image';

const SearchBar = () => {
  return (
    <form action="">
        SearchBar
        <div className='search-manufacture'>
            <Combobox>
                <div className='relative w-full'>
                    <Combobox.Button className="absolute top-[14px]">
                        <Image
                            src={"/magnifying-glass.svg"}
                            width={20}
                            height={20}
                            className='ml-4'
                            alt='logo'
                            />
                            
                    </Combobox.Button>
                </div>
            </Combobox>
        </div>
    </form>
  )
}

export default SearchBar
