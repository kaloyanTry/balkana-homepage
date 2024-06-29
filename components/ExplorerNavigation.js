'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/24/solid';

import SignOutBtn from './SignOutBtn';

const navLinks = [
  {
    name: 'Home',
    href: '/home/explorer',
    icon: <HomeIcon className='h-5 w-5 text-accent-300 ' />,
  },
  {
    name: 'Visitations',
    href: '/home/explorer/visitations',
    icon: <CalendarDaysIcon className='h-5 w-5 text-accent-300' />,
  },
  {
    name: 'Explorer Profile',
    href: '/home/explorer/profile',
    icon: <UserIcon className='h-5 w-5 text-accent-300' />,
  },
];

function ExplorerNavigation() {
  const pathname = usePathname();

  return (
    <nav className='border-r border-accent-300'>
      <ul className='flex flex-col gap-2 h-full text-lg'>
        {navLinks.map((link) => (
          <li key='link.name'>
            <Link
              className={`py-3 px-5 hover:bg-accent-100 hover:text-primary-200 transition-colors flex items-center gap-4 font-semibold text-accent-200 ${
                pathname === link.href ? 'bg-accent-100 text-primary-200' : ''
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
        <li className='mt-auto'>
          <SignOutBtn />
        </li>
      </ul>
    </nav>
  );
}

export default ExplorerNavigation;
