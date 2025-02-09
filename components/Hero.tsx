"use client"

import React from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import { cakes } from '@/constants'
import ItemList from './ItemList'

const Hero = () => {
  const handleScroll = () => {

  }
  return (
    <div className='Hero p-48 bg-blue-200'>
      This is the Hero area
      <CustomButton
        title="Explore Menu"
        containerStyles="bg-primary-blue text-white rounded-full mt-10"
        handleClick={handleScroll}
        />
        <ItemList/>
    </div> 
  )
}

export default Hero
