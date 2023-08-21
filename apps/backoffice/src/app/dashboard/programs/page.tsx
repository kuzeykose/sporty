import { ProgramCard } from '@/components/program-card';
import { Button } from '@/components/ui/button';
import { getPrograms } from '@/services/programs';
import { Program } from '@/constants/Programs.type';
import AddProgramModal from './add-program';

async function getProgramsList() {
  return getPrograms().then((res) => {
    return res;
  });
}

export default async function Programs() {
  const programs = await getProgramsList();

  return (
    <div className="p-8 overflow-auto space-y-4">
      <AddProgramModal />
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
        {programs?.map((program: Program) => (
          <ProgramCard
            id={program.id}
            description={program.description}
            name={program.name}
            tags={['Crossfit', 'Fitness']}
            date="2011-10-05T14:48:00.000Z"
          />
        ))}
      </div>
    </div>
  );
}
