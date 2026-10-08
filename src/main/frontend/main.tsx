import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
// Side-effect import: finds every features/**/*.slot.tsx and registers it. Must run before render.
import './slots/discover';
import { queryClient } from './query/queryClient';

// The app's wiring: the router (its tree is generated from routes/) and the query cache (its keys
// are an open namespace). Routes live under routes/; a feature's files live under features/.
const router = createRouter({ routeTree, context: { queryClient } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
