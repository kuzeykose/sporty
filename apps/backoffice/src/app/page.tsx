import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen w-full">
      <Link href="/dashboard" className="border-2 rounded-xl p-3">
        Go to Dashboard
      </Link>
    </main>
  );
}
