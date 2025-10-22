"use client";

import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PhotoPage() {
  const params = useParams();
  const photoId = Number(params.id);

  const { data: photo, isLoading, error } = trpc.photos.getPhoto.useQuery({ id: photoId });

  if (isLoading) {
    return (
      <main className="flex items-center justify-center py-20">
        <div className="flex items-center space-x-3 text-black">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          <span className="text-lg font-medium">Loading photo...</span>
        </div>
      </main>
    );
  }

  if (error || !photo) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="text-black mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-black mb-2">Photo not found</h3>
          <p className="text-black mb-6">The photo you're looking for doesn't exist or has been removed.</p>
          <Link href="/" className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Photo Container */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          {/* Photographer Info */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                {photo.photographer.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-black">{photo.photographer}</h3>
                <a
                  href={photo.photographer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-black hover:underline"
                >
                  View profile
                </a>
              </div>
            </div>
              <a
                href={photo.src.original}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download
              </a>
          </div>

          {/* Photo */}
          <div className="relative bg-gray-900 flex items-center justify-center">
            <img
              src={photo.src.large2x}
              alt={photo.alt || 'Photo'}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>

          {/* Photo Details */}
          <div className="p-6 space-y-6">
            {/* Description */}
            {photo.alt && photo.alt.trim() && (
              <div>
                <h4 className="text-sm font-semibold text-black uppercase mb-2">Description</h4>
                <p className="text-black text-lg">{photo.alt}</p>
              </div>
            )}

            {/* Photo Information */}
            {(photo.width && photo.height) && (
              <div className={photo.alt && photo.alt.trim() ? "pt-4 border-t border-gray-200" : ""}>
                <h4 className="text-sm font-semibold text-black uppercase mb-4">Photo Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs font-medium text-black uppercase">Dimensions</p>
                    </div>
                    <p className="text-lg font-semibold text-black">{photo.width} x {photo.height}</p>
                  </div>
                  {photo.photographer && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs font-medium text-black uppercase">Photographer</p>
                      </div>
                      <p className="text-lg font-semibold text-black">{photo.photographer}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Source Link */}
            {photo.url && (
              <div className="pt-4 border-t border-gray-200">
                <a
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:underline text-sm"
                >
                  View on Pexels →
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-black hover:underline transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Gallery
          </Link>
        </div>
      </main>
  );
}
