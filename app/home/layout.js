import Header from '@/components/Header';
// import NavigationResponsive from '@/components/NavigationResponsive';
import Footer from '@/components/Footer';
import { ExplorationProvider } from '@/components/ExplorationContext';

export default function HomeLayout({ children }) {
  return (
    <div className='antialiased min-h-screen flex flex-col relative'>
      <Header />

      <div className='flex-1 px-8 py-12 grid'>
        <main className='max-w-8xl mx-auto w-full'>
          <ExplorationProvider>{children}</ExplorationProvider>
        </main>
      </div>

      <Footer />
    </div>
  );
}
