'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import type { Database } from '@/lib/database';
import { Button } from './ui/button';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      window.location.reload();
    }
  }

  return (
    <Button
      variant={'outline'}
      size={'sm'}
      onClick={handleSignOut}
      className='p-2'
    >
      <Icon icon='ic:round-logout' width={20} />
    </Button>
  );
}
