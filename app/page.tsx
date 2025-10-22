
import PhotoGrid from "./components/photo-grid";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams)?.query || '';
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PhotoGrid query={query} />
    </main>
  );
}
