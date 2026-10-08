import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { AppNav } from '../slots/defs/appNav';

// The shell. It renders the nav region (filled from app.nav) and the matched route's component
// (from routes/); it reads no page list and holds no view state — URL search params carry what is
// open or filtered.
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // Search params are an open namespace, declared once here and inherited by every route: a key is
  // used by reading/writing it (url/useSearchParam), with no per-key schema.
  validateSearch: (search: Record<string, unknown>) => search,
  component: AppShell,
});

function AppShell() {
  return (
    <div data-testid="app-root">
      <nav data-testid="app-nav">
        <AppNav.Slot />
      </nav>
      <main data-testid="app-home">
        <Outlet />
      </main>
    </div>
  );
}
