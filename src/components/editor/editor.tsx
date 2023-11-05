import { Editor as MonacoEditor, useMonaco } from '@monaco-editor/react';
import { useEffect } from 'react';
import { languageConfiguration } from '../../core/language/configuration/configuration.config.ts';
import { languageSyntax } from '../../core/language/syntax/syntax.config.ts';
import { languages } from 'monaco-editor';
import { createCompletionItems } from '../../core/language/syntax/completion-items.ts';
import { AtomOneLightColors, OneDarkColors } from '../../core/colors/oneDarkColors.ts';
import { useEditor } from '../editor-context.tsx';

export function Editor() {
  const monaco = useMonaco();
  const { content, setContent } = useEditor();

  useEffect(() => {
    if (!monaco) return
    monaco.languages.register({ id: 'Pseudocode-ES' });
    monaco.languages.setLanguageConfiguration('Pseudocode-ES', languageConfiguration);
    monaco.languages.setMonarchTokensProvider('Pseudocode-ES', languageSyntax);
    monaco.languages.registerCompletionItemProvider('Pseudocode-ES', {
      provideCompletionItems: (model, position, ) => {
        const word = model.getWordUntilPosition(position);
        const suggestions: languages.CompletionItem[] = createCompletionItems({
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        })
        return { suggestions };
      }
    })
    monaco.editor.defineTheme('step-code', {
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
      ]
    })
    monaco.editor.defineTheme('step-code-light', {
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
      ]
    })
    monaco.editor.setTheme('step-code');

  }, [monaco]);
  return (
    <div className={'relative w-full h-full'}>
      <MonacoEditor
        width={'100%'}
        defaultLanguage="Pseudocode-ES"
        defaultValue={content || ''}
        options={{
          minimap: { enabled: false },
          autoIndent: 'full',
          mouseWheelZoom: true,
          automaticLayout: true,
          cursorBlinking: 'phase',
          renderLineHighlight: 'all',
        }}
        onChange={(value) => {
          const newValue = value?.replace('<-', `←`)?.replace('!=', '≠')?.replace('<=', '≤')?.replace('>=', '≥')?.replace('->', '→');
          if (value !== newValue) {
            const lastPosition = monaco?.editor?.getEditors()[0].getPosition()
            monaco?.editor?.getEditors()[0].setValue(newValue || '');
            monaco?.editor.getEditors()[0].setPosition({ column: (lastPosition?.column || 1) - 1, lineNumber: lastPosition?.lineNumber || 0});
          }
          setContent(newValue || '');
        }}
      />
      {!(content?.length) && (
        <div data-mprt="1" className={'pointer-events-none text-oneDarkCommentGrey'} style={{ position: 'absolute', top: '0px', left: '61px' }}>
          <div className="empty-editor-hint" style={{ width: 'max-content', paddingLeft: '4px', fontFamily: 'Consolas, "Courier New", monospace', fontWeight: 'normal', fontSize: '14px', fontFeatureSettings: '"liga" 0, "calt" 0', fontVariationSettings: 'normal', lineHeight: '19px', letterSpacing: '0px', position: 'absolute', display: 'block', visibility: 'inherit', maxWidth: '564px', top: '0px', left: '0px' }}>
            <div style={{ fontStyle: 'italic' }}>
              Empiece a escribir para descartar o <a title="" style={{ cursor: 'pointer' }}>no mostrar</a> esto de nuevo.
            </div>
          </div>
        </div>
      )}
    </div>


  )
}