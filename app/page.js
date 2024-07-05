import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import SlideShow from '@/components/SlideShow';

export const dynamic = 'force-dynamic';

function HomePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <SlideShow />
    </Suspense>
  );
}

export default HomePage;
