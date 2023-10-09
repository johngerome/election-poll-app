'use client';

import { orderBy } from 'lodash-es';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useMemo, useState } from 'react';

import { Database } from '@/lib/database';
import { PollItem, PollResults } from '@/components/ui/pollResults';
import { useQuery } from '@tanstack/react-query';

type PropsResultsPoll = {
  locationId: string;
  maxVoters: number;
  position: string;
};

// type Candidate = Pick<
//   Database["public"]["Tables"]["candidates"]["Row"],
//   "first_name" | "last_name" | "avatar" | "id" | "nickname" | "position"
// > & {
//   location: {
//     id: number;
//     address: string | null;
//   } | null;
//   party_list: {
//     name: string | null;
//   } | null;
//   votes: { votes: number }[];
// };
// type Candidates = Candidate[];

export default function ResultsPoll({
  locationId,
  position,
  maxVoters,
}: PropsResultsPoll) {
  const supabase = createClientComponentClient<Database>();

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ['results', position, locationId],
    queryFn: async () => {
      const res = await supabase
        .from('candidates')
        .select(
          `
            id, first_name, last_name, nickname, location_id,
            location (id, address),
            party_list (name),
            votes (votes)
          `
        )
        .eq('location_id', locationId)
        .eq('position', position);

      if (res.error) {
        return Promise.reject(res?.error?.message);
      }

      return res?.data;
    },
  });

  const candidatesByVotes = useMemo(() => {
    const candidates = data?.map((item) => ({
      id: item?.id,
      first_name: item?.first_name,
      last_name: item?.last_name,
      nickname: item?.nickname,
      party_list: item?.party_list?.name,
      votes: item?.votes?.[0]?.votes || 0,
    }));

    return orderBy(candidates, ['votes'], ['desc']);
  }, [data]);

  useEffect(() => {
    const votes = supabase
      .channel('custom-update-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'votes' },
        (payload) => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      votes.unsubscribe();
    };
  }, [refetch, supabase]);

  if (isLoading) {
    return <p className='mb-12'>loading...</p>;
  }

  if (typeof error === 'string') {
    return <p className='mb-12 text-red-500'>{error}</p>;
  }

  if (candidatesByVotes.length <= 0) {
    return <p className='mb-12 '>No Results found.</p>;
  }

  return (
    <PollResults>
      {candidatesByVotes &&
        candidatesByVotes.length >= 1 &&
        candidatesByVotes.map((item, index) => (
          <PollItem
            key={item.id}
            avatar={`https://i.pravatar.cc/150?img=${index + 1}`}
            first_name={item.first_name}
            last_name={item.last_name}
            nickname={item.nickname}
            partyList={item?.party_list || ''}
            placement={index + 1}
            votes={item?.votes}
            maxVotes={maxVoters}
          ></PollItem>
        ))}
    </PollResults>
  );
}
