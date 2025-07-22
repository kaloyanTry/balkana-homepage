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
    <main className='flex flex-col mx-auto my-4 py-8 max-sm:px-0 max-sm:py-2 relative group'>
      <article className='flex flex-col mx-auto'>
        <Suspense fallback={<Spinner />}>
          <HomeImagesShow images={images} />
        </Suspense>
      </article>

      <article className='flex flex-col items-center py-8'>
        <h1 className='text-9xl text-center text-primary-200 font-semibold max-sm:text-3xl mx-auto'>
          BalkanaTry WebApp
        </h1>
      </article>

      <article className='flex flex-col mx-auto py-8'>
        <h2 className='text-center text-8xl p-8 font-bold text-primary-200 max-sm:text-lg'>
          Goal
        </h2>
        <blockquote className='block text-3xl text-right text-accent-300 px-4 pt-2 max-sm:text-lg font-thin'>
          &apos;Discipline is the bridge between goals and accomplishment.&apos;
          <cite className='font-semibold'> (Eliud Kipchoge)</cite>
        </blockquote>
        <p className='text-justify text-3xl p-4 pb-12 border-b-2 font-normal text-primary-300 max-sm:text-lg'>
          Our goal is to preserve and maintain traditional paths, trails, and
          routes in the mountains, specifically in the Balkana region of the
          Central Stara Planina area.{' '}
          <span className='font-semibold'>
            The goal of this web application is to share information about local
            routes.
          </span>{' '}
          You can explore some or all of them and share your experience. On the
          BalkanaTry web application, you will find short descriptions of the
          routes, including GPS coordinates of starting points, destinations,
          distance, elevation gain, and images. If you plan to explore a
          particular route, you can use the application to share information
          about when you intend to run, cycle, or hike the route and how many
          friends will join you. This information is shared on the web
          application, so if someone else is interested in the route, they can
          join you or simply know that the route has been explored by others
          recently. There is an explorer area where you can find information for
          your Balkana explorations. No names or other personal information are
          shared on the web app.{' '}
          <span className='font-semibold'>Touch Balkana!</span>
        </p>
      </article>
      <article className='flex flex-col mx-auto py-8'>
        <h2 className='text-center text-8xl p-8 font-bold text-primary-200 max-sm:text-lg'>
          Activities
        </h2>
        <blockquote className='block text-3xl text-right text-accent-300 px-4 pt-2 max-sm:text-lg font-thin'>
          &apos;We are what we repeatedly do. Excellence, then, is not an act,
          but a habit.&apos;
          <cite className='font-semibold'> (Aristotel)</cite>
        </blockquote>
        <p className='text-justify text-3xl p-4 pb-8 border-b-2 font-normal text-primary-300 max-sm:text-lg'>
          We organize and support outdoor activities in the local area,
          including mountain running and mountain cycling events, preserving and
          renovating traditional paths, and volunteering opportunities. For
          example, you can see the Tryavna Tour and Mahnatite Skali RUN events
          among our{' '}
          <Link
            href='/home/projects'
            className='text-accent-300 uppercase font-semibold'
          >
            projects
          </Link>{' '}
          area. There you can find information about our other activities, such
          as clearing forest paths and renovating route markers.
        </p>
      </article>
      <article className='flex flex-col m-auto py-8'>
        <h2 className='text-center text-8xl p-8 font-bold text-primary-200 max-sm:text-lg'>
          Values
        </h2>
        <blockquote className='block text-3xl text-right text-accent-300 px-4 pt-2 font-thin max-sm:text-lg'>
          &apos;The key to genuine happiness is in our hands. To think this way
          is to discover the essential values of kindness, brotherly love and
          altruism. The more clearly we see the benefits of these values, the
          more we will seek to reject anything that opposes them; in this way we
          will be able to bring about inner transformation... <br />
          Follow the three R&apos;s: - Respect for self. - Respect for others. -
          Responsibility for all your actions.&apos;
          <cite className='font-semibold'> (Dalai Lama)</cite>
        </blockquote>
        <p className='text-justify text-3xl p-4 pb-8 border-b-2 font-normal text-primary-300 max-sm:text-lg'>
          We are trying to live very close to nature, relearning to co-exist and
          inhabit the wild without polluting and without causing harm.{' '}
          <span className='font-semibold'>
            Living actively with respect for nature and others, and sharing the
            experiences are our main values.
          </span>{' '}
          All the activities we undertake are guided by the principles of
          maintaining a clean and healthy environment and achieving zero
          ecological footprint.
        </p>
      </article>

      <aside className='flex flex-col-2 mx-auto py-8 px-4 gap-16 max-sm:gap-2 max-sm:py-2'>
        <Link
          href='/home/routes'
          className='bg-accent-300 hover:bg-accent-200 text-accent-100 text-3xl p-12 rounded'
        >
          Explore the routes
        </Link>
        <Link
          href='/home/projects'
          className='bg-accent-300 hover:bg-accent-200 text-primary-100 text-3xl p-12 rounded'
        >
          Explore the projects
        </Link>
      </aside>
    </main>
  );
}
