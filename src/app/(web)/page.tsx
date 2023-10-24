'use client';

import BarangayList from '@/components/BarangayList';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/heading';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';

export default function Index() {
  return (
    <>
      <Container>
        <div className='mb-16'>
          <h1 className='mb-2 text-lg font-bold md:text-3xl'>
            Cabantian Election Real-Time Updates
          </h1>
          <p className='mb-6'>
            Stay Informed with Live Updates on Barangay Election Results,
            Delivered by <strong>Edward Peligrino</strong>.
          </p>
          <p className='text-center'>
            <span className='inline-block rounded-lg bg-gray-600 p-3 text-sm text-white'>
              Coming Soon - October 30, 2023
            </span>
          </p>
        </div>
        <div className='flex flex-col items-center justify-center bg-white'>
          <div className='mb-4 h-40 w-40 overflow-hidden rounded-full border-4 border-blue-100  object-cover'>
            <Image
              src={'/images/edward.png?2410202301'}
              width={800}
              height={800}
              alt='Edward'
              className='h-full w-full object-cover'
            />
          </div>
          <h1 className='mb-4 text-2xl font-bold'>
            <span className='text-blue-500'>Edward</span>{' '}
            <span className='text-red-500'>Peligrino</span>
          </h1>
          <ul className='mb-6 text-lg'>
            <li className='flex items-center'>
              <Icon
                icon={'radix-icons:check'}
                width={24}
                className='text-green-500'
              />
              Mahigala-on
            </li>
            <li className='flex items-center'>
              <Icon
                icon={'radix-icons:check'}
                width={24}
                className='text-green-500'
              />
              May katakos mo serbisyo!
            </li>
          </ul>
          <p className='mb-6 text-lg font-semibold uppercase'>
            Pagka Brgy. Kagawad
          </p>
        </div>
      </Container>
    </>
  );
}
