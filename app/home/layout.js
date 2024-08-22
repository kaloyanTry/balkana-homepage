import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ExplorationProvider } from '@/components/ExplorationContext';

export default function HomeLayout({ children }) {
  return (
    <div className='antialiased flex flex-col relative min-h-screen'>
      <Header />
      <div className='flex-1 px-8 py-12 grid'>
        <main className='max-w-max mx-auto w-full'>
          <ExplorationProvider>{children}</ExplorationProvider>
        </main>
      </div>
      <Footer />
    </div>
  );
}
