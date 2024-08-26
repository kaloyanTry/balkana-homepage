import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ExplorationProvider } from '@/components/ExplorationContext';
import ScrollToTopBtn from '@/components/ScrollToTopBtn';

export default function HomeLayout({ children }) {
  return (
    <div className='antialiased flex flex-col relative min-h-screen scroll-smooth md:scroll-auto'>
      <Header />
      <div className='flex-1 px-4 py-12 grid max-sm:px-2 max-sm:py-4'>
        <main className='max-w-max mx-auto w-full'>
          <ExplorationProvider>{children}</ExplorationProvider>
          <ScrollToTopBtn />
        </main>
      </div>
      <Footer />
    </div>
  );
}
