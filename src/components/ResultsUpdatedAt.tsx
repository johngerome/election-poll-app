'use client';

import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database';

type PropsResultsUpdatedAt = {
  locationId: string;
};

export default function ResultsUpdatedAt({
  locationId,
}: PropsResultsUpdatedAt) {
  const supabase = createClientComponentClient<Database>();
  const [updatedAt, setUpdatedAt] = useState('');

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['votes-updated', locationId],
    queryFn: async () => {
      const res = await supabase
        .from('votes')
        .select(`updated_at`)
        .not('updated_at', 'is', null)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (res.error) {
        return Promise.reject(res?.error?.message);
      }

      return res?.data;
    },
  });

  useEffect(() => {
    const votes = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'votes' },
        (payload) => {
          if ('updated_at' in payload.new) {
            const updated_at = payload.new?.updated_at;

            if (updated_at) {
              setUpdatedAt(
                format(parseISO(updated_at || ''), 'MMM dd, yyyy hh:mm aa')
              );
            }
          }
        }
      )
      .subscribe();

    return () => {
      votes.unsubscribe();
    };
  }, [refetch, supabase]);

  const formattedDate = useMemo(() => {
    return (
      data?.[0]?.updated_at &&
      format(parseISO(data?.[0]?.updated_at || ''), 'MMM dd, yyyy hh:mm aa')
    );
  }, [data]);

  if (!data || isLoading) {
    return <strong>...</strong>;
  }

  return <strong>{updatedAt || formattedDate}</strong>;
}
