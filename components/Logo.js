import Image from 'next/image';
import Link from 'next/link';

import logo from '@/public/logo.svg';

function Logo() {
  return (
    <Link href='/' className='flex items-center gap-4 z-10 h-24 w-48'>
      <Image
        src={logo}
        width='auto'
        height='auto'
        priority
        quality={100}
        alt='BalkanaTry Logo'
      />
      {/* <svg
        className='fill-current text-primary-200'
        viewBox='0 0 24 24 h-24 w-24'
        src={logo}
      ></svg> */}
      <span className='text-6xl font-semibold text-primary-200 max-lg:text-4xl max-md:hidden'>
        BalkanaTry
      </span>
    </Link>
  );
}

export default Logo;
