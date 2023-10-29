import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader, SectionTitle } from '@/components/ui/heading';
import ResultsPoll from '@/components/ResultsPoll';
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
      <PageHeader title={`${barangay?.name} Election Results`}>
        Partial, unofficial results as of{' '}
        <ResultsUpdatedAt locationId={barangay?.id} />
      </PageHeader>
      <Tabs defaultValue='barangay'>
        <div className='flex justify-end'>
          <TabsList className='mb-6'>
            <TabsTrigger value='barangay'>Barangay</TabsTrigger>
            <TabsTrigger value='sk'>SK</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='barangay'>
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
        </TabsContent>
        <TabsContent value='sk'>
          <SectionTitle>Chairperson, Sangguniang Kabataan</SectionTitle>
          <ResultsPoll
            locationId={barangay?.id}
            position={'SK Chairperson'}
            maxVoters={barangay?.voters || 10000}
          />
          <SectionTitle>Member, Sangguniang Kabataan</SectionTitle>
          <ResultsPoll
            locationId={barangay?.id}
            position={'SK Member'}
            maxVoters={barangay?.voters || 10000}
          />
        </TabsContent>
      </Tabs>
      <div className='mt-12 text-sm text-gray-400'>
        <h4 className='mb-3'>Disclaimer</h4>
        <p>
          This app is for informational purposes only. It is not an official
          election platform. Please use official sources for accurate election
          information. We do not endorse any candidate or political group. User
          discretion is advised.
        </p>
      </div>
    </div>
  );
}
