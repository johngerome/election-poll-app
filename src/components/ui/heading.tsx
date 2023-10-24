type PropsSectionTitle = {
  children: React.ReactNode;
};

export function SectionTitle({ children }: PropsSectionTitle) {
  return <h2 className='mb-6 text-lg font-bold'>{children}</h2>;
}

type PropsPageHeader = {
  title: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, children }: PropsPageHeader) {
  return (
    <div className='mb-6'>
      <h1 className='mb-2 text-xl font-bold md:text-3xl'>{title}</h1>
      <p className='mb-0 text-sm text-gray-500'>{children}</p>
    </div>
  );
}
