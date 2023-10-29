'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function AppLogo() {
  return (
    <Link href={'/'}>
      <h2 className='flex items-center space-x-3 font-bold'>
        <Icon icon={'fluent:poll-20-filled'} width={24} />{' '}
        <span>Cabantian Election 2023</span>
      </h2>
    </Link>
  );
}
