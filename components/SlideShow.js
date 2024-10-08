import { getImages } from '@/lib/data';
import ImagesShow from './ImagesShow';

async function SlideShow() {
  const dataImages = await getImages();

  //
  const CDNURL =
    'https://sixxmrmgffvhhcbjbnwu.supabase.co/storage/v1/object/public/main-images/';

  const images = dataImages.map((img) => {
    let displayedImages = {
      url: `${CDNURL}${img.name}`,
      alt: img.name,
    };

    return displayedImages;
  });

  return <ImagesShow images={images} />;
}

export default SlideShow;
