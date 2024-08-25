import HomeImagesShow from '@/components/HomeImagesShow';
import { getTracksImages } from '@/lib/data';
import Link from 'next/link';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

export const metadata = {
  title: 'Balkana Home',
};

export default async function Home() {
  const images = await getTracksImages();

  return (
    <>
      <header>
        <Suspense fallback={<Spinner />}>
          <HomeImagesShow images={images} />
        </Suspense>
      </header>
      <main className='flex flex-col m-auto py-8 px-4'>
        <article className='py-8'>
          <h1 className='text-9xl text-center text-primary-200 font-semibold max-sm:text-2xl'>
            BalkanaTry WebApp
          </h1>
        </article>

        <article className='flex flex-col m-auto py-8 px-4'>
          <h2 className='text-center text-8xl m-8 font-bold text-primary-200 max-sm:text-lg'>
            Goal
          </h2>
          <blockquote className='block text-2xl text-right text-accent-300 px-4 font-thin max-sm:text-lg'>
            &apos;Discipline is the bridge between goals and
            accomplishment.&apos;
            <cite className='font-semibold'> (Eliud Kipchoge)</cite>
          </blockquote>
          <p className='text-justify text-2xl m-4 pb-8 border-b-2 font-normal text-primary-300 max-sm:text-lg'>
            Our goal is to preserve and maintain traditional paths, trails, and
            routes in the mountain. Specifically, in Balkana, in the Centre
            Stara Planina area.{' '}
            <span className='font-semibold'>
              The goal of this web application is to share information about the
              local routes.
            </span>{' '}
            You could explore some or all of them and share your try. On
            BalkanaTry web application you will find a short description of the
            routes, including GPS coordinates of the starting point,
            destinations, distance, elevation gain, and images. If you plan to
            explore a particular route, through the application, you could share
            information about when would you go to run, cycle, or hike on the
            route and with how many friends. On the web application, the
            information is shared, and if someone other is interested in the
            route she or he could join or just to know that the route has been
            explored by others shortly in the past. There is an explorer area,
            where you can find information for your explorations of Balkana. No
            names or any other personal information is shared on the web app.{' '}
            <span className='font-semibold'>Touch Balkana!</span>
          </p>
        </article>
        <article className='flex flex-col m-auto py-8 px-4'>
          <h2 className='text-center text-8xl m-8 font-bold text-primary-200 max-sm:text-lg'>
            Activities
          </h2>
          <blockquote className='block text-2xl text-right text-accent-300 px-4 pt-2 max-sm:text-lg font-thin'>
            &apos;We are what we repeatedly do. Excellence, then, is not an act,
            but a habit.&apos;
            <cite className='font-semibold'> (Aristotel)</cite>
          </blockquote>
          <p className='text-justify text-2xl m-4 pb-8 border-b-2 font-normal text-primary-300 max-sm:text-lg'>
            We organize and support outdoor activities in the local area.
            Activities such as mountain running and mountain cycling events,
            preserving and renovating traditional paths, volunteering. For
            example, you can see Tryavna Tour and Mahnatite skali RUN events on
            our{' '}
            <Link
              href='/home/projects'
              className='text-accent-300 uppercase font-semibold'
            >
              projects
            </Link>{' '}
            area. There you could find information about our other activities
            like clearing forest paths and renovating route marks.
          </p>
        </article>
        <article className='flex flex-col m-auto py-8 px-4'>
          <h2 className='text-center text-8xl m-8 font-bold text-primary-200 max-sm:text-lg'>
            Values
          </h2>
          <blockquote className='block text-2xl text-right text-accent-300 px-4 pt-2 font-thin max-sm:text-lg'>
            &apos;The key to genuine happiness is in our hands. To think this
            way is to discover the essential values of kindness, brotherly love
            and altruism. The more clearly we see the benefits of these values,
            the more we will seek to reject anything that opposes them; in this
            way we will be able to bring about inner transformation... <br />
            Follow the three R&apos;s: - Respect for self. - Respect for others.
            - Responsibility for all your actions.&apos;
            <cite className='font-semibold'> (Dalai Lama)</cite>
          </blockquote>
          <p className='text-justify text-2xl m-4 pb-8 border-b-2 font-normal text-primary-300 max-sm:text-lg'>
            We are trying to live very close to nature, relearning to co-exist
            and inhabit the wild without polluting and without causing harm.{' '}
            <span className='font-semibold'>
              Living actively with respect for nature and others, and sharing
              the experiences are our main values.
            </span>{' '}
            All the activities we have realized are led by the idea of ​​a clean
            and healthy environment and zero ecological footprint.
          </p>
        </article>

        <aside className='flex flex-col-2 m-auto py-8 px-4 gap-16 max-sm:gap-2 max-sm:py-2'>
          <Link
            href='/home/routes'
            className='bg-accent-300 hover:bg-accent-200 text-accent-100 text-2xl p-8 rounded'
          >
            Explore the routes
          </Link>
          <Link
            href='/home/projects'
            className='bg-accent-300 hover:bg-accent-200 text-primary-100 text-2xl p-8 rounded'
          >
            Explore the projects
          </Link>
        </aside>
      </main>
    </>
  );
}
