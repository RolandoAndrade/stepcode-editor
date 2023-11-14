import './editor.css';
import { useEffect, useRef } from 'react';
import { useEditor } from '../editor-context.tsx';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import { stepCodeLanguage } from './codemirror/stepcode.language.ts';
import { stepcodeCompletions } from './codemirror/completions/stepcode.completions.ts';
import { indentUnit } from '@codemirror/language';
import { stepcodeLinter } from './codemirror/stepcode.linter.ts';
import { indentationMarkers } from '@replit/codemirror-indentation-markers';
import { AtomOneLightColors, OneDarkColors } from '../../core/colors/colors.ts';
import { oneDarkTheme } from './codemirror/themes/dark.ts';
import { useTheme } from '../theme-context.tsx';
import { atomLightTheme } from './codemirror/themes/light.ts';
import { foldOnIndent } from './codemirror/fold-on-indent.ts';


export function Editor() {
  const ref = useRef(null);
  const { content, setContent } = useEditor();
  const {theme} = useTheme()


  const onUpdate = EditorView.updateListener.of((v) => {
    setContent(v.state.doc.toString())
  })

  useEffect(() => {
    if (!ref.current) return
    const state = EditorState.create({
      doc: content,
      extensions: [
        basicSetup,
        keymap.of([...defaultKeymap, indentWithTab]),
        theme === 'dark' ? oneDarkTheme : atomLightTheme,
        onUpdate,
        foldOnIndent(),
        stepCodeLanguage,
        stepcodeCompletions,
        indentUnit.of('    '),
        stepcodeLinter,
        indentationMarkers({
          thickness: 1,
          colors: {
            dark: OneDarkColors.gutterGrey,
            light: AtomOneLightColors.gutterGrey,
            activeDark: '#727272',
            activeLight: '#727272',
          }
        }),
      ],
    })
    const view = new EditorView({ state, parent: ref.current! })

    return () => {
      view.destroy()
    }
  }, [theme])

  return <div ref={ref} className={'bg-white dark:bg-oneDarkBlack h-full max-h-full overflow-y-auto'} id={'editor'}></div>;
}