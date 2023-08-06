import { ProgramCard } from '@/components/program-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function Programs() {
  return (
    <div className="p-8 overflow-auto space-y-4">
      <Button>New Program</Button>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href={`/dashboard/programs/adsad`}>
          <ProgramCard
            description="30 days strength and conditioning program for beginners."
            title="Strength and Conditioning"
            tags={['Crossfit', 'Fitness']}
            date="2011-10-05T14:48:00.000Z"
          />
        </Link>
        <ProgramCard
          description="30 days strength and conditioning program for beginners."
          title="Strength and Conditioning"
          tags={['Crossfit', 'Fitness']}
          date="2011-10-05T14:48:00.000Z"
        />
        <ProgramCard
          description="30 days strength and conditioning program for beginners."
          title="Strength and Conditioning"
          tags={['Crossfit', 'Fitness']}
          date="2011-10-05T14:48:00.000Z"
        />
        <ProgramCard
          description="30 days strength and conditioning program for beginners."
          title="Strength and Conditioning"
          tags={['Crossfit', 'Fitness']}
          date="2011-10-05T14:48:00.000Z"
        />
      </div>
    </div>
  );
}
