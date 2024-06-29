import { ArrowRightEndOnRectangleIcon, Git } from '@heroicons/react/24/solid';

function SignOutBtn() {
  return (
    <form>
      <button className='py-3 px-5 hover:bg-accent-100 hover:text-primary-200 transition-colors flex items-center gap-4 font-bold text-primary-300 w-full'>
        <ArrowRightEndOnRectangleIcon className='h-5 w-5 text-primary-300' />
        <span>Sign Out</span>
      </button>
    </form>
  );
}

export default SignOutBtn;
