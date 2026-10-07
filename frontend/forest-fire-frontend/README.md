# Forest Fire Early Warning & Ranger Dispatch Coordination Platform — Frontend

A React + Vite + Tailwind frontend for the existing Spring Boot backend. This project
**does not** create, mock, or replace any backend API — every screen calls the real
endpoints listed in the spec, served from `http://localhost:8080` by default.

## Prerequisites

- Node.js 18+ and npm
- Your Spring Boot backend running locally on port 8080 (or update `.env`)

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` and proxies all API calls directly to the
backend base URL configured in `.env` (`VITE_API_BASE_URL`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  api/            One service file per resource (sectorApi, sensorApi, ...),
                   all built on a single shared Axios client (api/client.js).
  components/
    layout/        Sidebar, Header, page Layout (with mobile menu)
    ui/             Reusable Card, Badge, Modal, DataTable, StatCard,
                     ProgressBar, LoadingState, ErrorState, EmptyState, Button
  context/         Toast notification provider (success/error/info)
  hooks/           useApi — generic fetch hook (loading/error/refresh)
  pages/           One page per sidebar module, plus pages/Reports/ for the
                   three report tabs (Budget Report, Profit & Loss, Balance Sheet)
```

## Notes on business logic

- The **fire alarm rule** (temperature > 45 AND smoke level > 50 → alarm created)
  lives entirely in the backend. The Telemetry page only displays a warning banner
  and visually flags dangerous readings; it never creates alarms itself.
- The **payment → vendor bill PAID** rule is also backend-only. Completing a
  payment simply triggers a refresh of Payments, Vendor Bills, and (if you're on
  it) the Dashboard — no status is set from the frontend.
- If any API call fails (including the backend being offline), the affected
  section shows a friendly inline error with a Retry button instead of crashing
  the page.

## Configuration

Change the backend URL by editing `.env`:

```
VITE_API_BASE_URL=http://localhost:8080
```
