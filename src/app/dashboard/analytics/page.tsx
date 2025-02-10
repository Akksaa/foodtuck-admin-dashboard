import Chart from '@/components/dashboard/Chart'
import React from 'react'

function page() {
  return (
    <div className='aspace-y-4'>
        <h1 className="text-3xl font-bold">Analy<span className="text-primYellow">tics</span> Overview</h1>
      <Chart/>
    </div>
  )
}

export default page
