# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **Provenance.** This is a port of [`@shuind/dsh-codex-harness`](https://github.com/shuind/dsh-codex-harness)
> `0.2.x` (DSH `0.1.x`) by shuind. The `0.3.x` line is maintained by
> [lejvn](https://github.com/lejvn) and was developed with TRAE SOLO CN.
> See [NOTICE](./NOTICE) for attribution terms.

## [0.3.0] — 2026-10-01

### Summary

Port of the `0.2.x` line to **DSH 0.2.x**. This is a breaking release — the
internal API surface changed from DSH 0.1.x (`settingsScope`) to DSH 0.2.x
(`settings`), and the preset is now registered declaratively instead of
programmatically. The `0.2.x` preset design, persona text, and prompt templates
originate with shuind and are carried forward unchanged.

### Added

- Declarative agent preset registration via `cordis.patch.yml`
- Complete tool set matching the built-in `standard` preset:
  - Terminal (bash/pwsh, platform-dependent)
  - File system (read/write/search)
  - Background jobs
  - Goal tracking
  - Plan mode (non-mutating exploration)
  - Context compaction (basic + tool result pruner)
  - User interaction (ask-user, todo)
  - Web search and fetch
  - Skill system
  - Result presentation
- Web UI settings panel component
- Full `peerDependencies` declarations for all DSH tool packages
- README with installation, usage, and migration guide

### Changed

- **Breaking:** package renamed `@shuind/dsh-codex-harness` → `@lejvn/dsh-codex-harness`.
  The `@shuind` scope belongs to the original author, so this port publishes
  under its maintainer's scope. Update `dependencies` and
  `dsh.profile.bundles` accordingly. The upstream `@shuind` package is
  unaffected.
- **Breaking:** `settingsScope` → `settings` service (DSH 0.2.x rename)
- **Breaking:** Preset registration moved from `ctx.agentPresets.register()` (programmatic) to `cordis.patch.yml` (declarative)
- Plugin ID changed from `codex` (0.2.x) to `dsh-codex-harness` to avoid collisions with the built-in `standard` preset's child IDs
- All child plugin IDs prefixed with `codex-` to prevent composition conflicts

### Removed

- Programmatic `ctx.agentPresets.register()` call — replaced by declarative patch
- `settingsScope` dependency — replaced by `settings`
- Old `typert` manifest contributions that caused `result codec has no create() factory` on DSH 0.2.x

### Fixed

- `waiting for service: settingsScope` error on DSH 0.2.x startup
- `typert-loader: result codec has no create() factory` crash when loading the old `0.2.21` plugin on DSH 0.2.x
- Preset not appearing in the mode selector when using a custom profile (fixed by adding to the built-in `web` profile's bundles)

### Verified

- Model invocation works end-to-end (DeepSeek API)
- Codex persona correctly applied (responses prefixed with `[Codex]`)
- Token accounting functional (input, output, cache read, cache write)
- All four built-in presets still available alongside Codex mode

## [0.2.21] — upstream, DSH 0.1.x

*(Upstream release by shuind — targeted DSH `0.1.x`; retained here for
provenance. Not loadable on DSH `0.2.x`.)*

- Programmatic preset registration via `ctx.agentPresets.register()`
- `settingsScope` service for runtime settings
- `typert` manifest for preset editor catalog

---

## Versioning policy

Given the tight coupling with DSH's internal APIs, the major version tracks
DSH compatibility:

| Plugin version | DSH version |
|----------------|-------------|
| `0.2.x` | DSH `0.1.x` |
| `0.3.x` | DSH `0.2.x` |
