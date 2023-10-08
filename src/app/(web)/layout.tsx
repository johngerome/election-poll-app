import { Button } from "@/components/ui/button";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className='p-4 bg-white border-b border-gray-200 mb-6 flex items-center'>
        <h2 className='font-bold'>Barangay Election 2023</h2>
        <div className='ml-auto flex items-center space-x-4'>
          <span className='text-gray-500 text-sm hidden md:block'>test@test.com</span>
          <Button variant={"outline"} size={"sm"}>
            Log out
          </Button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
