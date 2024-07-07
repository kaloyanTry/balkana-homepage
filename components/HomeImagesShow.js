'use client';
import { useState, useEffect } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const HomeImagesShow = ({ images }) => {
  const CDNURL =
    'https://sixxmrmgffvhhcbjbnwu.supabase.co/storage/v1/object/public/track-images/';

  const trackImages = images.map((img) => {
    let displayedImages = {
      url: `${CDNURL}${img.name}`,
      alt: img.name,
    };

    return displayedImages;
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoPlay = setInterval(() => {
      nextImage();
    }, 7000);
    return () => clearInterval(autoPlay);
  });

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const Arrow = ({ direction, onClick }) => (
    <div
      className='hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] text-2xl rounded-full p-2  text-gray-300 cursor-pointer'
      style={{ [direction]: '20px' }}
    >
      {direction === 'left' ? (
        <ArrowLeftIcon onClick={onClick} size={25} />
      ) : (
        <ArrowRightIcon onClick={onClick} size={25} />
      )}
    </div>
  );

  return (
    <div className='m-auto py-8 px-8 relative group'>
      <div
        style={{ backgroundImage: `url(${trackImages[currentIndex].url})` }}
        className='w-auto h-96 bg-center bg-cover duration-300'
      ></div>

      <Arrow direction='left' onClick={prevImage} />
      <Arrow direction='right' onClick={nextImage} />
    </div>
  );
};

export default HomeImagesShow;
