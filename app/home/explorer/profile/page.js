import { getExplorer } from '@/lib/actions';
import SelectCountry from '@/components/SelectCountry';
import UpdatePrifileForm from '@/components/UpdatePrifileForm';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Update Explorer Profile',
};

async function ProfilePage() {
  const session = await auth();
  const explorer = await getExplorer(session.user.email);

  return (
    <div>
      <h2 className='font-semibold text-4xl text-accent-200 m-4'>
        Explorer Profile Page
      </h2>
      {/* <p className='font-normal text-xl text-primary-300 m-4'>
        You have NO profile yet.
      </p> */}
      <p className='font-normal text-xl text-primary-300 m-4'>
        Providing real information will make your exploration faster and
        smoother. See you in Balkana!
      </p>
      <UpdatePrifileForm explorer={explorer}>
        <SelectCountry
          name='nationality'
          id='nationality'
          className='px-5 py-3 bg-wgite text-primary-300 w-full shadow-sm rounded-sm'
          defaultCountry={explorer.nationality}
        />
      </UpdatePrifileForm>
    </div>
  );
}

export default ProfilePage;
