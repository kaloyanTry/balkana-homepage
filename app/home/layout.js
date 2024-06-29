import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomeLayout({ children }) {
  return (
    <div className='antialiased min-h-screen flex flex-col relative'>
      <Header />

      <div className='flex-1 px-8 py-12 grid'>
        <main className='max-w-7xl mx-auto w-full'>{children}</main>
      </div>

      <Footer />
    </div>
  );
}
