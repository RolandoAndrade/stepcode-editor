import { tags as t } from '@lezer/highlight';
import { createTheme } from '@uiw/codemirror-themes';

export const atomLightTheme = createTheme({
  theme: 'light',
  settings: {
    background: '#ffffff',
    foreground: '#383a42',
    caret: '#000000',
    selection: '#c8c8c8',
    selectionMatch: '#c8c8c8',
    lineHighlight: 'rgba(234,234,234,0.4)',
    gutterBackground: '#ffffff',
    gutterForeground: '#8a8a8a',
  },
  styles: [
    { tag: t.comment, color: '#a0a1a7' },
    { tag: t.variableName, color: '#e45649' },
    { tag: [t.string, t.special(t.brace)], color: '#50a14f' },
    { tag: t.number, color: '#986801' },
    { tag: t.bool, color: '#986801' },
    { tag: t.null, color: '#986801' },
    { tag: t.keyword, color: '#a626a4', fontWeight: 'bold' },
    { tag: t.operator, color: '#383a42' },
    { tag: t.className, color: '#e45649' },
    { tag: t.definition(t.typeName), color: '#e45649' },
    { tag: t.typeName, color: '#e45649' },
    { tag: t.angleBracket, color: '#383a42' },
    { tag: t.tagName, color: '#e45649' },
    { tag: t.attributeName, color: '#e45649' },
  ],
});