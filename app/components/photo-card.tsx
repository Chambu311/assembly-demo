"use client";
import { PexelsPhoto } from "@/types/pexels";
import Link from "next/link";

interface PhotoCardProps {
  photo: PexelsPhoto;
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <Link href={`/photo/${photo.id}`}>
      <article
        style={{
          backgroundImage: `url(${photo.src.medium})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          aspectRatio: `${photo.width} / ${photo.height}`
        }}
        className="group relative overflow-hidden rounded-lg bg-gray-200 w-full cursor-pointer"
      >
        {/* Photo Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">by {photo.photographer}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}