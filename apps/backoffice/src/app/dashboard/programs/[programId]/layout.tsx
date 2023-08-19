import { getProgram } from '@/services/programs';
import Breadcrumb from '@/components/breadcrumb';
import { Program } from '@/constants/Programs.type';

export default async function layout({ children, params }: any) {
  const program: Program = params.programId && (await getProgram(params.programId));

  return (
    <div className="w-full">
      <Breadcrumb program={program} />
      <div className="p-8">{children}</div>
    </div>
  );
}
