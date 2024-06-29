import { PlayCircleIcon, PhotoIcon } from '@heroicons/react/24/solid';

import Image from 'next/image';
import GithubSvg from '../assets/github-mark-white.svg';
import InstagramSvg from '../assets/instagram.svg';
import Link from 'next/link';

function Footer() {
  return (
    <footer className='w-screen px-10 py-4 bg-accent-300'>
      {/*  */}
      <div className='flex flex-wrap mb-2'>
        <div className='w-1/3 mb-4h-auto px-2'>
          <h3>App Map</h3>
          <ul className='mt-4 text-accent-100'>
            <li className='mt-4'>
              <Link href='https://github.com/'>Home</Link>
            </li>
            <li className='mt-4'>
              <Link href='https://tailwindcss.com/'>Tracks</Link>
            </li>
            <li className='mt-4'>
              <Link href='https://nextjs.org/'>Projects</Link>
            </li>
            <li className='mt-4'>
              <Link href='https://react.dev/'>Explorer profile</Link>
            </li>
          </ul>
        </div>

        <div className='w-1/3 mb-4 h-auto'>
          <h3>App Follow</h3>
          <ul className=' bg-accent-300 text-accent-100 mt-4 px-2'>
            <li className='mt-4'>
              <Image
                src={GithubSvg}
                alt='github'
                width={25}
                height={25}
                // className='fill-accent-100'
              />
              <span>GitHub</span>
            </li>
            <li>
              <PlayCircleIcon className='h-6 w-6' />
              <span>YouTube</span>
            </li>
            <li>
              <Image src={InstagramSvg} alt='github' width={25} height={25} />
              <span>Instagram</span>
            </li>
          </ul>
        </div>

        <div className='w-1/3 mb-4 h-auto px-2'>
          <h3>App Links</h3>
          <ul className='mt-4 text-accent-100'>
            <li className='mt-4'>
              <Link href='https://github.com/'>GitHub</Link>
            </li>
            <li className='mt-4'>
              <Link href='https://tailwindcss.com/'>Tailwind</Link>
            </li>
            <li className='mt-4'>
              <Link href='https://nextjs.org/'>Next.js</Link>
            </li>
            <li className='mt-4'>
              <Link href='https://react.dev/'>React</Link>
            </li>
            <li className='mt-4'>
              <Link href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'>
                JavaScript
              </Link>
            </li>
          </ul>
        </div>

        <div class='flex mb-4'>
          <div class='flex-1 h-auto'>
            <span className='text-accent-200 justify-center font-light text-lg'>
              BalkanaTry&#8482; All rights reserved &#169; Contact us or follow
              us
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
