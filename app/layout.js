import { Bubbler_One } from 'next/font/google';
import './globals.css';

const bubbler = Bubbler_One({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

export const metadata = {
  title: 'BalkanaTry',
  keywords:
    'Balkana, Stara planina mountain, Tryavna, routes, tracks, trails, paths, mountain running, cycling, hiking, web application',
  description:
    'Balkana web application, routes in Stara planina mountain, around Tryavna routes, tracks, paths, trails',
};

export default function RootLayout({ children, params }) {
  // const locale = params?.locale || 'en';
  // const fontClass = locale === 'bg' ? sofia_sans.className : bubbler.className;

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
