'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  className?: string;
};

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default function MenuButton({ className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={'outline'}
          size={'sm'}
          className={cn(`p-2`, className)}
        >
          <Icon icon={'iconamoon:menu-burger-horizontal-bold'} width={20} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <ul className='-mx-2 mt-6'>
          <li className='rounded px-2 py-1 hover:bg-gray-100'>
            <Link href={'/'} className='block' onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li className='rounded px-2 py-1 hover:bg-gray-100'>
            <Link
              href={'/barangay/cabantian'}
              className='block'
              onClick={() => setOpen(false)}
            >
              Barangay Results
            </Link>
          </li>
          <li className='rounded px-2 py-1 hover:bg-gray-100'>
            <Link
              href={'/barangay/cabantian/sk'}
              className='block'
              onClick={() => setOpen(false)}
            >
              SK Results
            </Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
