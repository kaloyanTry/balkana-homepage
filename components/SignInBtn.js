import Image from 'next/image';

function SignInBtn() {
  const srcGoogle = 'https://authjs.dev/img/providers/google.svg';
  const srcGitHub = 'https://authjs.dev/img/providers/github.svg';
  return (
    <>
      <button className='flex items-center gap-4 text-xl border  border-primary-300 px-10 py-4 rounded-md font-semibold bg-accent-100 text-primary-300'>
        <Image
          src={srcGoogle}
          alt='Google logo'
          height={24}
          width={24}
          priority
        />
        <span>Continue with Google</span>
      </button>
      <button className='flex items-center gap-4 text-xl border border-primary-300 px-10 py-4 rounded-md font-semibold bg-accent-200 text-primary-300'>
        <Image
          src={srcGitHub}
          alt='GitHub logo'
          height={24}
          width={24}
          priority
        />
        <span>Continue with GitHub</span>
      </button>
    </>
  );
}

export default SignInBtn;
