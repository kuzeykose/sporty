import { redirect } from 'next/navigation';

async function redirectToPrograms(req: any) {
  redirect(`/dashboard/programs/${req.params.programId}/plans`);
}

export default async function Programs(req: any) {
  await redirectToPrograms(req);
}
