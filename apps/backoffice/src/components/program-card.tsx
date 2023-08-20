'use client';

import { ChevronDownIcon, CircleIcon, PlusIcon, StarIcon } from '@radix-ui/react-icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useRouter } from 'next/navigation';
import { useLayoutContext } from './layout-provider';

type ProgramCardProps = {
  name: string;
  description: string;
  tags: string[];
  date: string;
  id: string;
};

export function ProgramCard({ name, description, tags, date, id }: ProgramCardProps) {
  const router = useRouter();
  const layoutContext = useLayoutContext();

  return (
    <Card
      className="cursor-pointer"
      onClick={() => {
        router.push(`/dashboard/programs/${id}`);
        layoutContext.setProgram({ name, id });
      }}
    >
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            {tags.join(', ')}
          </div>
          <div>{date}</div>
        </div>
      </CardContent>
    </Card>
  );
}
