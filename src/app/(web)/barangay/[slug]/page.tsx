import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import ResultsPoll from '@/components/ResultsPoll';
import { PageHeader, SectionTitle } from '@/components/ui/heading';
import BackButton from '@/components/BackButton';

export default async function ResultsByLocation({
  params,
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data, error } = await supabase
    .from('location')
    .select('address, voters')
    .eq('id', params?.slug);

  if (error) {
    return <p className='text-red-500'>{error?.message}</p>;
  }

  const [location] = data;

  if (!location) {
    return <p>Barangay Not Found.</p>;
  }

  return (
    <div>
      <BackButton href='/' className='-mt-10' />
      <PageHeader title={`Barangay ${location?.address}`}>
        Partial, unofficial results as of{' '}
        <strong>October 26, 2023, 10:00AM.</strong>
      </PageHeader>
      <SectionTitle>Punong Barangay</SectionTitle>
      <ResultsPoll
        locationId={params?.slug}
        position={'Punong Barangay'}
        maxVoters={location?.voters || 10000}
      />
      <SectionTitle>Kagawad, Sangguniang Barangay</SectionTitle>
      <ResultsPoll
        locationId={params?.slug}
        position={'Kagawad'}
        maxVoters={location?.voters || 10000}
      />
      <div className='mt-12 text-sm text-gray-400'>
        <h4 className='mb-3'>Disclaimer</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil dicta
          aperiam mollitia amet laboriosam culpa consectetur sit impedit? Saepe
          officia impedit non atque quia nihil voluptates corrupti quae
          doloribus excepturi?
        </p>
      </div>
    </div>
  );
}
