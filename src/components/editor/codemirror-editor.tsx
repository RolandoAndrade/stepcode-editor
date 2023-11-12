import { useCallback } from 'react';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import './editor.css';
import { useEditor } from '../editor-context.tsx';
import { useTheme } from '../theme-context.tsx';
import { stepCodeLanguage } from './codemirror/stepcode.language.ts';
import { atomLightTheme } from './codemirror/themes/light.ts';
import { oneDarkTheme } from './codemirror/themes/dark.ts';
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
  return <div className={'bg-white dark:bg-oneDarkBlack h-full max-h-full overflow-y-auto'}><CodeMirror
    id={'editor'}
    value={content}
    theme={theme === 'dark' ? oneDarkTheme : atomLightTheme}
    height={'100%'}
    extensions={[
      stepCodeLanguage
    ]}
    onChange={onChange} /></div>;
}