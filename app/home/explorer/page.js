import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Explorer Area',
};

async function ExplorerPage() {
  const session = await auth();

  const firstName = session.user.name.split(' ').at(0);
  return (
    <section className='flex flex-col mx-auto'>
      <h1 className='font-semibold text-4xl text-accent-100 m-4 bg-accent-300 px-8 py-4'>
        Explorer Area
      </h1>
      <p className='font-semibold text-2xl text-accent-300 m-4'>
        Wellcome {firstName},
      </p>
      <p className='font-normal text-xl text-primary-300 mx-4'>
        It is your explorations&apos; area. Here is stored an information about
        your planned and previous explorations of Balkana.{' '}
        <span className='text-accent-300 font-semibold'>
          Explore and enjoy more!
        </span>
      </p>
    </section>
  );
}

export default ExplorerPage;
