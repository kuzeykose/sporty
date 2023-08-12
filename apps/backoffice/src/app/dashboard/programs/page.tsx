import Link from 'next/link';
import { ProgramCard } from '@/components/program-card';
import { Button } from '@/components/ui/button';
import { getPrograms } from '@/services/programs';
import { Program } from '@/constants/Programs.type';

async function getProgramsList() {
  return getPrograms().then((res) => {
    return res;
  });
}

export default async function Programs() {
  const programs = await getProgramsList();

  return (
    <div className="p-8 overflow-auto space-y-4">
      <Button>New Program</Button>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
        {programs?.map((program: Program) => (
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
