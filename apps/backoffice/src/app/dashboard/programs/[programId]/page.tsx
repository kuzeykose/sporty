import { redirect } from 'next/navigation';

async function redirectToPrograms(req: any) {
  redirect(`/dashboard/programs/${req.params.programId}/dashboard`);
}

export default async function Programs(req: any) {
  await redirectToPrograms(req);
}
