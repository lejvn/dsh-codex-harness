/*
 * Web UI settings panel for the Codex preset.
 *
 * Ported from @shuind/dsh-codex-harness 0.2.x (DSH 0.1.x) to DSH 0.2.x by
 * lejvn — https://github.com/lejvn/dsh-codex-harness
 * Developed with TRAE SOLO CN. See NOTICE for attribution terms.
 */

window.__ModuleLoader__.load({
  id: '@lejvn/dsh-codex-harness',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    function CodexSettingsPanel() {
      return h('div', {
        style: {
          padding: '16px',
          borderRadius: '8px',
          background: 'var(--color-bg-secondary)',
          marginBottom: '16px',
        },
      },
        h('h3', { style: { margin: '0 0 8px 0' } }, 'Codex 模式'),
        h('p', {
          style: {
            margin: '0 0 12px 0',
            color: 'var(--color-text-secondary)',
            fontSize: '14px',
          },
        }, 'Codex 风格的编码模式，提供更简洁高效的编码工作流。'),
        h('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
          h('span', {
            style: {
              padding: '2px 8px',
              borderRadius: '4px',
              background: 'var(--color-accent-bg)',
              color: 'var(--color-accent-text)',
              fontSize: '12px',
            },
          }, '自定义提示词'),
          h('span', {
            style: {
              padding: '2px 8px',
              borderRadius: '4px',
              background: 'var(--color-accent-bg)',
              color: 'var(--color-accent-text)',
              fontSize: '12px',
            },
          }, 'Persona 设置'),
          h('span', {
            style: {
              padding: '2px 8px',
              borderRadius: '4px',
              background: 'var(--color-accent-bg)',
              color: 'var(--color-accent-text)',
              fontSize: '12px',
            },
          }, '工具开关'),
        ),
      );
    }

    return {
      inject: ['settingsSchema', 'slots'],
      apply(ctx) {
        ctx.effect(() => {
          ctx.slots.inject('settings.plugin.dsh-codex-harness', () =>
            ctx.slots.register({
              name: 'settings.plugin.dsh-codex-harness',
              id: 'codex-harness-settings',
              order: 10,
            }, CodexSettingsPanel),
          );
        }, 'codex-harness.settingsPanel');
      },
    };
  },
});
