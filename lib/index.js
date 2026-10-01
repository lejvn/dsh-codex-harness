/*
 * Host-side entry for the Codex preset.
 *
 * Ported from @shuind/dsh-codex-harness 0.2.x (DSH 0.1.x) to DSH 0.2.x by
 * lejvn — https://github.com/lejvn/dsh-codex-harness
 * Developed with TRAE SOLO CN. See NOTICE for attribution terms.
 */

import z from "@deepseek-ai/schemastery";
import { DEFAULT_CODEX_SYSTEM_PROMPT, DEFAULT_CODEX_PERSONA } from "./prompts.js";

export const name = "dsh-codex-harness";

export const inject = ["settings"];

export const Config = z.object({
  persona: z.string().default(DEFAULT_CODEX_PERSONA),
  systemPrompt: z.string().default(DEFAULT_CODEX_SYSTEM_PROMPT),
  terminalToolsEnabled: z.boolean().default(true),
  patchToolEnabled: z.boolean().default(true),
  planToolEnabled: z.boolean().default(true),
  webSearchEnabled: z.boolean().default(true),
  fast: z.boolean().default(false),
  fastModeControlEnabled: z.boolean().default(true),
});

export function apply(ctx, config) {
  if (ctx.settings?.markVolatile) {
    const fields = [
      "persona",
      "systemPrompt",
      "terminalToolsEnabled",
      "patchToolEnabled",
      "planToolEnabled",
      "webSearchEnabled",
      "fast",
      "fastModeControlEnabled",
    ];
    fields.forEach((f) => {
      try {
        ctx.settings.markVolatile(f);
      } catch (_) {
        /* field not registered — skip */
      }
    });
  }
}

export default { name, inject, Config, apply };
