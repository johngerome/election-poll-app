import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import React, { useMemo } from 'react';
import { Button } from './button';
import { Input } from './input';

type PropsPollResults = {
  children: React.ReactNode;
};

export function PollResults({ children }: PropsPollResults) {
  return <ul className='mb-12 space-y-6'>{children}</ul>;
}

type PropsPollItem = {
  placement: number;
  avatar?: string;
  name: string;
  partyList: string;
  votes: number;
  maxVotes: number;
  isShowUpdate?: boolean;
};

export function PollItem({
  placement,
  avatar,
  name,
  partyList,
  votes,
  maxVotes,
  isShowUpdate,
}: PropsPollItem) {
  const progress = useMemo(() => (votes / maxVotes) * 100, [votes, maxVotes]);

  return (
    <>
      <li className='relative flex space-x-4'>
        <span className='flex h-4 w-4 flex-none items-center justify-center rounded-full bg-slate-200 p-3 font-semibold text-gray-500'>
          {placement}
        </span>
        <Avatar className='flex-none'>
          <AvatarImage src={avatar} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className='flex w-full flex-1 flex-col space-y-1'>
          <h3 className='flex-none font-bold uppercase text-slate-800'>
            {name} <span className='text-xs font-normal'>({partyList})</span>
          </h3>
          {isShowUpdate && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant='default'
                  size={'sm'}
                  className='-top-1 right-0 flex-none md:absolute md:ml-auto md:w-32'
                >
                  Update Votes
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{name}</AlertDialogTitle>
                  <AlertDialogDescription>
                    Current Votes: 1000
                  </AlertDialogDescription>
                  <form action='' className='block py-3'>
                    <Input type='text' value={1000} required />
                  </form>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Update</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <p className='flex-1 space-x-2'>
            <span className='flex-none font-semibold text-primary'>
              {votes}
            </span>
            <span className='text-sm text-gray-400'>Votes</span>
          </p>
          <Progress value={progress} className='h-2' />
        </div>
      </li>
    </>
  );
}
