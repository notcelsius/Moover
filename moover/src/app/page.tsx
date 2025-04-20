// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <Link href="/login" passHref>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go say “Hi”
        </button>
      </Link>
    </main>
  );
}