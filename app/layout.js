import {
  Bubbler_One,
  // Zen_Kurenaido,
  Sofia_Sans_Condensed,
} from 'next/font/google';
import './globals.css';

const bubbler = Bubbler_One({ subsets: ['latin'], weight: '400' });
// const kurenaido = Zen_Kurenaido({ subsets: ['cyrillic'], weight: '400' });
const sofia_sans = Sofia_Sans_Condensed({
  subsets: ['cyrillic'],
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
  const locale = params?.locale || 'en';
  const fontClass = locale === 'bg' ? sofia_sans.className : bubbler.className;

  return (
    <html lang={locale}>
      <body
        className={`${fontClass} antialiased flex flex-col relative min-h-screen`}
      >
        <main className='w-full'>{children}</main>
      </body>
    </html>
  );
}
