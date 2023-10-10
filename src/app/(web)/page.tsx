import BarangayList from '@/components/BarangayList';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/heading';

export default async function Index() {
  return (
    <>
      <Container>
        <PageHeader title='Select Barangay'></PageHeader>
        <BarangayList />
      </Container>
    </>
  );
}
