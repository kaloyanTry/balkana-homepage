import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Explorer Area',
};

async function ExplorerPage() {
  const session = await auth();
  const firstName = session.user.name.split(' ').at(0);
  return (
    <div>
      <h2 className='font-semibold text-4xl text-accent-200 m-4'>
        Explorer Page
      </h2>
      <p className='font-normal text-xl text-primary-300 m-4'>
        Wellcome, {firstName}
      </p>
    </div>
  );
}

export default ExplorerPage;
