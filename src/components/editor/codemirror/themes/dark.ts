import { tags as t } from '@lezer/highlight';
import { createTheme } from '@uiw/codemirror-themes';

export const oneDarkTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#282c34',
    foreground: '#abb2bf',
    caret: '#e06c75',
    selection: '#3e4451',
    selectionMatch: '#3e4451',
    lineHighlight: '#3e4451',
    gutterBackground: '#282c34',
    gutterForeground: '#5c6370',
  },
  styles: [
    { tag: t.comment, color: '#5c6370' },
    { tag: t.variableName, color: '#61afef' },
    { tag: [t.string, t.special(t.brace)], color: '#98c379' },
    { tag: t.number, color: '#d19a66' },
    { tag: t.bool, color: '#d19a66' },
    { tag: t.null, color: '#d19a66' },
    { tag: t.keyword, color: '#c678dd' },
    { tag: t.operator, color: '#56b6c2' },
    { tag: t.className, color: '#e5c07b' },
    { tag: t.brace, color: '#e5c07b' },
    { tag: t.definition(t.typeName), color: '#e5c07b' },
    { tag: t.typeName, color: '#e5c07b' },
    { tag: t.angleBracket, color: '#56b6c2' },
    { tag: t.tagName, color: '#e06c75' },
    { tag: t.attributeName, color: '#61afef' },
  ],
});