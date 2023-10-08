import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import React, { useMemo } from "react";
import { Button } from "./button";
import { Input } from "./input";

type PollResults = {
  children: React.ReactNode;
};

export function PollResults({ children }: PollResults) {
  return <ul className='space-y-6 mb-12'>{children}</ul>;
}

type PollItem = {
  placement: number;
  avatar?: string;
  name: string;
  partyList: string;
  votes: number;
  maxVotes: number;
};

export function PollItem({ placement, avatar, name, partyList, votes, maxVotes }: PollItem) {
  const progress = useMemo(() => (votes / maxVotes) * 100, [votes, maxVotes]);

  return (
    <>
      <li className='flex space-x-4 relative'>
        <span className='flex-none w-4 h-4 rounded-full flex items-center justify-center bg-slate-200 p-3 font-semibold text-gray-500'>
          {placement}
        </span>
        <Avatar className='flex-none'>
          <AvatarImage src={avatar} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-col space-y-1 w-full'>
          <h3 className='font-bold text-slate-800 flex-none uppercase'>
            {name} <span className='font-normal text-xs'>({partyList})</span>
          </h3>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='default' size={"sm"} className='flex-none md:w-32 md:ml-auto md:absolute -top-1 right-0'>
                Update Votes
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{name}</AlertDialogTitle>
                <AlertDialogDescription>Current Votes: 1000</AlertDialogDescription>
                <form action='' className='py-3 block'>
                  <Input type='text' value={1000} required />
                </form>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Update</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <p className='space-x-2 flex-1'>
            <span className='flex-none font-semibold text-primary'>{votes}</span>
            <span className='text-gray-400 text-sm'>Votes</span>
          </p>
          <Progress value={progress} className='h-2' />
        </div>
      </li>
    </>
  );
}
