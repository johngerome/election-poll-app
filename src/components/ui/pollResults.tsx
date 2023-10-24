import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import React, { useMemo, useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { numNth } from '@/lib/utils';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type PropsPollResults = {
  children: React.ReactNode;
};

export function PollResults({ children }: PropsPollResults) {
  return <ul className='mb-12 space-y-6'>{children}</ul>;
}

type PropsPollItem = {
  placement: number;
  avatar?: string;
  first_name: string | null;
  last_name: string | null;
  nickname: string | null;
  partyList: string;
  votes: number;
  maxVotes: number;
  isShowUpdate?: boolean;
  onSubmit: (value: string) => void;
};

export function PollItem({
  placement,
  avatar,
  first_name,
  last_name,
  nickname,
  partyList,
  votes,
  maxVotes,
  isShowUpdate,
  onSubmit,
}: PropsPollItem) {
  const progress = useMemo(() => (votes / maxVotes) * 100, [votes, maxVotes]);

  return (
    <>
      <li className='relative flex space-x-4'>
        <span className='mb-auto flex w-6 flex-none items-center justify-center rounded-full text-sm font-semibold text-gray-500'>
          {numNth(placement)}
        </span>
        <Avatar className='flex-none'>
          <AvatarImage src={avatar} />
          <AvatarFallback>{first_name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className='flex w-full flex-1 flex-col space-y-1'>
          <div className='flex flex-1 flex-row-reverse flex-wrap justify-end md:flex-nowrap'>
            {isShowUpdate && (
              <AlertUpdateVotes
                first_name={first_name}
                last_name={last_name}
                nickname={nickname}
                votes={votes}
                onSubmit={onSubmit}
              />
            )}
            <div className='flex flex-col'>
              <h3 className='flex-none break-words font-bold uppercase text-slate-800'>
                {first_name}, {nickname && `"${nickname}"`} {last_name}{' '}
                <span className='text-xs font-normal'>({partyList})</span>
              </h3>
              <p className='flex-1 space-x-2'>
                <span className='flex-none font-semibold text-primary'>
                  {new Intl.NumberFormat('en-IN', {
                    maximumSignificantDigits: 3,
                  }).format(votes)}
                </span>
                <span className='text-sm text-gray-400'>Votes</span>
              </p>
            </div>
          </div>

          <Progress value={progress} className='h-2' />
        </div>
      </li>
    </>
  );
}

type PropsAlertUpdateVotes = Partial<PropsPollItem>;

const updateVoteSchema = z.object({
  newVote: z.string().min(1, 'This field is required'),
});

function AlertUpdateVotes({
  first_name,
  nickname,
  last_name,
  votes,
  onSubmit,
}: PropsAlertUpdateVotes) {
  const [newVotes, setNewVotes] = useState('');

  const form = useForm<z.infer<typeof updateVoteSchema>>({
    resolver: zodResolver(updateVoteSchema),
    defaultValues: {
      newVote: String(votes),
    },
  });

  function handleBlur(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e?.target;
    console.log(target?.value);
    setNewVotes(target?.value);
  }

  function handleSubmit(values: z.infer<typeof updateVoteSchema>) {
    if (typeof onSubmit === 'function') {
      // onSubmit({ newVote });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='default'
          size={'sm'}
          className='-top-1 right-0 mb-2 w-full flex-none md:mb-0 md:ml-auto md:w-auto'
        >
          Update
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {first_name}, {nickname && `"${nickname}"`} {last_name}
          </AlertDialogTitle>
          <p>Current Votes: {votes}</p>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='block py-3'
          >
            <label className='text-sm'>
              New Votes
              <Input type='text' value={votes} required onChange={handleBlur} />
            </label>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Update</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
