import { Bubbler_One, Zen_Kurenaido } from 'next/font/google';
import './globals.css';

const bubbler = Bubbler_One({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

const kurenaido = Zen_Kurenaido({
  subsets: ['cyrillic'],
  display: 'swap',
  weight: '400',
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
    <html lang='en, bg'>
      <body
        className={`${bubbler.className} antialiased flex flex-col relative min-h-screen`}
      >
        <main className='w-full'>{children}</main>
      </body>
    </html>
  );
}
