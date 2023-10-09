type PropsContainer = {
  children: React.ReactNode;
};

export function Container({ children }: PropsContainer) {
  return <div className='w-full max-w-2xl mx-auto py-6 bg-white p-6 md:p-12'>{children}</div>;
}
