import { useCallback } from 'react';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import './editor.css';
import { useEditor } from '../editor-context.tsx';
import { useTheme } from '../theme-context.tsx';
import {
  syntaxHighlighting,
  defaultHighlightStyle,
  indentOnInput,
} from "@codemirror/language";
import {
  drawSelection,
  EditorView,
  highlightActiveLine,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  highlightActiveLineGutter,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { getTokens, stepCodeLanguage } from './codemirror/stepcode.language.ts';
export function CodemirrorEditor() {
  const { content, setContent } = useEditor();
  const onChange = useCallback((newContent: string, viewUpdate: ViewUpdate) => {
    setContent(newContent);
  }, []);
  const { theme } = useTheme();
  return <CodeMirror
    id={'editor'}
    value={content}
    theme={theme === 'dark' ? 'dark' : 'light'}
    height="100%"
    extensions={[
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      drawSelection(),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle),
      highlightActiveLine(),
      highlightSelectionMatches(),
      keymap.of([...defaultKeymap, ...searchKeymap, ...historyKeymap]),
      stepCodeLanguage,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          console.log("document has changed");
          const text = update.view.state.doc.toString();
          const tokens = getTokens(text);
        }
      }),
    ]}
    onChange={onChange} />;
}