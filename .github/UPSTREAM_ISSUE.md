# Upstream Issue — DSH 0.2.x compatibility

## One-click issue creation

Click this link to open a pre-filled issue on the upstream repo:

[📋 Open Issue on shuind/dsh-codex-harness](https://github.com/shuind/dsh-codex-harness/issues/new?title=Plugin+fails+to+load+on+DSH+0.2.x+%E2%80%94+settingsScope+service+removed&body=%3C%21--+Please+review+and+adjust+before+submitting.+Thanks%21+--%3E%0A%0A%23%23+Plugin+fails+to+load+on+DSH+0.2.x+%E2%80%94+%60settingsScope%60+service+removed%0A%0A%23%23%23+Summary%0A%0AThe+%600.2.x%60+line+of+this+plugin+targets+DSH+%600.1.x%60+and+no+longer+loads+on+DSH+%600.2.0-rc.2%60+or+later.+The+blocking+issue+is+that+the+%60settingsScope%60+service+was+removed+in+DSH+0.2.x%2C+replaced+by+the+%60settings%60+service+with+a+different+API+(%60ctx.settings.markVolatile%60+vs.+%60ctx.settingsScope%60).%0A%0A%23%23%23+Error%0A%0A%60%60%60%0Adsh%3A+startup+failed%3A+1+required+plugin+did+not+activate%0A++plugin-name-here+(required)%0A++++Error%3A+waiting+for+service%3A+settingsScope%0A%60%60%60%0A%0A%23%23%23+Root+causes%0A%0A1.+**%60settingsScope%60+%E2%86%92+%60settings%60**+%E2%80%94+the+service+was+renamed+and+its+API+changed%0A2.+**Programmatic+preset+registration+no+longer+recommended**+%E2%80%94+DSH+0.2.x+prefers+declarative+preset+registration+via+%60cordis.patch.yml%60%0A3.+**Tool+package+IDs+changed**+%E2%80%94+several+tool+packages+were+reorganized+between+0.1.x+and+0.2.x%0A%0A%23%23%23+Ported+version+(reference)%0A%0AI%27ve+ported+the+plugin+to+DSH+0.2.x+as+%60v0.3.0%60%2C+keeping+the+original+%600.2.x%60+preset+design%2C+persona+text%2C+and+prompt+templates+intact%3A%0A%0A-+**Repository**%3A+https%3A%2F%2Fgithub.com%2Flejvn%2Fdsh-codex-harness%0A-+**Release**%3A+%5B%60v0.3.0%60%5D(https%3A%2F%2Fgithub.com%2Flejvn%2Fdsh-codex-harness%2Freleases%2Ftag%2Fv0.3.0)%0A-+**Package+name**%3A+%60%40lejvn%2Fdsh-codex-harness%60+(scoped%2C+original+is+%60%40shuind%2Fdsh-codex-harness%60)%0A%0A%23%23%23+What+changed+in+the+port%0A%0A-+Preset+is+registered+**declaratively**+via+%60cordis.patch.yml%60+(no+programmatic+%60agentPresets.register%60)%0A-+Uses+the+new+%60settings%60+service+(%60ctx.settings.markVolatile%60)%0A-+Tool+set+updated+to+match+DSH+0.2.x+built-in+%60standard%60+preset%3A%0A++-+Terminal+(bash%2Fpwsh%2C+platform-dependent)%0A++-+Filesystem+read%2Fwrite+%2B+ripgrep+search%0A++-+Background+jobs%2C+goal+tracking%0A++-+Plan+mode+(non-mutating+exploration)%0A++-+Context+compaction+(basic+%2B+tool-result+pruner)%0A++-+Ask-user%2C+todo%2C+present%0A++-+Web+search+%26+fetch%0A++-+Skill+system+with+filesystem+loader%0A-+Web+UI+settings+panel+preserved%0A-+Persona+and+system+prompt+carried+forward+unchanged%0A%0A%23%23%23+Verification%0A%0AEnd-to-end+verified+on+DSH+%600.2.0-rc.2%60%3A%0A%0A-+%E2%9C%85+Preset+appears+in+mode+selector+as+%22Codex+%E6%A8%A1%E5%BC%8F%22%0A-+%E2%9C%85+Model+invocation+works+(tested+with+%60deepseek-reasoner%60)%0A-+%E2%9C%85+Persona+is+correctly+applied%0A-+%E2%9C%85+All+tools+load+without+activation+errors%0A-+%E2%9C%85+Settings+panel+is+accessible+and+settings+are+volatile+(runtime-editable)%0A%0A%23%23%23+Offer%0A%0AIf+you%27d+like+to+upstream+the+0.2.x+compatibility+changes+into+this+repo%2C+I%27m+happy+to+prepare+a+PR.+The+port+preserves+the+original+preset+design+and+persona+%E2%80%94+only+the+wiring+and+tool+IDs+changed+for+the+new+DSH+version.%0A%0ALet+me+know+what+works+best+for+you.)

---

## If you prefer a PR instead

### 1. Fork the upstream repo

Go to https://github.com/shuind/dsh-codex-harness/fork and create a fork under your account.

### 2. Add the fork as a remote and push a feature branch

```bash
cd /path/to/dsh-codex-harness
git remote add fork git@github.com:lejvn/dsh-codex-harness.git
git checkout -b feat/dsh-0.2x-support
git push -u fork feat/dsh-0.2x-support
```

*(Note: the repo is already at lejvn/dsh-codex-harness; if upstream wants a PR, the branch can be pushed from there.)*

### 3. Open the PR

Open https://github.com/shuind/dsh-codex-harness/compare and choose `lejvn:dsh-codex-harness` as the head fork with branch `main` (or `feat/dsh-0.2x-support`).

The PR body template at `.github/PULL_REQUEST_TEMPLATE.md` in the ported repo summarizes the migration.
