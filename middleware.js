import { auth } from '@/lib/auth';
export const middleware = auth;

// Protecting route:
export const config = { matcher: ['/home/explorer'] };
