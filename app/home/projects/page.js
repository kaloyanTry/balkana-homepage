import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import ProjectsList from '@/components/ProjectsList';

// export const dynamic = 'force-dynamic';

export const revalidate = 3600;

export const metadata = {
  title: 'Projects',
  description: 'Balkana Projects general information',
};

function ProjectsPage() {
  return (
    <main className='mx-4'>
      <section className='flex flex-col m-auto pb-12 border-b-4 border-accent-200'>
        <h1 className='text-8xl my-16 text-primary-100 bg-primary-200 font-bold text-center m-auto p-8'>
          Balkana&apos;s Projects
        </h1>
        <p className='mb-8 text-primary-300 text-3xl font-normal max-sm:text-2xl'>
          Balkana&apos;s projects are public and open. During the realization of
          these projects, we involve people with personal commitment who
          contribute through voluntary work and efforts toward an active life in
          accordance with natural laws and respect for the environment—the
          habitat of local life forms. Here you can find information about
          different projects and activities you can join.
        </p>
      </section>
      <Suspense fallback={<Spinner />}>
        <ProjectsList />
      </Suspense>
    </main>
  );
}

export default ProjectsPage;
