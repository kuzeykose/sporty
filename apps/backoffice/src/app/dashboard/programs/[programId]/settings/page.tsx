import { ProgramSettings } from '@/constants/Programs.type';
import { getProgram } from '@/services/programs';

import React from 'react';

type ProgramSettingsParams = {
  params: {
    programId: string;
  };
};

export default async function ProgramSettings({ params }: ProgramSettingsParams) {
  const program = await getProgram(params.programId);

  return (
    <div>
      <ul>
        <h1>SETTINGS PAGE</h1>
        <li>{program?.name}</li>
        <li>{program?.description}</li>
        <li>{program?.owner}</li>
        <li>{program?.createdAt}</li>
      </ul>
    </div>
  );
}
