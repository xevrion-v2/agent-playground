# Local Development

TaskFlow expects Node.js 20 or newer, as declared in the root `package.json`.

## Install Dependencies

```bash
npm install
```

## Root Workspace Commands

```bash
npm run dev
npm run test
npm run lint
npm run format
```

The root scripts delegate to workspaces with `--workspaces --if-present`.

## Package Commands

```bash
npm run dev --workspace @taskflow/api
npm run test --workspace @taskflow/api
npm run lint --workspace @taskflow/api

npm run dev --workspace @taskflow/web
npm run test --workspace @taskflow/web
npm run lint --workspace @taskflow/web

npm run test --workspace @taskflow/db
npm run lint --workspace @taskflow/db

npm run test --workspace @taskflow/ui
npm run lint --workspace @taskflow/ui
```

Some workspace test and lint commands are placeholders until package-specific checks are added.
