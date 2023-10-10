'use client';

import { pollResultsStore } from '@/store/pollStore';
import { format, parseISO } from 'date-fns';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

type PropsResultsUpdatedAt = {
  locationId: string;
};

export default function ResultsUpdatedAt({
  locationId,
}: PropsResultsUpdatedAt) {
  const pollResults = useRecoilValue(pollResultsStore);
  const updatedAtStore = pollResults.updatedAt;
  const updatedAt = updatedAtStore?.[locationId];

  const formattedDate = useMemo(() => {
    return updatedAt && format(parseISO(updatedAt), 'MMM dd, yyyy hh:mm aa');
  }, [updatedAt]);

  return <strong>{formattedDate}</strong>;
}
