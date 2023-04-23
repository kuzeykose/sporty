import { useLoaderData, useParams } from '@remix-run/react';
import { ActionArgs } from '@remix-run/server-runtime';
import { getProgram } from '~/utils/program.server';

type Program = {
  owner: string;
  name: string;
  id: string;
  description: string;
  status: string;
  createdAt: string;
};

export const loader = async ({ request, params }: ActionArgs) => {
  if (params.programId) {
    const program = await getProgram(request, params.programId);
    return program;
  } else {
    return 'Error';
  }
};

const ProgramId = () => {
  const data: Program = useLoaderData<typeof loader>();

  return (
    <div>
      <h2 className="text-2xl">Program Information</h2>

      <div className="space-y-4">
        <div>
          name:
          <p>{data.name}</p>
        </div>
        <div>
          id:
          <p>{data.id}</p>
        </div>
        <div>
          owner:
          <p>{data.owner}</p>
        </div>
        <div>
          description
          <p>{data.description}</p>
        </div>
        <div>
          status:
          <p>{data.status}</p>
        </div>
        <div>
          createdAt
          <p>{data.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgramId;
