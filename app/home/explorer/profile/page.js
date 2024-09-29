import { auth } from '@/lib/auth';
import { getExplorer } from '@/lib/actions';
import SelectCountry from '@/components/SelectCountry';
import UpdatePrifileForm from '@/components/UpdatePrifileForm';

export const metadata = {
  title: 'Update Explorer Profile',
};

async function ProfilePage() {
  const session = await auth();
  const explorer = await getExplorer(session.user.email);
  let explorerNationality = '';
  explorer.nationality === null
    ? (explorerNationality = 'Bulgaria')
    : (explorerNationality = explorerNationality);

  return (
    <section>
      <h1 className='font-semibold text-4xl text-accent-200 m-2'>
        Explorer Profile Page
      </h1>

      <p className='font-normal text-xl text-primary-300 m-2'>
        Providing real information will make your exploration faster and
        smoother. See you in Balkana!
      </p>
      <UpdatePrifileForm explorer={explorer}>
        <SelectCountry
          name='nationality'
          id='nationality'
          className='px-5 py-3 bg-wgite text-primary-300 w-full shadow-sm rounded-sm'
          defaultCountry={explorerNationality}
        />
      </UpdatePrifileForm>
    </section>
  );
}

export default ProfilePage;
