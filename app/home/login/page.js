import SignInBtn from '@/components/SignInBtn';

function LoginPage() {
  return (
    <div className='flex flex-col gap-10 mt-8 items-center'>
      <h2 className='text-4xl font-semibold text-primary-300 mb-8'>
        Sign in to access your explorer area
      </h2>
      <SignInBtn />
    </div>
  );
}

export default LoginPage;
