'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { Button } from './ui/button';

export default function Locations() {
  const supabase = createClientComponentClient<Database>();

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const res = await supabase
        .from('location')
        .select()
        .order('address', { ascending: true });

      if (res?.error) {
        return Promise.reject(res?.error?.message);
      }

      return res?.data;
    },
  });

  useEffect(() => {
    const locationsEvents = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'location' },
        () => {
          refetch();
        }
      )
      .subscribe();
    return () => {
      locationsEvents.unsubscribe();
    };
  }, [refetch, supabase]);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (typeof error === 'string') {
    return <p className='mb-12 text-red-500'>{error}</p>;
  }

  if (data && data?.length <= 0) {
    return <p>Locations not found.</p>;
  }

  return (
    <ul className='-mx-2 flex flex-wrap'>
      {data &&
        data?.map((item) => (
          <li key={item.id} className='p-2'>
            <Button variant={'outline'} asChild>
              <Link href={`/barangay/${item.id}`}>{item.address}</Link>
            </Button>
          </li>
        ))}
    </ul>
  );
}
