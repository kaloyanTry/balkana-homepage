'use client';
import { useState, useEffect } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

// Another approuch of coding and displaying an image slideshow without using react-slideshow-image:

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
    }, 4000);
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
      className='h-6 w-6 text-primary-100 bg-primary-100 bg-opacity-10 rounded-sm  group-hover:block absolute top-[50%] translate-y-[-50%] cursor-pointer'
      style={{ [direction]: '20px' }}
    >
      {direction === 'left' ? (
        <ArrowLeftIcon onClick={onClick} />
      ) : (
        <ArrowRightIcon onClick={onClick} />
      )}
    </div>
  );

  return (
    <main className='flex flex-col mx-auto'>
      <article
        style={{ backgroundImage: `url(${trackImages[currentIndex].url})` }}
        className='relative min-w-[100vw] min-h-[60vh] rounded-sm mx-auto bg-center bg-cover placeholder-primary-100 transition-all transition-duration: 1600'
        key={trackImages[currentIndex]}
      >
        <Arrow direction='left' onClick={prevImage} />
        <Arrow direction='right' onClick={nextImage} />

        <article className='absolute bottom-12 right-0 left-0'>
          <div className='flex items-center justify-center gap-2'>
            {trackImages.map((_, i) => (
              <div
                key={i}
                className={`transition-all ease-out duration-8000 w-2 h-2 bg-primary-100 rounded-sm ${
                  currentIndex === i ? 'p-1' : 'bg-opacity-50'
                }`}
              ></div>
            ))}
          </div>
        </article>
      </article>
    </main>
  );
};

export default HomeImagesShow;
