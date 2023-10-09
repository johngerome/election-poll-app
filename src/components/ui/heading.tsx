type PropsSectionTitle = {
  children: React.ReactNode;
};

export function SectionTitle({ children }: PropsSectionTitle) {
  return <h2 className='font-bold text-lg mb-6'>{children}</h2>;
}

type PropsPageHeader = {
  title: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, children }: PropsPageHeader) {
  return (
    <div className='mb-6'>
      <h1 className='text-2xl md:text-3xl font-bold mb-2'>{title}</h1>
      <p className='text-gray-500 mb-0 text-sm'>{children}</p>
    </div>
  );
}
