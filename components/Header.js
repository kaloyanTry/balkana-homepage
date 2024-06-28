import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';

function Header() {
  return (
    <header className='border-b border-primary-200 px-8 py-5'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
