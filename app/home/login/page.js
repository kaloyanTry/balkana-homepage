import SignInBtn from '@/components/SignInBtn';

export const metadata = {
  title: 'Login to BalkanaTry App',
};

async function LoginPage() {
  // const res = await fetch('http://localhost:3000/api/auth/providers');
  const res = await fetch('https://balkana-try.vercel.app/api/auth/providers');
  const data = await res.json();
  const providers = Object.keys(data);

  return (
    <div className='flex flex-col gap-8 mt-8 items-center'>
      <h2 className='text-4xl font-semibold text-primary-300 mb-4'>
        Sign in to access your explorations&apos; area
      </h2>
      {providers.map((provider) => (
        <SignInBtn provider={provider} key={provider} />
      ))}
    </div>
  );
}

export default LoginPage;
