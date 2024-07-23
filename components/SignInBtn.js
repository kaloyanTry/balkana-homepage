import { signInAction } from '@/lib/actions';
import Image from 'next/image';

function SignInBtn({ provider }) {
  return (
    <form action={signInAction} className='flex flex-col gap-8'>
      <button className='flex items-center gap-4 text-xl border  border-primary-300 px-10 py-4 rounded-md font-semibold bg-accent-100 text-primary-300'>
        <Image
          src={`https://authjs.dev/img/providers/${provider}.svg`}
          alt={`${provider} logo`}
          height={24}
          width={24}
          priority
        />
        <span>Continue with {provider}</span>

        <input name={'provider'} value={provider} readOnly hidden />
      </button>
    </form>
  );
}

export default SignInBtn;
