type Container = {
  children: React.ReactNode;
};

export function Container({ children }: Container) {
  return <div className='w-full max-w-2xl mx-auto py-6 bg-white p-6'>{children}</div>;
}
