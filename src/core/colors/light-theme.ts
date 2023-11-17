import { AtomOneLightColors } from './colors.ts';
import { editor } from 'monaco-editor';

export const lightTheme = {
  base: 'vs', colors: {
    'editor.background': AtomOneLightColors.white,
    'editor.lineHighlightBackground': AtomOneLightColors.gutterGrey,
  }, inherit: true,
  rules: [
    { token: 'comment', foreground: AtomOneLightColors.commentGrey },
    { token: 'keyword.control', foreground: AtomOneLightColors.magenta, fontStyle: 'bold' },
    { token: 'internal-function', foreground: AtomOneLightColors.cyan, fontStyle: 'italic' },
    { token: 'keyword.type', foreground: AtomOneLightColors.lightYellow },
    { token: 'keyword.constant', foreground: AtomOneLightColors.darkYellow},
    { token: 'keyword.operator', foreground: AtomOneLightColors.magenta },
    { token: 'number', foreground: AtomOneLightColors.darkYellow },
    { token: 'string', foreground: AtomOneLightColors.green },
    { token: 'keyword.parameter', foreground: AtomOneLightColors.lightRed, fontStyle: 'bold' },
  ]
} as editor.IStandaloneThemeData;