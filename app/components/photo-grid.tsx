'use client';

import { trpc } from "@/utils/trpc";
import { useEffect, useRef, useState } from "react";
import { PexelsPhoto } from "@/types/pexels";
import PhotoCard from "./photo-card";

interface PhotoGridProps {
  query?: string;
}

export default function PhotoGrid({ query }: PhotoGridProps) {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error, fetchNextPage, hasNextPage } = trpc.photos.getPhotos.useInfiniteQuery(
    {
      limit: 20,
      query: query || undefined,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  // Update photos when data changes
  useEffect(() => {
    if (data) {
      const allPhotos = data.pages.flatMap(page => page.photos);
      // Remove duplicates based on photo ID
      const uniquePhotos = allPhotos.filter((photo, index, self) => 
        index === self.findIndex(p => p.id === photo.id)
      );
      setPhotos(uniquePhotos);
    }
  }, [data]);


  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isLoading]);

  if (isLoading && photos.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, columnIndex) => (
          <div key={columnIndex} className="grid gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg animate-pulse h-48">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load photos</h3>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data?.pages.flatMap(page => page.photos) || data.pages.flatMap(page => page.photos).length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No photos found</h3>
        <p className="text-gray-600">Try refreshing the page or check back later.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, columnIndex) => (
          <div key={columnIndex} className="grid gap-4">
            {photos
              .filter((_, index) => index % 4 === columnIndex)
              .map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
          </div>
        ))}
      </div>
      
      {/* Load More Trigger */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isLoading ? (
            <div className="flex items-center space-x-3 text-gray-600">
              <div className="w-6 h-6 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Loading more photos...</span>
            </div>
          ) : (
            <div className="text-gray-500 text-sm">Scroll to load more photos</div>
          )}
        </div>
      )}
    </>
  );
}
