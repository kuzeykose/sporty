import { getProgram } from '@/services/programs';
import { SettingsForm } from './settings-form';
import { Separator } from '@/components/ui/separator';

type ProgramSettingsParams = {
  params: {
    programId: string;
  };
};

export default async function ProgramSettings({ params }: ProgramSettingsParams) {
  const program = await getProgram(params.programId);

  return (
    <div className="space-y-6">
      <SettingsForm program={program} />
    </div>
  );
}
