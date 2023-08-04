import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';

export default async function Home() {
  const session = await getServerSession(options);
  console.log('aaaa', session);

  return (
    <main className="flex justify-center items-center h-screen w-full">
      <Link href="/dashboard" className="border-2 rounded-xl p-3">
        Go to Dashboard
      </Link>
    </main>
  );
}
