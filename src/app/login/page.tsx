"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Icon } from "@iconify-icon/react";

import type { Database } from "@/lib/database";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "This field is required")
});

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error: _error } = await supabase.auth.signInWithPassword({
      email: values?.email,
      password: values?.password
    });

    if (_error) {
      setError(_error.message);
      return;
    }

    router.refresh();
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

  // const handleSignOut = async () => {
  //   await supabase.auth.signOut();
  //   router.refresh();
  // };

  return (
    <div className='w-full max-w-md border border-gray-200 mx-auto mt-12 p-6 md:p-12 bg-white rounded-md'>
      <h1 className='text-2xl font-bold mb-6 text-center'>Admin Login</h1>
      <Form {...form}>
        {error && (
          <Alert variant={"destructive"} className='flex space-x-3 mb-6'>
            <Icon icon={"mingcute:warning-fill"} width={24} className=' flex-none' />
            <div>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </div>
          </Alert>
        )}

        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
                  <Input type='password' {...form.register("password", { required: true })} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full'>
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
}
