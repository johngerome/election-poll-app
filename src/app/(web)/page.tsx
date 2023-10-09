import Locations from "@/components/Locations";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/heading";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const candidates = supabase
    .channel("custom-all-channel")
    .on("postgres_changes", { event: "*", schema: "public", table: "candidates" }, (payload) => {
      console.log("Change received!", payload);
    })
    .subscribe();
  return (
    <>
      <Container>
        <PageHeader title='Select Barangay'></PageHeader>
        <Locations />
      </Container>
    </>
  );
}
