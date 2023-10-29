'use client';

import { orderBy } from 'lodash-es';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useMemo, useState } from 'react';

import { Database } from '@/lib/database';
import { PollItem, PollResults } from '@/components/ui/pollResults';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { pollResultsStore } from '@/store/pollStore';

type PropsResultsPoll = {
  locationId: string;
  maxVoters: number;
  position: string;
};

export default function ResultsPoll({
  locationId,
  position,
  maxVoters,
}: PropsResultsPoll) {
  const supabase = createClientComponentClient<Database>();
  const setPollResultsStore = useSetRecoilState(pollResultsStore);

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const res = await supabase.auth.refreshSession();
      const { session } = res?.data;

      if (res.error) {
        return Promise.reject(res?.error?.message);
      }

      return session;
    },
  });

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ['results', position, locationId],
    queryFn: async () => {
      const res = await supabase
        .from('candidates')
        .select(
          `
            id, first_name, last_name, nickname, location_id, avatar,
            barangays (id, name),
            party_list (name),
            votes (votes, updated_at)
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

  setPollResultsStore((value) => ({
    updatedAt: {
      ...value.updatedAt,
      [locationId]: data?.[0]?.votes?.[0]?.updated_at,
    },
  }));

  const candidatesByVotes = useMemo(() => {
    const candidates = data?.map((item) => ({
      id: item?.id,
      first_name: item?.first_name,
      last_name: item?.last_name,
      nickname: item?.nickname,
      party_list: item?.party_list?.name,
      avatar: item?.avatar,
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
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      votes.unsubscribe();
    };
  }, [refetch, supabase]);

  async function handleUpdateVotes(candidateId: number, newVotes: number) {
    const { error } = await supabase
      .from('votes')
      .update({ votes: newVotes, updated_at: new Date().toISOString() })
      .eq('candidate_id', candidateId);
    refetch();
    console.error(error);
  }

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
            avatar={
              item?.avatar ||
              `https://eu.ui-avatars.com/api/?name=${item.first_name}&size=250`
            }
            first_name={item.first_name}
            last_name={item.last_name}
            nickname={item.nickname}
            partyList={item?.party_list || ''}
            placement={index + 1}
            votes={item?.votes}
            maxVotes={maxVoters}
            isShowUpdate={!!session?.user.id}
            onSubmit={(newVote) =>
              handleUpdateVotes(item?.id, parseInt(newVote))
            }
            className={index > 6 ? 'opacity-30' : 'opacity-100'}
          ></PollItem>
        ))}
    </PollResults>
  );
}
