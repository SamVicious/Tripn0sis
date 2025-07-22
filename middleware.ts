// Create this file at: C:\Users\samaq\IdeaProjects\Tripn0sis\middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the path the user is trying to access
    const path = request.nextUrl.pathname;

    // Define paths that are accessible without authentication
    const isPublicPath = path === '/auth' || path === '/admin' || path === '/' || path.startsWith('/_next') || path.includes('/api/');

    // Define admin paths that require admin authentication
    const isAdminPath = path.startsWith('/admin') && path !== '/admin';

    // Get the user token from cookies (for regular user authentication)
    const userToken = request.cookies.get('auth-token')?.value;

    // If the user is not logged in and trying to access a protected route, redirect to login
    if (!isPublicPath && !userToken) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    // If the user is logged in and trying to access login page, redirect to dashboard
    if (path === '/auth' && userToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Continue with the request if everything is fine
    return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};