'use client'

import AccessDeniedPage from '@/components/dashboard/AccessDenied'
import React from 'react'
import  { useRouter } from 'next/navigation'

const AdminAccessDenied = () => {
    const router = useRouter()
  return (
<AccessDeniedPage 
  title="Admin Access Required" 
  message="Only administrators can view this section." 
  onGoBack={() => router.push('/')} 
/>
  )
}

export default AdminAccessDenied