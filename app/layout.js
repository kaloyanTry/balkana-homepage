import { Sofia_Sans_Condensed } from 'next/font/google';
import './globals.css';

const sofia_sans = Sofia_Sans_Condensed({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '400', '600', '800'],
});

export const metadata = {
  title: 'BalkanaTry',
  keywords:
    'Balkana, Stara planina mountain, Tryavna, routes, trails, paths, mountain running, cycling, hiking, web application',
  description:
    'Balkana web application, routes in Stara planina, around Tryavna routes, paths, trails',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${sofia_sans.className} antialiased flex flex-col relative min-h-screen`}
      >
        <main className='w-full'>{children}</main>
      </body>
    </html>
  );
}
