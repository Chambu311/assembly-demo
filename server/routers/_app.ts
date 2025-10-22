import { router } from '../trpc';
import { photosRouter } from './photos';

export const appRouter = router({
  photos: photosRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
