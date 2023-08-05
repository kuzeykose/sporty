import { redirect } from 'next/navigation';

async function redirectToPrograms() {
  redirect('/dashboard/programs');
}

export default async function Dashboard() {
  await redirectToPrograms();
}
