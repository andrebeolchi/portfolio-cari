import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware, redirectToHome, redirectToLogin } from 'next-firebase-auth-edge'

import { clientConfig, serverConfig } from '@/interfaces/firebase/config'

const PROJECT_PATH = new RegExp('^/projects/([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12})$')

const PUBLIC_PATHS = ['/login', '/', PROJECT_PATH]

const AUTH_PATHS = ['/login']

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async ({}, headers) => {
      // Authenticated user should not be able to access /login, /register and /reset-password routes
      if (AUTH_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request)
      }

      return NextResponse.next({
        request: {
          headers,
        },
      })
    },
    handleInvalidToken: async reason => {
      console.info('Missing or malformed credentials', { reason })

      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS,
      })
    },
    handleError: async error => {
      console.error('Unhandled authentication error', { error })

      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS,
      })
    },
  })
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\.).*)', '/api/login', '/api/logout'],
}
