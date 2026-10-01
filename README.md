# dsh-codex-harness

> Codex-style coding agent for [DeepSeek Harness](https://www.deepseek.com/harness/) 0.2.x — terminal, filesystem, planning, web search, and skills, all in one preset.

A DSH **0.2.x** port of [`@shuind/dsh-codex-harness`](https://github.com/shuind/dsh-codex-harness)
`0.2.x`. Brings the Codex coding persona and a **full tool set** matching the built-in
`standard` preset to DSH 0.2.x — declaratively, zero boilerplate.

Drop it into any profile and get a dedicated Codex mode in the Web UI mode selector:

- 🖥️ **Terminal** (bash / pwsh, platform-aware)
- 📁 **Filesystem** read/write + ripgrep search
- 🗺️ **Plan mode** — non-mutating exploration before execution
- 🧹 **Context compaction** — basic + tool-result pruner
- 🌐 **Web search & fetch**
- 🧩 **Skill system** with filesystem skill loader
- ✅ **Goal tracking**, todo, ask-user, present

All settings are **runtime-editable** from the Web UI — no restart required.

## What's new in 0.3.0

Complete rewrite for **DSH 0.2.x** compatibility. The previous `0.2.x` line targeted DSH `0.1.x` and depended on the now-removed `settingsScope` service. This version:

- Uses the new `settings` service (`ctx.settings.markVolatile`)
- Registers the Codex preset **declaratively** via `cordis.patch.yml` (no programmatic `agentPresets.register` needed)
- Ships a complete tool set matching the built-in `standard` preset
- Verified end-to-end: model invocation, persona application, and token accounting all work

## Requirements

| Package | Version |
|---------|---------|
| DSH (`@deepseek-ai/dsh`) | `0.2.0-rc.2` or later |
| Node.js | `>= 18.0.0` (22+ recommended) |

## Installation

### Into an existing DSH profile

```bash
# From your profile directory (e.g. ~/.dsh/profiles/web)
pnpm add @lejvn/dsh-codex-harness
```

Then add the bundle to your profile's `package.json`:

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

### From source (development)

```bash
git clone https://github.com/lejvn/dsh-codex-harness.git
cd dsh-codex-harness

# Link into your DSH profile
cd ~/.dsh/profiles/web   # or your profile directory
pnpm add ../../dsh-codex-harness
```

Add to `dsh.profile.bundles` as shown above.

## Usage

1. Start DSH:

   ```bash
   dsh web
   ```

2. Open the Web UI in your browser.

3. Click the **mode selector** (top toolbar, shows "标准模式" by default).

4. Select **Codex 模式** from the dropdown.

5. Start chatting — the model will respond with the Codex persona applied.

### Headless mode (CLI)

Test the Codex persona directly from the terminal:

```bash
dsh --profile headless --patch ./codex-persona.patch.yml "Your task here"
```

Where `codex-persona.patch.yml` contains:

```yaml
- id: system-prompt
  config:
    personaPrefix: 'You are Codex, a coding agent based on the {{model}} model. Your working directory is {{cwd}}.'
```

## Configuration

All settings are volatile (runtime-modifiable via the Web UI settings panel):

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `persona` | `string` | `You are Codex...` | The persona prefix injected into the system prompt |
| `systemPrompt` | `string` | *(see prompts.js)* | Additional system prompt guidance |
| `terminalToolsEnabled` | `boolean` | `true` | Enable terminal/bash/pwsh tools |
| `patchToolEnabled` | `boolean` | `true` | Enable file patching tool |
| `planToolEnabled` | `boolean` | `true` | Enable planning mode |
| `webSearchEnabled` | `boolean` | `true` | Enable web search tool |
| `fast` | `boolean` | `false` | Fast mode (reduced tool set) |
| `fastModeControlEnabled` | `boolean` | `true` | Allow toggling fast mode at runtime |

## Included tools

The Codex preset includes the same tool set as the built-in `standard` preset:

| Tool | Description |
|------|-------------|
| `dsh-tool-bash` / `dsh-tool-pwsh` | Terminal (platform-dependent) |
| `dsh-tool-fs` | File system read/write |
| `dsh-tool-fs-search` | File and content search (ripgrep) |
| `dsh-tool-jobs` | Background job management |
| `dsh-tool-goal` / `dsh-command-goal` | Goal tracking |
| `dsh-plan-mode` | Plan mode (non-mutating exploration before execution) |
| `dsh-compaction-*` | Context compaction and tool result pruning |
| `dsh-tool-ask-user` | Ask user questions |
| `dsh-tool-todo` | Todo list management |
| `dsh-tool-web` | Web search and fetch |
| `dsh-tool-skill` / `dsh-skill-filesystem` | Skill system |
| `dsh-tool-present` | Result presentation |

## Architecture

```
dsh-codex-harness/
├── cordis.patch.yml    # Declarative preset + tool registration
├── client.js           # Web UI settings panel
├── lib/
│   ├── index.js        # Host entry — settings volatility
│   └── prompts.js      # Default persona and system prompt
├── package.json
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── NOTICE
└── LICENSE
```

### How it works

DSH 0.2.x discovers each bundle's `cordis.patch.yml` automatically. The patch file declares:

1. A **Codex agent preset** using `@deepseek-ai/dsh-agent-preset` as the row plugin
2. The preset's **child plugins** (persona, instructions, tools, planning group, etc.)
3. The **host-side plugin** (`@lejvn/dsh-codex-harness`) for settings management

When DSH boots the profile, it composes all bundle patches in order, then the profile's own `cordis.patch.yml`, then any `--patch` overlays. The Codex preset appears in the mode selector alongside the built-in presets.

## Migration from 0.2.x

If you were using `@shuind/dsh-codex-harness@0.2.21` (DSH 0.1.x):

1. Upgrade DSH to `0.2.0-rc.2` or later
2. Update the plugin: `pnpm add @lejvn/dsh-codex-harness@0.3.0`
3. Remove any old programmatic preset registration code — the preset is now declared in `cordis.patch.yml`
4. If you had custom `settingsScope` calls, update them to `ctx.settings.markVolatile()`

## Credits & provenance

This package is a port, not a from-scratch project. It exists because the
upstream `0.2.x` line was written for DSH `0.1.x` and no longer loads on
DSH `0.2.x`.

| Role | Who |
|------|-----|
| Original plugin — `@shuind/dsh-codex-harness` `0.2.x` (DSH `0.1.x`) | [shuind](https://github.com/shuind) |
| DSH `0.2.x` port and maintainer — `0.3.x` | [lejvn](https://github.com/lejvn) |
| Development environment | TRAE SOLO CN |

The `0.2.x` preset design, Codex persona text, and prompt templates originate
with shuind and are carried forward here. The `0.3.x` line re-implements the
plugin against the DSH `0.2.x` architecture — the `settings` service,
declarative `cordis.patch.yml` preset registration, and the full built-in tool
set. See [NOTICE](./NOTICE) for the attribution terms.

Upstream repository: <https://github.com/shuind/dsh-codex-harness>

### Package name

This port publishes as `@lejvn/dsh-codex-harness`, not under the upstream
`@shuind` scope — that scope belongs to the original author and `0.3.x` is not
their release. The upstream package is untouched: if you want the original DSH
`0.1.x` plugin, install `@shuind/dsh-codex-harness` instead.

## Contributing

Contributions are welcome. Please open an issue or PR on
[GitHub](https://github.com/lejvn/dsh-codex-harness). See
[CONTRIBUTING.md](./CONTRIBUTING.md) for local development and how to send
changes upstream.

## License

[MIT](./LICENSE) — original work © shuind; DSH 0.2.x port © lejvn.
