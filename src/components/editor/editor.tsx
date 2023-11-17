import './editor.css';
import { useEffect, useRef, useState } from 'react';
import { useEditor } from '../editor-context.tsx';
import { EditorState } from '@codemirror/state';
import { EditorView, placeholder } from '@codemirror/view';
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
  const ref = useRef<HTMLDivElement>(null);
  const { content, setContent } = useEditor();
  const {theme} = useTheme()
  const [fontSize, setFontSize] = useState(14);

  const onUpdate = EditorView.updateListener.of((v) => {
    const value = v.state.doc.toString();
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
    v.view.dispatch({
      changes,
    })
    setContent(value)
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
        placeholder('Empiece a escribir para descartar o no mostrar esto de nuevo...')
      ],
    })
    const view = new EditorView({ state, parent: ref.current! })

    return () => {
      view.destroy()
    }
  }, [theme])


  function changeZoom(e: WheelEvent) {
    if (e.ctrlKey) {
      e.preventDefault()
      if (e.deltaY > 0) {
        setFontSize(fontSize => fontSize - 1);
      } else {
        setFontSize(fontSize => fontSize + 1);
      }
    }
  }

  useEffect(() => {
    if (!ref.current) return
    const editor = ref.current
    if (!editor) return;
    editor.addEventListener('wheel', changeZoom);
    return () => {
      editor.removeEventListener('wheel', changeZoom);
    }
  }, []);

  return <div ref={ref} className={'bg-white dark:bg-oneDarkBlack h-full max-h-full overflow-y-auto'} id={'editor'}
  style={{
    fontSize: `${fontSize}px`,
  }}></div>;
}