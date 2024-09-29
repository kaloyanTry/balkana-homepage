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
    name: 'Explorations',
    href: '/home/explorer/explorations',
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
      <ul className='flex flex-col gap-2 h-full text-xl'>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-2 px-4 hover:bg-accent-100 hover:text-primary-300 transition-colors flex items-center gap-4 font-semibold text-accent-300 ${
                pathname === link.href ? 'bg-accent-100 text-primary-300' : ''
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
