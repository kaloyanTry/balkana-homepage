'use client';

import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

// Another approuch of coding and displaying an image slideshow without using react-slideshow-image:

const HomeImagesShow = ({ images }) => {
  const CDNURL =
    'https://sixxmrmgffvhhcbjbnwu.supabase.co/storage/v1/object/public/track-images/';

  const trackImages = images.map((img) => {
    let displayedImages = {
      url: `${CDNURL}${img.name}`,
      alt: img.name,
    };
    console.log(displayedImages.url);
    return displayedImages;
  });

  const zoomInProperties = {
    scale: 1,
    duration: 4000,
    transitionDuration: 400,
    infinite: true,
    prevArrow: (
      <div className='flex justify-center items-center ml-8'>
        <ArrowLeftIcon className='h-8 w-8 text-primary-100 cursor-pointer' />
      </div>
    ),
    nextArrow: (
      <div className='flex justify-center items-center mr-8'>
        <ArrowRightIcon className='h-8 w-8 text-primary-100 cursor-pointer' />
      </div>
    ),
  };

  return (
    <main className='flex flex-col m-auto py-4 relative group'>
      <Zoom {...zoomInProperties}>
        {trackImages.map((image, index) => (
          <article
            key={index}
            className='flex justify-center items-center relative w-screen h-screen'
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className='object-cover object-top'
            />
          </article>
        ))}
      </Zoom>
    </main>
  );
};

export default HomeImagesShow;
