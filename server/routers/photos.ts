import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { PexelsPhoto } from '@/types/pexels';

export const photosRouter = router({
  getPhotos: publicProcedure
    .input(
      z.object({
        cursor: z.number().optional(),
        limit: z.number().optional().default(20),
        query: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { cursor = 1, limit, query } = input;
      
      try {
        // Use search endpoint if query is provided, otherwise use curated
        const endpoint = query 
          ? `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${cursor}&per_page=${limit}`
          : `https://api.pexels.com/v1/curated?page=${cursor}&per_page=${limit}`;

        const response = await fetch(endpoint, {
          headers: {
            Authorization: process.env.PEXELS_API_KEY as string,
          },
        });

        if (!response.ok) {
          throw new Error(`Pexels API error: ${response.status}`);
        }

        const data = await response.json();
        return {
          photos: data.photos as PexelsPhoto[],
          totalResults: data.total_results,
          page: data.page,
          perPage: data.per_page,
          nextPage: data.next_page,
          prevPage: data.prev_page,
          nextCursor: data.next_page ? data.page + 1 : undefined,
        };
      } catch (error) {
        console.error('Error fetching photos:', error);
        throw new Error('Failed to fetch photos');
      }
    }),

  getPhoto: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const { id } = input;
      
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/photos/${id}`,
          {
            headers: {
              Authorization: process.env.PEXELS_API_KEY as string,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Pexels API error: ${response.status}`);
        }

        const data = await response.json();
        return data as PexelsPhoto;
      } catch (error) {
        console.error('Error fetching photo:', error);
        throw new Error('Failed to fetch photo');
      }
    }),
});
