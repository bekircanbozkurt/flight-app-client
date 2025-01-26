import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add paths that require authentication
const protectedPaths = ['/dashboard']
const authPaths = ['/login']

export function middleware(request: NextRequest) {
    // Get the pathname of the request
    const path = request.nextUrl.pathname

    // Get the token from cookies with enhanced security
    const token = request.cookies.get('access_token')

    // Check if the path is protected
    const isProtectedPath = protectedPaths.some(prefix => path.startsWith(prefix))
    // Check if the path is auth-related (login, register, etc.)
    const isAuthPath = authPaths.some(prefix => path.startsWith(prefix))

    try {
        // If user is authenticated and tries to access login page, redirect to dashboard
        if (isAuthPath && token?.value) {
            const dashboardUrl = new URL('/dashboard', request.url)
            return NextResponse.redirect(dashboardUrl)
        }

        // If path requires authentication
        if (isProtectedPath) {
            // Verify token exists and has a value
            if (!token?.value) {
                return redirectToLogin(request)
            }

            // Add security headers
            const response = NextResponse.next()
            
            // Enhanced Security Headers
            response.headers.set('X-Frame-Options', 'DENY')
            response.headers.set('X-Content-Type-Options', 'nosniff')
            response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
            response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
            
            // Updated CSP headers to allow API requests
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
            response.headers.set(
                'Content-Security-Policy',
                `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' ${apiUrl}; font-src 'self'; object-src 'none'; media-src 'self'; frame-src 'none';`
            )
            
            return response
        }

        return NextResponse.next()
    } catch (error) {
        console.error('Middleware error:', error)
        return redirectToLogin(request)
    }
}

function redirectToLogin(request: NextRequest) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
}

// Configure the paths that middleware will run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ],
} 