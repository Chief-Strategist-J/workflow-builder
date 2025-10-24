import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This is a basic middleware for authentication protection
// In a real application, you would integrate with your authentication system
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedRoutes = ['/dashboard']
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  // For demo purposes, we'll check for a simple auth token
  // In production, you'd validate JWT tokens or session cookies
  const authToken = request.cookies.get('auth-token')?.value
  const isAuthenticated = authToken === 'authenticated' // Simple check for demo

  // If accessing protected route without authentication, redirect to signin
  if (isProtectedRoute && !isAuthenticated) {
    const signinUrl = new URL('/signin', request.url)
    signinUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(signinUrl)
  }

  // If authenticated and trying to access auth pages, redirect to dashboard
  if (isAuthenticated && (pathname === '/signin' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Allow the request to continue
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
