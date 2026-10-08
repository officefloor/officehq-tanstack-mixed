# OfficeFloor REST wiring

Domain REST endpoints are declared here as OfficeFloor YAML, served by the
`officefloor-rest-spring-boot-4-starter` inside the Spring Boot host. Put them under `rest/api/` so
their paths start with `/api/` — `SpaConfig` only lets `/api/*` reach the backend; a non-`/api/`
path returns the SPA's `index.html` instead of your endpoint. Directory nesting maps to path
segments, so `rest/api/owners.GET.yml` → `GET /api/owners`. Each route is its own file:

```
# officefloor/rest/api/<path>.GET.yml   (or .POST.yml, {param}.GET.yml, ...)
service:
  class: net.officefloor.hq.app.<SomeLogic>   # a class with a service(...) method
```

The logic class's `service(...)` method takes injected dependencies (Spring `@Service` beans, the
data layer) and a `net.officefloor.web.ObjectResponse<T>` to send the response.

(The `/__test__` seed endpoint and the `/actuator/health` readiness endpoint are Spring-side — a
`@RestController` and Actuator — not OfficeFloor routes.)
