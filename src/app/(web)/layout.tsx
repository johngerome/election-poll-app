import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database';
import { Button } from '@/components/ui/button';
import LogoutButton from '@/components/LogoutButton';
import MenuButton from '@/components/MenuButton';
import AppLogo from '@/components/AppLogo';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const { data } = await supabase.auth.getSession();
  const { session } = data;

  return (
    <div>
      <header className='mb-6 flex items-center border-b border-gray-200 bg-white p-4'>
        <AppLogo />
        <div className='ml-auto flex items-center space-x-4'>
          {/* <MenuButton /> */}
          <span className='hidden text-sm text-gray-500 md:block'>
            {session?.user.email}
          </span>
          {session && <LogoutButton />}
        </div>
      </header>
      <main>{children}</main>
      <footer className='py-6 text-center text-sm text-gray-500'>
        &copy; Barangay Election 2023 - Powered by{' '}
        <a href='https://n2hosting.com/'>n2hosting.com</a>
      </footer>
    </div>
  );
}
