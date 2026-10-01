# Contributing

Thanks for your interest in `dsh-codex-harness`. This document covers both
local development and how to contribute back to the upstream project.

Maintained by [lejvn](https://github.com/lejvn). Original `0.2.x`
plugin by [shuind](https://github.com/shuind).

## Local development

### Prerequisites

- Node.js `>= 18` (22+ recommended)
- A working DSH 0.2.x installation
- `pnpm` (via `corepack enable pnpm`)

### Set up

```bash
git clone https://github.com/lejvn/dsh-codex-harness.git
cd dsh-codex-harness
```

Link the package into a DSH profile so DSH picks up your edits live:

```bash
# Adjust to your DSH profile location
cd ~/.dsh/profiles/web
pnpm add ../../dsh-codex-harness
```

Make sure the bundle is listed in the profile's `package.json`:

```json
{
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "@lejvn/dsh-codex-harness"
      ]
    }
  }
}
```

### Verify a change

Three layers of verification, cheapest first:

```bash
# 1. Syntax
node --check lib/index.js
node --check client.js

# 2. Package contents
npm pack --dry-run

# 3. End-to-end — headless model invocation
dsh --profile headless --json "Reply with exactly: OK"
```

For persona changes, test with a patch overlay:

```bash
dsh --profile headless --patch ./codex-persona.patch.yml "Identify yourself."
```

Then confirm the mode appears in the Web UI:

```bash
dsh web
# Click the mode selector → expect "Codex 模式" in the list
```

### Project layout

| Path | Purpose |
|------|---------|
| `cordis.patch.yml` | Declarative preset + tool registration. **Most changes live here.** |
| `lib/index.js` | Host entry — settings volatility |
| `lib/prompts.js` | Default persona and system prompt |
| `client.js` | Web UI settings panel |

### Guidelines

- Keep child plugin IDs prefixed with `codex-` to avoid colliding with the
  built-in `standard` preset's IDs during composition.
- Do not hard-code absolute paths — the patch file supports `!!js` expressions
  for platform detection.
- Test on both Windows and POSIX if you touch terminal tool wiring.
- Update `CHANGELOG.md` under an `Unreleased` heading.

## Contributing upstream

This package tracks the upstream `@shuind/dsh-codex-harness` project. The `0.3.x`
line exists because the upstream `0.2.x` line targets DSH `0.1.x` and no longer
loads on DSH `0.2.x`.

### Syncing with upstream

Add the upstream remote once:

```bash
git remote add upstream https://github.com/shuind/dsh-codex-harness.git
git fetch upstream
```

Then merge or rebase upstream changes into your branch:

```bash
git checkout main
git merge upstream/main
```

### Opening an upstream PR

When the upstream project adopts DSH 0.2.x, propose this work as a PR:

```bash
git checkout -b feat/dsh-0.2x-support
git push -u origin feat/dsh-0.2x-support
gh pr create --repo shuind/dsh-codex-harness \
  --title "feat: DSH 0.2.x compatibility" \
  --body-file .github/PULL_REQUEST_TEMPLATE.md
```

The PR body template at `.github/PULL_REQUEST_TEMPLATE.md` summarizes the
migration so a maintainer can review it without reverse-engineering the diff.

### Reporting upstream

If the upstream package is simply broken on DSH 0.2.x, open an issue first:

```bash
gh issue create --repo shuind/dsh-codex-harness \
  --title "Plugin fails to load on DSH 0.2.x (settingsScope removed)" \
  --body "See CHANGELOG.md 0.3.0 for the root cause and a working port."
```

## License

By contributing, you agree that your contributions are licensed under the
[MIT License](./LICENSE).