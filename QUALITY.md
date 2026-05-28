# Quality Checks

This repository includes a small validation script to catch common documentation mistakes.

## Run Checks

```bash
node scripts/validate.js
```

## What It Checks

- Markdown relative links point to real files.
- Required root files are present.
- Every starter pack has its expected files.
- Every template category has its own `README.md` guide.
- A few common typo or naming mistakes are not present.

## GitHub Actions

The same validation runs automatically on pushes and pull requests through:

```text
.github/workflows/validate.yml
```
