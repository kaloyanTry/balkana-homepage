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
          Balkanas&apos; Projects
        </h1>
        <p className='mb-8 text-primary-300 text-3xl font-normal max-sm:text-2xl'>
          Balkanas&apos; projects are public and open. During the realization of
          the projects are involved people with personal commitment, voluntary
          work, and efforts for an active life in accordance with natural laws
          and respect for the environment, the habitat of local life forms. Here
          you can find information about different projects and activities you
          could join.
        </p>
      </section>
      <Suspense fallback={<Spinner />}>
        <ProjectsList />
      </Suspense>
    </main>
  );
}

export default ProjectsPage;
