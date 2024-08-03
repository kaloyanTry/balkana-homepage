import HomeImagesShow from '@/components/HomeImagesShow';
import { getTracksImages } from '@/lib/actions';
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
          <blockquote className='block text-2xl text-right text-accent-300 px-4 font-light max-sm:text-lg'>
            &apos;Discipline is the bridge between goals and
            accomplishment.&apos;
            <cite> (Eliud Kipchoge)</cite>
          </blockquote>
          <p className='text-justify text-2xl m-4 pb-8 border-b-2 font-normal text-primary-300 max-sm:text-lg'>
            Our goal is to preserve and maintain traditional trails, paths, and
            routes in the mountain. Specifically, in Balkan, in the Centre Stara
            Planina area.{' '}
            <span className='font-semibold'>
              The goal of this web application is to share information about the
              local routes.
            </span>{' '}
            You could explore some or all of them. On the webapp is given a
            short description, including GPS coordinates of the starting point
            of routes, distance, elevation gain, and images. If you plan to
            explore a particular route, through the application, you could share
            information about when would you go to run, cycle, or hike through
            the route and with how many friends. On the web app, the information
            about it is shared, and if someone other is interested in the route
            she or he could join or just to know that the route has been
            explored by others shortly in the past. There is an explorer area,
            where you can find information for your explorations of Balkana. No
            names or any other personal information is shared on the web app.{' '}
            <span className='font-semibold'>Touch the Balkan!</span>
          </p>
        </article>
        <article className='flex flex-col m-auto py-8 px-4'>
          <h2 className='text-center text-8xl m-8 font-bold text-primary-200 max-sm:text-lg'>
            Activities
          </h2>
          <blockquote className='block text-2xl text-right text-accent-300 px-4 font-light pt-2 max-sm:text-lg'>
            &apos;We are what we repeatedly do. Excellence, then, is not an act,
            but a habit.&apos;
            <cite> (Aristotel)</cite>
          </blockquote>
          <p className='text-justify text-2xl m-4 pb-8 border-b-2 font-normal text-primary-200 max-sm:text-lg'>
            We organize and support outdoor activities in the local area.
            Activities such as mountain running and mountain cycling events,
            preserving and renovating traditional paths, volunteering. For
            example, you can see TryavnaTour and Mahnatite skali RUN events on
            our{' '}
            <Link href='/home/projects' className='text-accent-300 uppercase'>
              projects
            </Link>{' '}
            section. There you could find information about our other activities
            like clearing forest paths and renovating route marks.
          </p>
        </article>
        <article className='flex flex-col m-auto py-8 px-4'>
          <h2 className='text-center text-8xl m-8 font-bold text-primary-200 max-sm:text-lg'>
            Values
          </h2>
          <blockquote className='block text-2xl text-right text-accent-300 px-4 pt-2 font-light max-sm:text-lg'>
            &apos;Look deep into nature, and then you will understand everything
            better.&apos;
            <cite> (Albert Einstein)</cite>
          </blockquote>
          <p className='text-justify text-2xl m-4 pb-8 border-b-2 font-normal text-primary-200 max-sm:text-lg'>
            We are trying to live very close to nature, relearning to co-exist
            and inhabit the wild without polluting and without causing harm.
            Living actively with respect for nature, exploration and the
            preservation of all life forms are our main values. All the
            activities we have realized are led by the idea of ​​a clean and
            healthy environment and zero ecological footprint.
          </p>
        </article>

        <aside className='flex flex-col-2 m-auto py-8 px-4 gap-16 max-sm:gap-2 max-sm:py-2'>
          <Link
            href='/home/tracks'
            className='bg-accent-300 hover:bg-accent-200 text-primary-100 text-2xl p-8 rounded'
          >
            Explore the routes
          </Link>
          <Link
            href='/home/projects'
            className='bg-accent-300 hover:bg-accent-200 text-primary-300 text-2xl p-8 rounded'
          >
            Explore the projects
          </Link>
        </aside>
      </main>
    </>
  );
}
