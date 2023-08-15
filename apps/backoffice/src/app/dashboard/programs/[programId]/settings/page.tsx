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
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
      </div>
      <Separator />
      <SettingsForm />
    </div>
  );
}
