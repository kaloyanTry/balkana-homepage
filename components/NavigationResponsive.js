'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Bars4Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

function NavigationResponsive() {
  // get the explorer's image from Google or GitHub. Because of auth() => cookies... Navigation is dynamic rendered!!!, and so the entire website
  //Later leave this approach and make it dynamic only exploration form:
  // const session = await auth();
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav
      className='z-10 flex w-full fixed top-0 ease-in duration-300 text-2xl text-accent-300 font-semibold'
      // className='z-10 fixed w-full left-0 top-0 ease-in duration-300 text-2xl text-accent-300 font-semibold'
    >
      <div className='max-w-[1680px] w-auto flex justify-between items-center text-accent-300 gap-12 mx-auto mt-4'>
        <div>
          <Logo />
        </div>
        <ul className='hidden sm:flex'>
          <li className='p-4'>
            <Link
              href='/home'
              className='hover:text-accent-200 transition-colors'
            >
              Home
            </Link>
          </li>

          <li className='p-4'>
            <Link
              href='/home/projects'
              className='hover:text-accent-200 transition-colors '
            >
              Projects
            </Link>
          </li>
          <li className='p-4'>
            <Link
              href='/home/tracks'
              className='hover:text-accent-200 transition-colors '
            >
              Trails
            </Link>
          </li>
          <li className='p-4'>
            <Link
              href='/home/explorer'
              className='hover:text-accent-200 transition-colors '
            >
              Explorer
            </Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className='block sm:hidden z-10'>
          {nav ? (
            <XMarkIcon className='h-12 w-12 text-accent-100' />
          ) : (
            <Bars4Icon className='h-12 w-12' />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-accent-300 text-center ease-in duration-300'
              : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-accent-300 text-center ease-in duration-300'
          }
        >
          <ul>
            <li className='p-4 text-2xl text-accent-100 hover:text-accent-200'>
              <Link
                href='/home'
                className='hover:text-accent-200 transition-colors'
              >
                Home
              </Link>
            </li>

            <li className='p-4 text-2xl text-accent-100 hover:text-accent-200'>
              <Link
                href='/home/projects'
                className='hover:text-accent-200 transition-colors '
              >
                Projects
              </Link>
            </li>
            <li className='p-4 text-2xl text-accent-100 hover:text-accent-200'>
              <Link
                href='/home/tracks'
                className='hover:text-accent-200 transition-colors '
              >
                Trails
              </Link>
            </li>
            <li className='p-4 text-2xl text-accent-100 hover:text-accent-200'>
              <Link
                href='/home/explorer'
                className='hover:text-accent-200 transition-colors '
              >
                Explorer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationResponsive;
