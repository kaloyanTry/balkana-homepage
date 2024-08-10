import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';
// import NavigationResponsive from '@/components/NavigationResponsive';

function Header() {
  return (
    <header className='border-b border-primary-200 px-8 py-4'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <Logo />
        <Navigation />
        {/* <NavigationResponsive /> */}
      </div>
    </header>
  );
}

export default Header;
