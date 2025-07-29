import { auth } from '@/lib/auth';
export const middleware = auth;

// Protecting route:
export const config = {
  matcher: ['/home/explorer'],
};
/////// code before internalization ////////////

// import { auth } from '@/lib/auth';
// import createIntlMiddleware from 'next-intl/middleware';

// const intlMiddleware = createIntlMiddleware({
//   locales: ['en', 'bg'],
//   defaultLocale: 'en',
// });

// export default function middleware(request) {
//   const pathname = request.nextUrl.pathname;

//   // Always apply internationalization first
//   const response = intlMiddleware(request);

//   // Check if this is a protected route (with locale prefix)
//   const isExplorerRoute = pathname.match(/^\/(en|bg)\/home\/explorer/);

//   if (isExplorerRoute) {
//     // Apply auth middleware for protected routes
//     return auth(request);
//   }

//   return response;
// }

// export const config = {
//   matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
// };
