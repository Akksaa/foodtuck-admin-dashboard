import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/';

  const role = request.cookies.get('role')?.value || ''

  if(isPublicPath && role == "admin") {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  if (isPublicPath && role == "user") {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
    
}

 
export const config = {
  matcher: [
    '/',
    '/admin/info',
    '/dashboard',   
    '/dashboard/orders',   
    '/dashboard/products',   
    '/dashboard/customers',   
  ]
}