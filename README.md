# OfficeHQ

A full-stack office-management web application.

- **Front end:** React single-page app (TypeScript) with TanStack Router (file-based routes) and
  TanStack Query, built into `src/main/resources/static`.
- **Back end:** Spring Boot host on an in-memory H2 database (Flyway migrations on boot), with the
  backend split by HTTP method — `GET` reads are Spring MVC `@RestController`s, and
  `POST`/`PUT`/`DELETE` writes are OfficeFloor YAML routes.

## Build and run

```
bin/build              # build the SPA and package one runnable jar
PORT=3000 bin/start    # start the app (serves the SPA + REST on $PORT)
bin/stop               # stop it
```

Readiness: `GET /actuator/health`.

## Tests

End-to-end tests use Playwright (in `e2e/`) and bind to `data-testid`:

```
bin/e2e                # build, start, run the specs in e2e/specs, then stop
```
