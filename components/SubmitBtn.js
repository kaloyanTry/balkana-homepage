'use client';
import { useFormStatus } from 'react-dom';

function SubmitBtn({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      className='bg-accent-200 px-8 py-4 text-primary-300 font-semibold hover:bg-accent-300 transition-all disabled:cursor-not-allowed rounded-sm shadow-md'
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitBtn;
