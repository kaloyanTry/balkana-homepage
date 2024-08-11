import { signInAction } from '@/lib/actions';
import Image from 'next/image';

function SignInBtn({ provider }) {
  return (
    <form action={signInAction} className='flex flex-col gap-8'>
      <button className='flex items-center gap-4 text-xl border  border-primary-200 px-8 py-4 rounded-sm font-semibold bg-primary-100 text-primary-300'>
        <Image
          src={`https://authjs.dev/img/providers/${provider}.svg`}
          alt={`${provider} logo`}
          height={24}
          width={24}
          priority
        />
        <span>
          Continue with <b className='uppercase text-accent-300'>{provider}</b>
        </span>

        <input name={'provider'} value={provider} readOnly hidden />
      </button>
    </form>
  );
}

export default SignInBtn;
