import Link from 'next/link';

function Navigation() {
  return (
    <nav className='z-10 text-2xl text-accent-300 font-semibold'>
      <ul className='flex gap-12'>
        <li>
          <Link
            href='/home'
            className='hover:text-accent-200 transition-colors'
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href='/home/projects'
            className='hover:text-accent-200 transition-colors '
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href='/home/tracks'
            className='hover:text-accent-200 transition-colors '
          >
            Trails
          </Link>
        </li>
        <li>
          <Link
            href='/home/explorer'
            className='hover:text-accent-200 transition-colors '
          >
            Explorer
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
