import { OneDarkColors } from './colors.ts';
import { editor } from 'monaco-editor';
export const darkTheme = {
  base: 'vs-dark', colors: {
    'editor.background': OneDarkColors.black,
    'editor.lineHighlightBackground': OneDarkColors.gutterGrey,
  }, inherit: true,
  rules: [
    { token: 'comment', foreground: OneDarkColors.commentGrey },
    { token: 'keyword.control', foreground: OneDarkColors.magenta, fontStyle: 'bold' },
    { token: 'internal-function', foreground: OneDarkColors.cyan, fontStyle: 'italic' },
    { token: 'keyword.type', foreground: OneDarkColors.lightYellow },
    { token: 'keyword.constant', foreground: OneDarkColors.darkYellow},
    { token: 'keyword.operator', foreground: OneDarkColors.magenta },
    { token: 'number', foreground: OneDarkColors.darkYellow },
    { token: 'string', foreground: OneDarkColors.green },
    { token: 'keyword.parameter', foreground: OneDarkColors.lightRed },
  ]
} as editor.IStandaloneThemeData;