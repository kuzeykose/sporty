'use client';

import { ProgramSettings } from '@/constants/Programs.type';
import { getProgram } from '@/services/programs';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ProgramSettings() {
  const [program, setProgram] = useState<ProgramSettings>();

  const params = useParams();
  const programId = params.programId;

  useEffect(() => {
    (async () => {
      getProgram(programId as string).then((res) => {
        console.log(res);

        setProgram(res);
      });
    })();
  }, []);

  return (
    <div>
      <ul>
        <li>{program?.name}</li>
        <li>{program?.description}</li>
        <li>{program?.owner}</li>
        <li>{program?.createdAt}</li>
      </ul>
    </div>
  );
}
