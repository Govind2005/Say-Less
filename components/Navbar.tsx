import React from 'react'
import Link from 'next/link'
import CustomButton from './CustomButton'

const Navbar = () => {
  return (
    <header className='w-full absolute z-10 bg-pink-200'>
        <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
            <Link href="/" className='flex justify-center items-center'>
                Home Navbar
            </Link>
            {/* <Link className='text-blue-700 font-bold p-2 bg-slate-50' href={"/add"}>
              Create
            </Link> */}
            <CustomButton 
                title='Cart' 
                containerStyles='text-primary-blue rounded-full bg-white min-w-[130px]'
                btnType='button'
            >
            </CustomButton>
        </nav>
        
    </header>
  )
}

export default Navbar
