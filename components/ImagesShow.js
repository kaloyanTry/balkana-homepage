'use client';

import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

function ImagesShow({ images }) {
  const zoomInProperties = {
    scale: 1,
    duration: 5000,
    transitionDuration: 300,
    infinite: true,
    prevArrow: (
      <div className='ml-10 top-40 md:top-72'>
        <ArrowLeftIcon className='h-8 w-8 text-white cursor-pointer' />
      </div>
    ),
    nextArrow: (
      <div className='mr-10 top-40 md:top-72'>
        <ArrowRightIcon className='h-8 w-8 text-white cursor-pointer' />
      </div>
    ),
  };

  return (
    <div className='w-full h-screen'>
      <Zoom {...zoomInProperties}>
        {images.map((image, index) => (
          <div
            key={index}
            className='flex justify-center md:items-center items-start w-screen h-screen relative'
          >
            <Image
              className='w-screen'
              src={image.url}
              alt={image.alt}
              fill
              // width={600}
              // height={400}
            />
            <div className='relative z-10 text-center'>
              <h1 className='text-8xl mb-6 tracking-tight font-normal text-white'>
                Touch the Balkan
              </h1>
              {/* <p className='text-4xl mb-10 tracking-tight font-normal text-white'>
                Explore the Balkan
              </p> */}

              <Link
                href='/home'
                className='bg-primary-200 px-4 py-2 text-accent-100 text-2xl hover:bg-primary-300 transition-all'
              >
                Explore
              </Link>
            </div>
          </div>
        ))}
      </Zoom>
    </div>
  );
}

export default ImagesShow;
