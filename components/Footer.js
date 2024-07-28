import Image from 'next/image';
import GithubSvg from '@/assets/github-mark-white.svg';
import VercelSvg from '@/assets/vercel.svg';
import Link from 'next/link';

function Footer() {
  return (
    <footer className='w-screen px-10 py-4 bg-accent-300'>
      {/*  */}
      <div className='flex flex-wrap'>
        <div className='w-1/3 h-auto'>
          <h3 className='text-primary-300 font-bold pb-1'>App Map</h3>
          <ul className='text-accent-100'>
            <li className='pb-1'>
              <Link href='/home' rel='noopener noreferrer' target='_blank'>
                Home
              </Link>
            </li>
            <li className='pb-1'>
              <Link
                href='/home/projects'
                rel='noopener noreferrer'
                target='_blank'
              >
                Projects
              </Link>
            </li>
            <li className='pb-1'>
              <Link
                href='/home/tracks'
                rel='noopener noreferrer'
                target='_blank'
              >
                Routes
              </Link>
            </li>

            <li className='pb-1'>
              <Link
                href='home/explorer'
                rel='noopener noreferrer'
                target='_blank'
              >
                Explorer profile
              </Link>
            </li>
          </ul>
        </div>

        <div className='w-1/3 h-auto'>
          <h3 className='text-primary-300 font-bold pb-1'>App Links</h3>
          <ul className=' text-accent-100'>
            <li className='pb-1'>
              <Link
                href='https://github.com/'
                rel='noopener noreferrer'
                target='_blank'
              >
                GitHub
              </Link>
            </li>
            <li className='pb-1'>
              <Link
                href='https://tailwindcss.com/'
                rel='noopener noreferrer'
                target='_blank'
              >
                Tailwind
              </Link>
            </li>
            <li className='pb-1'>
              <Link
                href='https://nextjs.org/'
                rel='noopener noreferrer'
                target='_blank'
              >
                Next.js
              </Link>
            </li>
            <li className='pb-1'>
              <Link
                href='https://react.dev/'
                rel='noopener noreferrer'
                target='_blank'
              >
                React
              </Link>
            </li>
            <li className='pb-1'>
              <Link
                href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'
                rel='noopener noreferrer'
                target='_blank'
              >
                JavaScript
              </Link>
            </li>
          </ul>
        </div>

        <div className='w-1/3 pb-1 h-auto'>
          <h3 className='text-primary-300 font-bold pb-1'>App Follow</h3>
          <ul className=' bg-accent-300 text-accent-100'>
            <li className='py-1 w-12'>
              <Link
                href='https://github.com/'
                rel='noopener noreferrer'
                target='_blank'
              >
                <Image
                  src={GithubSvg}
                  alt='github logo'
                  width='auto'
                  height='auto'
                />
              </Link>
            </li>
            <li className='py-1 w-28'>
              <Link
                href='https://vercel.com/'
                rel='noopener noreferrer'
                target='_blank'
              >
                <Image
                  src={VercelSvg}
                  alt='vercel logo'
                  width='auto'
                  height='auto'
                />
              </Link>
            </li>
          </ul>
        </div>

        <div className='w-screen flex justify-end'>
          <p className='text-accent-200 text-lg'>
            All rights reserved&#169;{' '}
            <span className='text-accent-100 font-normal'>
              BalkanaTry&#8482;
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
