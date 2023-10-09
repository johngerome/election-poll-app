import { Button } from '@/components/ui/button';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className='mb-6 flex items-center border-b border-gray-200 bg-white p-4'>
        <h2 className='font-bold'>Barangay Election 2023</h2>
        <div className='ml-auto flex items-center space-x-4'>
          <span className='hidden text-sm text-gray-500 md:block'>
            test@test.com
          </span>
          <Button variant={'outline'} size={'sm'}>
            Log out
          </Button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
