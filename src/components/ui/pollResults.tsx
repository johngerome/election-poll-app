import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import React from "react";

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
};

export function PollItem({ placement, avatar, name, partyList, votes }: PollItem) {
  return (
    <li className='flex space-x-4'>
      <span className='flex-none w-4 h-4 rounded-full flex items-center justify-center bg-slate-200 p-3 font-semibold text-gray-500'>
        {placement}
      </span>
      <Avatar className='flex-none'>
        <AvatarImage src={avatar} />
        <AvatarFallback>PE</AvatarFallback>
      </Avatar>
      <div className='flex flex-1 flex-col space-y-1 w-full'>
        <h3 className='font-bold text-slate-800 flex-none uppercase'>
          {name} <span className='font-normal text-xs'>({partyList})</span>
        </h3>
        <p className='space-x-2 flex-1'>
          <span className='flex-none font-semibold text-primary'>{votes}</span>
          <span className='text-gray-400 text-sm'>Votes</span>
        </p>
        <Progress value={33} className='h-2' />
      </div>
    </li>
  );
}
