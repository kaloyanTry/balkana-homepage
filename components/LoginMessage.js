import Link from 'next/link';

function LoginMessage() {
  return (
    <div className='grid bg-accent-300'>
      <p className='text-center self-center py-8 text-accent-100 text-xl'>
        Please,{' '}
        <Link
          href='/home/login'
          className='uppercase p-2 border rounded-md border-accent-100'
        >
          login
        </Link>{' '}
        to book and explore the trail
      </p>
    </div>
  );
}

export default LoginMessage;
