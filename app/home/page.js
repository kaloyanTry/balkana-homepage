import HomeImagesShow from '@/components/HomeImagesShow';
import { getTracksImages } from '@/lib/actions';
import Link from 'next/link';

export const metadata = {
  title: 'Balkana Home',
};

export default async function Home() {
  const images = await getTracksImages();

  return (
    <>
      <header>
        <HomeImagesShow images={images} />
      </header>
      <main className='flex flex-col m-auto py-8 px-4'>
        <article className='pb-8'>
          <h1 className='text-9xl text-center text-primary-200 font-semibold'>
            BalkanaTry Web App
          </h1>
        </article>

        <section className='flex flex-col m-auto py-8 px-4'>
          <h2 className='text-center text-8xl m-8 font-bold text-primary-200'>
            Goal
          </h2>
          <blockquote className='block text-2xl text-right text-accent-300 px-4 font-light'>
            &apos;Discipline is the bridge between goals and
            accomplishment.&apos;
            <cite> (Eliud Kipchoge)</cite>
          </blockquote>
          <p className='text-justify text-2xl m-4 pb-8 border-b-2 font-normal text-primary-300'>
            Our goal is to preserve and maintain traditional trails, paths,
            tracks, and routes in the mountain. Specifically, in Balkan, in the
            Centre Stara Planina area. The goal of this web application is to
            share information about the local routes. You could explore some or
            all of them. On the website is given a short description, including
            GPS coordinates of the routes, distance, elevation gain, and images.
            If you plan to explore a particular route you could share
            information about when would you go to run, cycle, or hike through
            the route and with how many friends. On the web app, the information
            about it is shared, and if someone other is interested in the route
            she or he could join or just to know that the route has been
            explored by others shortly in the past. No names or any other
            personal information is shared on the web app.
          </p>
        </section>
        <section className='flex flex-col m-auto py-8 px-4'>
          <h2 className='text-center text-8xl m-8 font-bold text-primary-200'>
            Activities
          </h2>
          <blockquote className='block text-2xl text-right text-accent-300 px-4 font-light pt-2'>
            &apos;We are what we repeatedly do. Excellence, then, is not an act,
            but a habit.&apos;
            <cite> (Aristotel)</cite>
          </blockquote>
          <p className='text-justify text-2xl m-4 pb-8 border-b-2 font-normal text-primary-200'>
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
        </section>
        <section className='flex flex-col m-auto py-8 px-4'>
          <h2 className='text-center text-8xl m-8 font-bold text-primary-200'>
            Values
          </h2>
          <blockquote className='block text-2xl text-right text-accent-300 px-4 pt-2 font-light'>
            &apos;Look deep into nature, and then you will understand everything
            better.&apos;
            <cite> (Albert Einstein)</cite>
          </blockquote>
          <p className='text-justify text-2xl m-4 pb-8 border-b-2 font-normal text-primary-200'>
            We are trying to live very close to nature, relearning to co-exist
            and inhabit the wild without polluting and without causing harm.
            Living actively with respect for nature, exploration and the
            preservation of all life forms are our main values. All the
            activities we have realized are led by the idea of ​​a clean and
            healthy environment and zero ecological footprint.
          </p>
        </section>

        <aside className='flex flex-col-2 m-auto py-8 px-4 gap-16'>
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
