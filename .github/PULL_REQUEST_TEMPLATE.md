## Summary

Ports `@shuind/dsh-codex-harness` to **DSH 0.2.x**.

The `0.2.x` line targets DSH `0.1.x` and fails to load on DSH `0.2.x`:

- `waiting for service: settingsScope` — the `settingsScope` service was
  removed/renamed to `settings` in DSH 0.2.x
- `typert-loader: result codec has no create() factory` — the old `typert`
  manifest contributions are incompatible

This PR rewrites the plugin against the DSH 0.2.x plugin architecture.

## What changed

| Area | Before (`0.2.x`) | After (`0.3.0`) |
|------|------------------|-----------------|
| Settings service | `settingsScope` | `settings` + `ctx.settings.markVolatile()` |
| Preset registration | Programmatic `ctx.agentPresets.register()` | Declarative `cordis.patch.yml` |
| Tool set | Partial | Full — matches the built-in `standard` preset |
| Child plugin IDs | `codex-*` | `codex-*` (kept, to avoid composition collisions) |

## Files

- `cordis.patch.yml` — declarative preset + tool registration (new)
- `lib/index.js` — settings volatility only; preset registration removed
- `lib/prompts.js` — unchanged defaults
- `client.js` — settings panel, slot id updated
- `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `LICENSE` — new

## Verification

Performed on Windows 11, DSH `0.2.0-rc.2`, Node `24.15.0`:

- [x] `node --check` passes on all JS files
- [x] `cordis.patch.yml` parses; 17 child plugins, no duplicate IDs
- [x] All 22 `peerDependencies` resolve
- [x] All 20 packages referenced in the patch resolve
- [x] `npm pack --dry-run` → 8 files, 8.4 kB
- [x] Headless model invocation succeeds (token accounting correct)
- [x] Codex persona applied — responses prefixed with `[Codex]`
- [x] `Codex 模式` appears in the Web UI mode selector and is selectable
- [x] All four built-in presets remain available alongside Codex mode

## Breaking change

This is a breaking release for DSH `0.1.x` users. The versioning policy maps
plugin major versions to DSH versions:

| Plugin | DSH |
|--------|-----|
| `0.2.x` | `0.1.x` |
| `0.3.x` | `0.2.x` |

## Notes for reviewers

- The preset is registered by declaring `@deepseek-ai/dsh-agent-preset` as a row
  plugin in `cordis.patch.yml`, rather than calling the programmatic API. DSH
  0.2.x auto-discovers each bundle's `cordis.patch.yml`.
- Terminal tools are platform-gated with `!!js` expressions, mirroring the
  built-in `standard` preset.
- Child IDs are prefixed `codex-` so the preset can coexist with `standard`
  without ID collisions.

## Provenance

This work is offered back to the upstream project by
[lejvn](https://github.com/lejvn), developed with TRAE SOLO CN.
The `0.2.x` preset design, persona text, and prompt templates remain shuind's.
See `NOTICE` for attribution terms.