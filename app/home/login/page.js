import SignInBtn from '@/components/SignInBtn';

export const metadata = {
  title: 'Login to BalkanaTry App',
};

export default function Page() {
  return (
    <main className='flex flex-col mx-auto relative h-auto min-h-[70vh] scroll-smooth md:scroll-auto items-center'>
      <h1 className='text-4xl px-4 text-center font-semibold text-primary-300 my-8'>
        Sign in to access your explorations&apos; area
      </h1>

      <SignInBtn />
    </main>
  );
}

//////////////////////////////////////////
// export default function LoginPage() {
//   // const res = await fetch('http://localhost:3000/api/auth/providers');
//   // const res = await fetch('https://balkana-try.vercel.app/api/auth/providers');
//   // const data = await res.json();
//   // const providers = Object.keys(data);

//   return (
//     <div className='flex flex-col gap-8 mt-8 items-center'>
//       <h1 className='text-4xl font-semibold text-primary-300 mb-4'>
//         Sign in to access your explorations&apos; area
//       </h1>

//       <SignInBtn />

//       {/* {providers.map((provider) => (
//         <SignInBtn provider={provider} key={provider} />
//       ))} */}
//     </div>
//   );
// }
