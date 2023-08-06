import { redirect } from 'next/navigation';

async function redirectToPrograms(req: any) {
  console.log(req);

  redirect(`/dashboard/programs/${req.params.programId}/plans`);
}

export default async function Programs(req: any) {
  await redirectToPrograms(req);
}
