'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import Link from 'next/link';

type Props = {
  href: string;
  className?: string;
};

export default function BackButton({ href, className }: Props) {
  return (
    <Button
      type='button'
      variant={'outline'}
      size={'sm'}
      className={cn(`mb-6 p-2`, className)}
      asChild
    >
      <Link href={href}>
        <Icon icon={'ion:chevron-back-outline'} width={20} />
      </Link>
    </Button>
  );
}
