import { auth } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';

async function Navigation() {
  // get the explorer's image from Google or GitHub. Because of auth() => cookies... Navigation is dynamic rendered!!!, and so the entire website
  //Later leave this approach and make it dynamic only exploration form:
  const session = await auth();
  console.log(session);

  return (
    <nav className='z-10 text-2xl text-accent-300 font-semibold uppercase'>
      <ul className='flex gap-8 max-lg:gap-4 max-md:gap-2 max-sm:text-lg'>
        <li>
          <Link
            href='/home'
            className='hover:text-primary-200 transition-all hover:text-xl'
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href='/home/projects'
            className='hover:text-primary-200 transition-all hover:text-xl'
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href='/home/routes'
            className='hover:text-primary-200 transition-all hover:text-xl'
          >
            Routes
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href='/home/explorer'
              className='hover:text-primary-200 transition-all hover:text-xl flex items-center gap-4'
            >
              <Image
                className='rounded-lg'
                src={session.user.image}
                alt={session.user.name}
                width={32}
                height={32}
                referrerPolicy='no-referrer'
              />
              Explorer
            </Link>
          ) : (
            <Link
              href='/home/explorer'
              className='hover:text-primary-200 transition-all hover:text-xl'
            >
              Explorer
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
