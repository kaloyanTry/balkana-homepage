import { Sofia_Sans_Condensed } from 'next/font/google';
import './globals.css';

const sofia_sans = Sofia_Sans_Condensed({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
});

export const metadata = {
  title: 'BalkanaTry',
  keywords:
    'Balkana, Stara planina mountain, Tryavna, routes, tracks, trails, paths, mountain running, cycling, hiking, web application',
  description:
    'Balkana web application, routes in Stara planina mountain, around Tryavna routes, tracks, paths, trails',
};

export default function RootLayout({ children, params }) {
  return (
    <html>
      <body
        className={`${sofia_sans.className} antialiased flex flex-col relative min-h-screen`}
      >
        <main className='w-full'>{children}</main>
      </body>
    </html>
  );
}
