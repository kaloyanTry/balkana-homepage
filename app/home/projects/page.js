import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import ProjectsList from '@/components/ProjectsList';

export const metadata = {
  title: 'Projects',
  description: 'Balkana Projects general information',
};

function ProjectsPage() {
  return (
    <main>
      <section className='flex flex-col m-auto pb-12 border-b-4 border-accent-200'>
        <h1 className='text-8xl my-16 text-primary-200 font-bold text-center'>
          Balkanas&apos; Projects
        </h1>
        <p className='mb-8 text-accent-300 text-2xl font-normal'>
          Balkanas&apos; projects are public and open. They involve personal
          commitment, voluntary work and efforts for an active life in
          accordance with natural laws and respect for the environment, the
          habitat of local life forms. Balkanas&apos; projects are public and
          open. They involve personal commitment, voluntary work and efforts for
          an active life in accordance with natural laws and respect for the
          environment, the habitat of local life forms.
        </p>
      </section>
      <Suspense fallback={<Spinner />}>
        <ProjectsList />
      </Suspense>
    </main>
  );
}

export default ProjectsPage;
