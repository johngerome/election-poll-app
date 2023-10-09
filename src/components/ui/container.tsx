type PropsContainer = {
  children: React.ReactNode;
};

export function Container({ children }: PropsContainer) {
  return (
    <div className='mx-auto w-full max-w-2xl bg-white p-6 py-6 md:p-12'>
      {children}
    </div>
  );
}
