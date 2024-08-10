import { getTracksImages } from '@/lib/data';
import HomeImagesShow from './HomeImagesShow';
import { Suspense } from 'react';
import Spinner from './Spinner';

async function HomeSlideShow() {
  const tracksImages = await getTracksImages();

  const CDNURL =
    'https://sixxmrmgffvhhcbjbnwu.supabase.co/storage/v1/object/public/main-images/';

  const images = tracksImages.map((img) => {
    let displayedImages = {
      url: `${CDNURL}${img.name}`,
      alt: img.name,
    };

    return displayedImages;
  });
  return (
    <Suspense fallback={<Spinner />}>
      <HomeImagesShow images={images} />
    </Suspense>
  );
}

export default HomeSlideShow;
