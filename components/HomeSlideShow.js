import { getTracksImages } from '@/lib/actions';
import HomeImagesShow from './HomeImagesShow';

async function HomeSlideShow() {
  const tracksImages = await getTracksImages();

  //
  const CDNURL =
    'https://sixxmrmgffvhhcbjbnwu.supabase.co/storage/v1/object/public/main-images/';

  const images = tracksImages.map((img) => {
    let displayedImages = {
      url: `${CDNURL}${img.name}`,
      alt: img.name,
    };

    return displayedImages;
  });
  // console.log(images);
  return (
    <div>
      <HomeImagesShow images={images} />
    </div>
  );
}

export default HomeSlideShow;
