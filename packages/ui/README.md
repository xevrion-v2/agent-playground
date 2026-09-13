# UI Package

Shared UI components used by the web app.

## Entry point

`src/index.ts` — re-exports all public components.

## Components

### Button

A reusable button component with the following props (see `src/button.tsx` for full type annotations):

| Prop      | Type                         | Default    |
| --------- | ---------------------------- | ---------- |
| `variant` | `'primary' \| 'secondary'`  | `primary`  |
| `size`    | `'sm' \| 'md' \| 'lg'`      | `md`       |
| `onClick` | `() => void`                 | —          |

## Scripts

| Script  | Description                   |
| ------- | ----------------------------- |
| `build` | Build the package             |
| `lint`  | Run ESLint on package source  |
