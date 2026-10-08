import { createFileRoute } from '@tanstack/react-router';

// The base home page (empty). A page is a file under routes/ — `createFileRoute('<its url>')` —
// with its nav link under features/.
export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return <p data-testid="home-empty">Nothing here yet.</p>;
}
