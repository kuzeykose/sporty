import { ChevronDownIcon, CircleIcon, PlusIcon, StarIcon } from '@radix-ui/react-icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

type ProgramCardProps = {
  title: string;
  description: string;
  tags: string[];
  date: string;
};

export function ProgramCard({ title, description, tags, date }: ProgramCardProps) {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
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
