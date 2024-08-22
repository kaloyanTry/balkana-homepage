import { Bubbler_One } from 'next/font/google';
import './globals.css';

const bubbler = Bubbler_One({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

export const metadata = {
  title: 'Balkana Home Page',
  keywords: 'Balkana, Stara planina, Tryavna, routes',
  description:
    'Balkana web application, routes in Stara planina, around Tryavna routes, paths, trails',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${bubbler.className} antialiased flex flex-col relative min-h-screen`}
      >
        <main className='w-full'>{children}</main>
      </body>
    </html>
  );
}
