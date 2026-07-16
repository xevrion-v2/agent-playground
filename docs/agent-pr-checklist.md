# AI Agent Pull Request Checklist

Before opening a pull request, verify each item below.

## Format

- [ ] Title starts with `[agent]` prefix
- [ ] Issue number referenced in the body (`Closes #NNNN` or `Fixes #NNNN`)

## Quality

- [ ] Changes follow existing code style and conventions
- [ ] No debug logs, TODOs, or commented-out code remain
- [ ] New files include appropriate license header if applicable

## Documentation

- [ ] README or docs updated if the change affects public APIs
- [ ] New env vars documented in `.env.example` or equivalent

## Testing

- [ ] Existing tests pass (`pnpm test`)
- [ ] For bug fixes: a test case reproduces the issue
- [ ] For new features: basic coverage added
