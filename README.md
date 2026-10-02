# officehq-tanstack-mixed — base repository (additive React SPA + a MIXED backend)

A **base repository** for the `ui-long-degradation-test` harness — **one technology stack**:
front-end an **additive React SPA** (TanStack Router + TanStack Query + a slot registry), backend
**mixed**: read endpoints (`GET`) are Spring `@RestController`, mutating endpoints
(`POST`/`PUT`/`DELETE`) are OfficeFloor YAML + a logic class. In-memory H2.

**This is a risk probe for gradual adoption, not a model of it.** Every other arm is
architecturally pure. A gradual-adoption story — migrate the endpoints that keep changing, leave
the stable ones alone — necessarily produces a mixed application, in which a developer *and an AI
agent* must hold two backend idioms at once. It is entirely plausible that a mixed app erodes worse
than either pure one: the agent picks the wrong idiom, copies whichever neighbour it read first, or
duplicates a rule across both styles. Nothing measured so far would have shown that, and a product
built on gradual adoption depends on it not being true.

The split is by HTTP method and fixed by `CLAUDE.md`: deterministic, no lookup table for the agent
to remember, a roughly even mix over the ~60 checkpoints, and the orchestration-heavy endpoints on
the OfficeFloor side — where a churn-triggered migration would move things first in practice.

So it answers the **prerequisite** question ("is holding two idioms harmful in itself?"), not the
product question ("does migration-on-churn work?"). Compare it against the two pure arms with the
same front end: `~/officehq-tanstack-officefloor` and `~/officehq-tanstack-spring`. The front end
is byte-identical to both.

Every shared structure here is **generated from the file system** or **addressed by a key**, so a
feature is new files:

| what is added          | the file that is added                  | what is edited |
| ---------------------- | --------------------------------------- | -------------- |
| a page                 | `routes/<path>.tsx`                     | nothing (the route tree is generated) |
| its nav link           | `features/<f>/nav.slot.tsx`             | nothing (the shell lists no pages) |
| a drill-in / detail    | `routes/<section>.$id.tsx`              | nothing (the router decides, not a flag) |
| a panel/column/action  | `features/<f>/<thing>.slot.tsx`         | nothing (the page lists no contents) |
| a filter / sort/ tab   | `features/<f>/<control>.slot.tsx`       | nothing (its state is a URL key) |
| data for any of them   | a `useQuery` key in that file           | nothing (the cache is a keyspace) |

See `CLAUDE.md` for the five rules the agent works to, and `src/main/frontend/slots/Slot.tsx` for
the contribution mechanism. It is the
near-empty starting point (base shell + Spring/OfficeFloor + empty H2, no tables) that the harness
**evolves** into a full application over ~60 English change requests, one full-stack change per
checkpoint.

- Base repos are **home-level sibling directories**, one per stack, named
  `~/officehq-<frontend>-<backend>` so both layers are visible (`~/officehq-react-officefloor`,
  `~/officehq-<frontend>-<backend>`, …) — the **front-end and the backend may both vary** between
  stacks. The study compares stacks by running the harness against each in turn — which stack best
  resists erosion.
- The harness (`~/ui-long-degradation-test`, `config.yaml → app.repo`) reads this folder at branch
  **`base-empty`**, worktrees it onto `evolve/<run_id>/<condition>/chain<n>`, and commits each
  checkpoint there. This branch is only ever read.
- It honours the **App contract** — see `~/ui-long-degradation-test/docs/SUT_CONTRACT.md`.
- **Try another stack:** create a new sibling `~/officehq-<frontend>-<backend>` (different
  front-end, different backend, or both), satisfy the same `BASE_CHECKLIST.md`, and point
  `app.repo` at it. Each is its own run.

**Status: green.** `bin/build` produces the one jar and `bin/e2e` verified the shell against the
real jar. The pom carries **both** idioms (the OfficeFloor starter and Spring MVC), so the mix is a
rules change in `CLAUDE.md` rather than a dependency change, and the front end is byte-identical to
the two pure arms.
