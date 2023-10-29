import {
  AlertDialog,
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
import { cn, numNth } from '@/lib/utils';
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
  className?: string;
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
  className,
  onSubmit,
}: PropsPollItem) {
  const progress = useMemo(() => (votes / maxVotes) * 100, [votes, maxVotes]);

  return (
    <>
      <li className={cn('relative flex space-x-4', className)}>
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
                {partyList && (
                  <span className='text-xs font-normal'>({partyList})</span>
                )}
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
  const [open, setOpen] = React.useState(false);
  const [newVotes, setNewVotes] = useState(['']);

  const form = useForm<z.infer<typeof updateVoteSchema>>({
    resolver: zodResolver(updateVoteSchema),
    defaultValues: {
      newVote: String(votes),
    },
  });

  const totalNewVotes = useMemo(() => {
    return newVotes?.reduce((a, b) => String(parseInt(a) + parseInt(b)));
  }, [newVotes]);

  function handleAddVote() {
    setNewVotes((current) => [...current, '']);
  }

  function handleRemoveVote(selectedIndex: number) {
    setNewVotes((current) => current?.filter((_, i) => selectedIndex !== i));
  }

  function handleBlur(value: any, selectedIndex: number) {
    setNewVotes(
      (current) =>
        current?.map((itemValue, i) =>
          selectedIndex === i ? value : itemValue
        )
    );
  }

  function handleSubmit() {
    // if (parseInt(totalNewVotes) <= 0) return;
    if (typeof onSubmit === 'function') {
      onSubmit(totalNewVotes);
      setOpen(false);
    }
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
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
            <p className='pb-6 text-lg'>
              Current Votes:{' '}
              {new Intl.NumberFormat('en-IN', {
                maximumSignificantDigits: 3,
              }).format(votes || 0)}
            </p>
            {(!totalNewVotes || parseInt(totalNewVotes) <= 0) && (
              <p className='text-red-slate text-sm'>
                Please input new votes for {first_name}.
              </p>
            )}
            <form onSubmit={handleSubmit} className='block py-3'>
              <label className='flex flex-col text-left text-sm'>
                <span className='mb-2 inline-block font-semibold'>
                  New Votes for {first_name}
                </span>
                {newVotes &&
                  newVotes?.map((value, index) => (
                    <div key={index} className='mb-2 grid grid-cols-6 gap-2'>
                      <Input
                        type='number'
                        value={value}
                        required
                        onChange={(e) => handleBlur(e.target.value, index)}
                        className='col-span-5'
                      />
                      {newVotes?.length !== index + 1 && (
                        <Button
                          type='button'
                          variant={'destructive'}
                          className='col-span-1'
                          onClick={() => handleRemoveVote(index)}
                        >
                          -
                        </Button>
                      )}
                      {newVotes?.length === index + 1 && (
                        <Button
                          type='button'
                          variant={'secondary'}
                          className='col-span-1'
                          onClick={handleAddVote}
                        >
                          +
                        </Button>
                      )}
                    </div>
                  ))}
              </label>
            </form>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant={'default'} onClick={handleSubmit}>
              Update New Vote ({totalNewVotes || 0})
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
