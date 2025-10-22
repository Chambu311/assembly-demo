import Link from "next/link";
import { Suspense } from "react";
import PhotoGrid from "./components/photo-grid";


async function Home({ searchParams }: { searchParams: { query?: Promise<string> } }) {
  const query = (await searchParams?.query) || '';
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-black">Unsplash</div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1">
              <form className="flex">
                <input
                  name="query"
                  type="text"
                  defaultValue={query}
                  placeholder="Search free high-res photos"
                  className="flex-1 px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  style={{ display: 'none' }}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PhotoGrid query={query} />
      </main>
    </div>
  );
}

export default function HomePageWrapper({ searchParams }: { searchParams: { query?: Promise<string> } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home searchParams={searchParams} />
    </Suspense>
  );
}