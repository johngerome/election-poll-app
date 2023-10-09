'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Icon } from '@iconify/react';

import type { Database } from '@/lib/database';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'This field is required'),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const { error: _error } = await supabase.auth.signInWithPassword({
      email: values?.email,
      password: values?.password,
    });

    setIsLoading(false);

    if (_error) {
      setError(_error.message);
      return;
    }

    router.push('/');
  }

  // const handleSignUp = async () => {
  //   await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${location.origin}/auth/callback`
  //     }
  //   });
  //   router.refresh();
  // };

  return (
    <div className='mx-auto mt-12 w-full max-w-md rounded-md border border-gray-200 bg-white p-6 md:p-12'>
      <h1 className='mb-6 text-center text-2xl font-bold'>Admin Login</h1>
      <Form {...form}>
        {error && (
          <Alert variant={'destructive'} className='mb-6 flex space-x-3'>
            <Icon
              icon={'mingcute:warning-fill'}
              width={24}
              className=' flex-none'
            />
            <div>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </div>
          </Alert>
        )}

        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    {...form.register('password', { required: true })}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='w-full'
            disabled={isLoading}
            isLoading={isLoading}
          >
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
}
