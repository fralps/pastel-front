# Pastel Front

Nuxt 4 frontend for a dream journal application: authentication, dream create/edit flows, detailed records, insights, and a bilingual interface (EN/FR).

## Overview

This app lets users:

- create an account, sign in, recover password, and confirm email
- record dreams (type, intensity, context, mood, date, tags)
- edit and delete existing dreams
- view insights (totals by sleep type)
- dictate dream descriptions with the Web Speech API (browser support required)
- switch the UI language between English and French

## Tech Stack

- Nuxt 4 + Vue 3 + TypeScript
- Nuxt UI, Nuxt Image
- Pinia + persisted state (cookies)
- Nuxt i18n (prefix strategy, default locale: `en`)
- Zod for form validation

## Requirements

- Node.js 20+ or recent Bun
- a compatible backend API (see API section below)

## Installation

```bash
bun install
```

## Environment Variables

Create a `.env` file at the project root:

```bash
VITE_APP_API_BASE_URL=http://localhost:3000
VITE_APP_ENV=development
```

Used variables:

- `VITE_APP_API_BASE_URL`: backend base URL
- `VITE_APP_ENV`: if set to `production`, Umami analytics script is injected

## Run Locally

Dev server runs on port `5100`:

```bash
bun run dev
```

Open:

```text
http://localhost:5100
```

## Available Scripts

- `dev`: start local development server
- `build`: production build
- `preview`: preview production build
- `generate`: static generation
- `typecheck`: TypeScript checks
- `lint`: run `oxlint`
- `lint:fix`: auto-fix lint issues
- `format`: run `oxfmt`
- `format:check`: check formatting

Examples:

```bash
bun run build
```

## Project Structure (high-level)

```text
app/
  pages/
    index.vue                  # Landing page
    auth/                      # Sign in/up, password reset, email confirmation
    dashboard/
      index.vue                # Paginated dream list
      insights.vue             # Stats page
      dreams/
        create.vue             # Create dream
        [id].vue               # Dream details
        edit/[id].vue          # Edit dream
  components/
    dashboard/                 # Header, navigation, cards, voice dictation
  middleware/
    auth.ts                    # Dashboard route guard
  stores/
    currentUser.ts             # User state (Pinia)
  plugins/
    customFetch.ts             # HTTP client with token handling + redirects
i18n/
  locales/en.json
  locales/fr.json
```

## Auth and API Behavior

The frontend uses a `customFetch` plugin that:

- applies `baseURL` from `VITE_APP_API_BASE_URL`
- adds `Authorization` from the `token` cookie
- refreshes `token` from the response `Authorization` header
- auto-redirects:
  - `401` to `/auth/sign-in`
  - `404` to `/dashboard`

Backend endpoints used by the frontend:

- Auth
  - `POST /users/sign_in`
  - `DELETE /users/sign_out`
  - `POST /users/sign_up`
  - `POST /users/password`
  - `PUT /users/password`
  - `GET /users/confirmation?confirmation_token=...`
- Dreams
  - `GET /sleeps?page=:page`
  - `POST /sleeps`
  - `GET /sleeps/:id`
  - `PUT /sleeps/:id`
  - `DELETE /sleeps/:id`
- Stats
  - `GET /stats/dashboard_stats`

## Internationalization

- locales: `en`, `fr`
- route strategy: `prefix`
- fallback locale: `en`

Route examples:

- `/en/dashboard`
- `/fr/dashboard`

## Voice Dictation

The dream creation page includes voice dictation (Web Speech API):

- requires a compatible browser (`SpeechRecognition`/`webkitSpeechRecognition`)
- requires microphone permission
- displays an error alert when unsupported

## Build and Deployment

```bash
bun run build
bun run preview
```

Target deployment is a standard Nuxt app (SSR or adapter-based, depending on your infrastructure).

## Quality and Conventions

- Linting: `oxlint`
- Formatting: `oxfmt`
- Form validation: `zod`
- Domain types centralized in `app/models`

## Useful Notes

- Dashboard navigation is mobile-friendly (fixed bottom bar).
- The `auth` middleware protects dashboard routes.
- The project includes a Bun-based helper script: `scripts/dev`.
