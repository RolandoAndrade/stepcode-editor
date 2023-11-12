import { useCallback, useRef } from 'react';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import './editor.css';
import { useEditor } from '../editor-context.tsx';
import { useTheme } from '../theme-context.tsx';
import { stepCodeLanguage } from './codemirror/stepcode.language.ts';
import { atomLightTheme } from './codemirror/themes/light.ts';
import { oneDarkTheme } from './codemirror/themes/dark.ts';
export function CodemirrorEditor() {

  const editorRef = useRef<typeof CodeMirror>(null);
  const { content, setContent } = useEditor();
  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    const newValue = value?.replace('<-', `←`)?.replace('!=', '≠')?.replace('<=', '≤')?.replace('>=', '≥')?.replace('->', '→');
    if (value !== newValue) {
      const newPosition = viewUpdate.state.selection.main.head + 1;


      /*setTimeout(() => {
        viewUpdate.view.dispatch({
          selection: {
            anchor: newPosition,
            head: newPosition,
          }
        })
      },10)*/
    }
    setContent(newValue);
  }, []);
  const { theme } = useTheme();
  return <CodeMirror
    id={'editor'}
    ref={editorRef}
    value={content}
    theme={theme === 'dark' ? oneDarkTheme : atomLightTheme}
    height="100%"
    extensions={[
      stepCodeLanguage
    ]}
    onChange={onChange} />;
}