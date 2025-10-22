import PhotoSearch from "./components/photo-search";
import "./globals.css";
import { Providers } from "./providers";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
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
                    <PhotoSearch />
                  </div>
                </div>
              </div>
            </header>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
