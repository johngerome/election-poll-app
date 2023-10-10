import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import ResultsPoll from '@/components/ResultsPoll';
import { PageHeader, SectionTitle } from '@/components/ui/heading';
import BackButton from '@/components/BackButton';
import ResultsUpdatedAt from '@/components/ResultsUpdatedAt';

export default async function ResultsByBarangay({
  params,
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data, error } = await supabase
    .from('barangays')
    .select('id, name, voters')
    .eq('slug', params?.slug);

  if (error) {
    return <p className='text-red-500'>{error?.message}</p>;
  }

  const [barangay] = data;

  if (!barangay) {
    return <p>Barangay Not Found.</p>;
  }

  return (
    <div>
      <BackButton href='/' className='-mt-10' />
      <PageHeader title={`Barangay ${barangay?.name}`}>
        Partial, unofficial results as of{' '}
        <ResultsUpdatedAt locationId={barangay?.id} />
      </PageHeader>
      <SectionTitle>Punong Barangay</SectionTitle>
      <ResultsPoll
        locationId={barangay?.id}
        position={'Punong Barangay'}
        maxVoters={barangay?.voters || 10000}
      />
      <SectionTitle>Kagawad, Sangguniang Barangay</SectionTitle>
      <ResultsPoll
        locationId={barangay?.id}
        position={'Kagawad'}
        maxVoters={barangay?.voters || 10000}
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
