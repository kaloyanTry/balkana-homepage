'use client';
import { useState, useEffect } from 'react';

import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/solid';

const HomeImagesShow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const CDNURL =
    'https://sixxmrmgffvhhcbjbnwu.supabase.co/storage/v1/object/public/track-images/';

  const trackImages = images.map((img) => {
    let displayedImages = {
      url: `${CDNURL}${img.name}`,
      alt: img.name,
    };

    return displayedImages;
  });

  useEffect(() => {
    const autoPlay = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(autoPlay);
  });

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? trackImages.length - 1 : prevIndex - 1
    );
  };
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === trackImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  let Arrow = ({ direction, onClick }) => (
    <div
      className='h-8 w-8 text-primary-100  group-hover:block absolute top-[50%] translate-y-[-50%] cursor-pointer'
      style={{ [direction]: '40px' }}
    >
      {direction === 'left' ? (
        <ArrowLeftCircleIcon onClick={onClick} />
      ) : (
        <ArrowRightCircleIcon onClick={onClick} />
      )}
    </div>
  );

  return (
    <div className='m-auto py-4 px-8 relative group'>
      <div
        style={{ backgroundImage: `url(${trackImages[currentIndex].url})` }}
        className='w-auto h-screen max-h-[60vh] min-h-96 bg-center bg-cover placeholder-primary-200 transition-all'
        key={trackImages[currentIndex]}
      >
        <Arrow direction='left' onClick={prevImage} />
        <Arrow direction='right' onClick={nextImage} />

        <div className='absolute bottom-12 right-0 left-0'>
          <div className='flex items-center justify-center gap-2'>
            {trackImages.map((_, i) => (
              <div
                key={i}
                className={`transition-all ease-out duration-900 w-2 h-2 bg-primary-100 rounded-full ${
                  currentIndex === i ? 'p-1' : 'bg-opacity-50'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeImagesShow;
