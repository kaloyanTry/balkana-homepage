import { signInAction } from '@/lib/actions';
import Image from 'next/image';

// function SignInBtn({ provider }) {
function SignInBtn() {
  return (
    <form action={signInAction}>
      <button className='flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium'>
        <Image
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
          height='24'
          width='24'
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}
// {/* <Image
//   src={`https://authjs.dev/img/providers/${provider}.svg`}
//   alt={`${provider} logo`}
//   height={24}
//   width={24}
//   priority
// /> */}
// {/* <span>
//   Continue with <b className='uppercase text-accent-300'>{provider}</b>
// </span>

// <input name={'provider'} value={provider} readOnly hidden /> */}

export default SignInBtn;
