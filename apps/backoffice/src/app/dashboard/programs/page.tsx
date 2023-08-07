'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProgramCard } from '@/components/program-card';
import { Button } from '@/components/ui/button';
import { getProgram, getPrograms } from '@/services/programs';
import { Program } from '@/constants/Programs.type';

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>();

  useEffect(() => {
    (async () => {
      getPrograms().then((res) => {
        setPrograms(res);
      });
    })();
  }, []);

  return (
    <div className="p-8 overflow-auto space-y-4">
      <Button>New Program</Button>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {programs?.map((program) => (
          <Link href={`/dashboard/programs/${program.id}`}>
            <ProgramCard
              description={program.description}
              title={program.name}
              tags={['Crossfit', 'Fitness']}
              date="2011-10-05T14:48:00.000Z"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
