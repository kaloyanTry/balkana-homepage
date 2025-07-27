'use client';

import HomeImagesShow from '@/components/HomeImagesShow';
import { getTracksImages } from '@/lib/data';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const { t, locale } = useTranslation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const fetchedImages = await getTracksImages();
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  // Set the font class on body element
  useEffect(() => {
    document.body.setAttribute('data-lang', locale);
    // Optional: set specific font class on body
    document.body.className = document.body.className.replace(
      /font-(en|bg)/g,
      ''
    );
    document.body.classList.add(`font-${locale}`);
  }, [locale]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className='flex flex-col mx-auto my-4'>
      <Suspense fallback={<Spinner />}>
        <HomeImagesShow images={images} />
      </Suspense>

      <section className='flex flex-col mt-12 px-4 items-center justify-center'>
        <h1 className='text-9xl text-center text-primary-200 font-semibold max-sm:text-3xl'>
          {t('title')}
        </h1>

        <article className='flex flex-col mx-auto mt-4 items-center justify-center'>
          <h2 className='text-center text-8xl pt-4 font-bold text-primary-200 max-sm:text-lg'>
            {t('goal')}
          </h2>
          <blockquote className='block text-3xl text-center text-accent-300 px-2 pt-2 max-sm:text-lg font-thin'>
            {t('quote1')}
            <cite className='font-semibold'> {t('quote1_author')}</cite>
          </blockquote>
          <p className='text-justify text-3xl px-2 pt-4 pb-12 border-b-2 font-normal text-primary-300 max-sm:text-lg'>
            {t('paragraph1_start')}{' '}
            <span className='font-semibold'>{t('paragraph1_bold')}</span>{' '}
            {t('paragraph1_middle')}{' '}
            <span className='font-semibold'>{t('paragraph1_end')}</span>
          </p>
        </article>

        <article className='flex flex-col mx-auto mt-8 items-center justify-center'>
          <h2 className='text-center text-8xl pt-4 font-bold text-primary-200 max-sm:text-lg'>
            {t('activities')}
          </h2>
          <blockquote className='block text-3xl text-center text-accent-300 px-2 pt-2 max-sm:text-lg font-thin'>
            {t('quote2')}
            <cite className='font-semibold'> {t('quote2_author')}</cite>
          </blockquote>
          <p className='text-justify text-3xl px-2 pt-4 pb-12 border-b-2 font-normal text-primary-300 max-sm:text-lg'>
            {t('paragraph2_start')}{' '}
            <Link
              href='/home/projects'
              className='text-accent-300 uppercase font-semibold'
            >
              {t('projects_link')}
            </Link>{' '}
            {t('paragraph2_end')}
          </p>
        </article>

        <article className='flex flex-col mx-auto mt-8 items-center justify-center'>
          <h2 className='text-center text-8xl pt-4 font-bold text-primary-200 max-sm:text-lg'>
            {t('values')}
          </h2>
          <blockquote className='block text-3xl text-center text-accent-300 px-2 pt-2 max-sm:text-lg font-thin'>
            {t('quote3')} <br />
            {t('quote3_continue')}
            <cite className='font-semibold'> {t('quote3_author')}</cite>
          </blockquote>
          <p className='text-justify text-3xl px-2 pt-4 pb-12 border-b-2 font-normal text-primary-300 max-sm:text-lg'>
            {t('paragraph3_start')}{' '}
            <span className='font-semibold'>{t('paragraph3_bold')}</span>{' '}
            {t('paragraph3_end')}
          </p>
        </article>
      </section>

      <aside className='flex flex-col-2 mx-auto py-8 gap-16 max-sm:gap-2 max-sm:py-2'>
        <Link
          href='/home/routes'
          className='bg-accent-300 hover:bg-accent-200 text-accent-100 text-3xl p-12 rounded'
        >
          {t('explore_routes')}
        </Link>
        <Link
          href='/home/projects'
          className='bg-accent-300 hover:bg-accent-200 text-primary-100 text-3xl p-12 rounded'
        >
          {t('explore_projects')}
        </Link>
      </aside>
    </main>
  );
}
