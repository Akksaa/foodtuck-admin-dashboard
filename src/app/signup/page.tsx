import Signup from '@/components/Signup'
import React from 'react'

const page = () => {
  return (
    <div className=''>
      <div className='p-6'>
      <h1 className=" text-center text-2xl font-bold mb-6">Welcome To Food<span className="text-primYellow">Tuck</span> Admin Dashboard<span className="text-primYellow">!</span></h1>
      </div>
      <Signup/>

    </div>
  )
}

export default page