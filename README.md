# FaceTrack

A local-first Vue PWA for following skincare treatment programs as a daily checklist and weekly calendar.

## Run locally with Docker

```bash
docker compose up --build
```

Open `http://localhost:4173`. The container builds the Vue app and serves the production output through nginx. For development with local Node, use `npm install && npm run dev`.

The generated `dist/` works on Cloudflare Pages. The included GitHub workflow deploys project pages from `main`.

## Prescription YAML format

Plans live in `prescriptions/*.yaml` and can also be imported in the app. `schema_version` allows future migrations. `program` contains display metadata and safety context. Each `schedule` entry applies a group of ordered `steps` to one or more days.

- `period`: `morning` or `evening` (custom values also work)
- `time`: local reminder time in `HH:mm`
- `days`: `daily`, or any combination of `mon` … `sun`
- `steps[].id`: stable identifier used for persisted checkmarks; do not change it after a plan starts
- `steps[].name`: product or action shown in the checklist
- `steps[].instruction`: short usage instruction
- `steps[].kind`: visual category such as `cleanser`, `treatment`, `active`, `recovery`, or `protection`
- `reminders`: optional notification definitions using the same day syntax

See [`prescriptions/template1.yaml`](prescriptions/template1.yaml) for a complete example. Imported plans and checkmarks stay in browser storage; there is no account or server sync.

## Notifications

The app can request browser notification permission and confirm that notifications work. Reliable scheduled background reminders require Web Push plus a server-side scheduler; a static PWA cannot guarantee alarms after the browser is fully closed, especially on iOS. Install the PWA to the Home Screen for the best browser support.

## Safety

FaceTrack tracks a plan; it does not prescribe treatment. The bundled example was carried over from an earlier user discussion and should be reviewed by a qualified clinician.
