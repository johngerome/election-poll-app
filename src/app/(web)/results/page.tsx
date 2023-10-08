'use client'

import { Container } from "@/components/ui/container";
import { PageHeader, SectionTitle } from "@/components/ui/heading";
import { PollItem, PollResults } from "@/components/ui/pollResults";

export default function Results() {
  return (
    <>
      <Container>
        <PageHeader title='Barangay Guinacot'>
          Partial, unofficial results as of <strong>October 26, 2023, 10:00AM.</strong>
        </PageHeader>
        <SectionTitle>Punong Barangay</SectionTitle>
        <PollResults>
          <PollItem
            key={1}
            avatar='https://i.pravatar.cc/150?img=4'
            name='Peligrino, Edward'
            partyList='NPA'
            placement={1}
            votes={1000}
            maxVotes={3000}
          ></PollItem>
          <PollItem
            key={2}
            avatar='https://i.pravatar.cc/150?img=3'
            name='Doe, John'
            partyList='Independent'
            placement={2}
            votes={800}
            maxVotes={3000}
            isShowUpdate
          ></PollItem>
        </PollResults>
        <SectionTitle>Kagawad, Sangguniang Barangay</SectionTitle>
      </Container>
    </>
  );
}
