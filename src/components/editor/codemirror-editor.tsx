import { useCallback } from 'react';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import './editor.css';
import { useEditor } from '../editor-context.tsx';
import { useTheme } from '../theme-context.tsx';
import { stepCodeLanguage } from './codemirror/stepcode.language.ts';
import { atomLightTheme } from './codemirror/themes/light.ts';
import { oneDarkTheme } from './codemirror/themes/dark.ts';
import { foldOnIndent } from './codemirror/fold-on-indent.ts';
import { indentUnit, codeFolding } from '@codemirror/language';
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
import { AtomOneLightColors, OneDarkColors } from '../../core/colors/colors.ts';

export function CodemirrorEditor() {
  const { content, setContent } = useEditor();
  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    const matches = value.matchAll(/(->|<-|!=|<=|>=)/g);
    const changes = [];
    for (const match of matches) {
      console.log(match);
      changes.push({
        from: match.index!,
        to: match.index! + match[0].length,
        insert: match[0].replace('<-', `←`).replace('!=', '≠').replace('<=', '≤').replace('>=', '≥').replace('->', '→'),
      })
    }
    if (changes.length === 0) {
      setContent(value);
      return;
    }
    viewUpdate.view.dispatch({
      changes,
    })
  }, []);
  const { theme } = useTheme();
  return <div className={'bg-white dark:bg-oneDarkBlack h-full max-h-full overflow-y-auto'}>
    <CodeMirror
    id={'editor'}
    value={content}
    placeholder={`Empiece a escribir para descartar o no mostrar esto de nuevo.`}
    theme={theme === 'dark' ? oneDarkTheme : atomLightTheme}
    height={'100%'}
    extensions={[
      foldOnIndent(),
      stepCodeLanguage,
      indentUnit.of('    '),
      indentationMarkers({
        thickness: 1,
        colors: {
          dark: OneDarkColors.gutterGrey,
          light: AtomOneLightColors.gutterGrey,
          activeDark: '#727272',
          activeLight: '#727272',
        }
      })
    ]}
    onChange={onChange} /></div>;
}