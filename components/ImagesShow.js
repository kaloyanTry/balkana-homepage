'use client';

import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

function ImagesShow({ images }) {
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
    <main className='w-full h-screen'>
      <Zoom {...zoomInProperties}>
        {images.map((image, index) => (
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
            <div className='relative z-10 text-center'>
              <h1 className='text-8xl mb-6 tracking-tight font-normal text-primary-100'>
                Try Balkana
              </h1>
              <aside className='space-y-4'>
                <div>
                  <Link
                    href='/home'
                    className=' bg-primary-200 px-4 py-2 text-primary-100 text-2xl hover:bg-primary-300 transition-all animate-pulse'
                  >
                    Explore
                  </Link>
                </div>
                <div>
                  <Link
                    href='/home/bg'
                    className=' bg-primary-200 px-4 py-2 text-primary-100 text-2xl hover:bg-primary-300 transition-all animate-pulse'
                  >
                    Изследвайте
                  </Link>
                </div>
              </aside>
            </div>
          </article>
        ))}
      </Zoom>
    </main>
  );
}

export default ImagesShow;
