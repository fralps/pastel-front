# AGENTS Guide - pastel-front

Purpose

- This file defines how AI coding agents should work in this repository.
- Follow these rules for all code changes, reviews, and generated files.

Project context

- Stack: Nuxt 4, Vue 3, TypeScript, Nuxt UI, Pinia, Nuxt i18n, Zod.
- Package manager: Bun first.
- Frontend consumes a backend API via a shared custom fetch plugin.

Core principles

- Prefer small, focused changes over large refactors.
- Preserve existing architecture, naming, and folder conventions.
- Keep components readable and composables reusable.
- Favor explicit typing and predictable state flows.
- Do not introduce new dependencies unless clearly justified.

Commands and tooling

- Install dependencies with: bun install
- Run dev server with: bun run dev
- Build with: bun run build
- Preview with: bun run preview
- Typecheck with: bun run typecheck
- Lint with: bun run lint
- Format with: bun run format

Nuxt 4 best practices

- Use script setup with TypeScript in Vue SFC files.
- Keep route logic in pages; move reusable business logic to composables.
- Use definePageMeta for route middleware and page-level metadata.
- Use useSeoMeta for page SEO metadata.
- Keep plugin behavior centralized. Reuse app/plugins/customFetch.ts for HTTP calls.
- Prefer Nuxt auto-imported utilities instead of manual imports when appropriate.
- Respect existing app layout split:
  - auth pages use auth layout
  - app pages use dashboard layout

Vue 3 best practices

- Prefer computed for derived values, avoid duplicating source state.
- Keep watchers minimal and purposeful.
- Use refs for primitives and reactive for object state when it improves clarity.
- Avoid deeply nested template logic; extract into computed values or small components.
- Keep emits and props typed.
- Handle async UI states explicitly: loading, success, error.

TypeScript rules

- Avoid any unless there is no practical alternative.
- Reuse domain models from app/models whenever possible.
- Keep API payloads and response shapes typed.
- Add narrow helper types close to usage when they are feature-specific.

Data fetching and API conventions

- Prefer useCustomFetch or injected customFetch through Nuxt app context.
- Do not create ad-hoc fetch wrappers if existing abstraction fits.
- Assume auth token is handled by custom fetch plugin.
- Keep API error handling user-friendly with toasts or redirects consistent with current app behavior.

State management conventions

- Use Pinia stores for shared cross-page state only.
- Keep store state minimal and serializable.
- Do not duplicate store state inside components unless needed for local form editing.
- Respect persisted-state behavior already configured.

Forms and validation

- Use Nuxt UI form components.
- Validate with Zod schemas near form code.
- Keep validation messages translatable through i18n keys.
- Ensure submit handlers guard loading states and show feedback to users.

Internationalization

- All user-facing strings must be translatable.
- Add new strings to both locale files:
  - i18n/locales/en.json
  - i18n/locales/fr.json
- Keep translation key naming consistent with existing structure.
- Respect locale-aware routes and existing i18n strategy.

UI and UX consistency

- Reuse Nuxt UI components and existing visual patterns.
- Maintain responsive behavior, especially mobile dashboard navigation.
- Keep accessibility basics: labels, semantic elements, and visible feedback.
- Avoid introducing inconsistent design patterns for one-off screens.

File and architecture conventions

- Pages belong in app/pages by route responsibility.
- Reusable logic belongs in app/composables.
- Reusable UI belongs in app/components.
- Constants should live in app/constants.
- Do not move files across layers unless explicitly requested.

Editing and review behavior for agents

- Read relevant files before editing.
- If uncertain, choose the least risky implementation path.
- Do not rewrite unrelated code.
- Keep comments concise and useful.
- When performing reviews, prioritize bugs, regressions, and missing tests over style.

Quality gate before finishing

- Run typecheck after significant TypeScript changes.
- Run lint for touched files or full project when practical.
- Run build in order to be sure that application code is correct.
- Ensure new i18n keys exist in both English and French locales.
- Verify no broken imports and no obvious runtime errors from changed code paths.

What to avoid

- Do not introduce npm commands in documentation or instructions.
- Do not bypass shared API abstractions.
- Do not hardcode untranslated user-visible strings.
- Do not add large refactors without explicit request.
