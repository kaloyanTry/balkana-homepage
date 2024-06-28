import Image from 'next/image';
import Link from 'next/link';

import logo from '@/public/logo.png';

function Logo() {
  return (
    <Link href='/' className='flex items-center gap-4 z-10'>
      <Image
        src={logo}
        width={120}
        height={80}
        priority
        quality={100}
        alt='Balkana Try Logo'
        style={{ width: '100%', height: 'auto' }}
      />
      <span className='text-6xl font-semibold text-primary-200'>
        BalkanaTry
      </span>
    </Link>
  );
}

export default Logo;
