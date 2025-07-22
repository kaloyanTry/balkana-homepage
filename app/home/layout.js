import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ExplorationProvider } from '@/components/ExplorationContext';
import ScrollToTopBtn from '@/components/ScrollToTopBtn';

export default function HomeLayout({ children }) {
  return (
    <div className='antialiased flex flex-col relative min-h-screen scroll-smooth md:scroll-auto'>
      <Header />
      <div className='flex-1 px-2 py-8 grid max-sm:px-1 max-sm:py-2'>
        <main className='max-w-max mx-auto w-full'>
          <ExplorationProvider>{children}</ExplorationProvider>
          <ScrollToTopBtn />
        </main>
      </div>
      <Footer />
    </div>
  );
}
