import { Editor as MonacoEditor, useMonaco } from '@monaco-editor/react';
import { useEffect } from 'react';
import { languageConfiguration } from '../../core/language/configuration/configuration.config.ts';
import { languageSyntax } from '../../core/language/syntax/syntax.config.ts';
import { languages } from 'monaco-editor';
import { createCompletionItems } from '../../core/language/syntax/completion-items.ts';
import { colors } from '../../core/colors/colors.ts';
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
    monaco.editor.defineTheme('Pseudocode-ES', {
      base: 'vs-dark', colors: {
        'editor.background': colors.black,
      }, inherit: true,
      rules: [
        { token: 'comment', foreground: colors.commentGrey },
        { token: 'keyword.control', foreground: colors.magenta, fontStyle: 'bold' },
        { token: 'internal-function', foreground: colors.cyan, fontStyle: 'italic' },
        { token: 'keyword.type', foreground: colors.lightYellow },
        { token: 'keyword.constant', foreground: colors.darkYellow},
        { token: 'keyword.operator', foreground: colors.magenta },
        { token: 'number', foreground: colors.darkYellow },
        { token: 'string', foreground: colors.green },
        { token: 'operator', foreground: '#000000' },
        { token: 'delimiter', foreground: '#000000' },
        { token: 'identifier', foreground: '#000000' },
        { token: 'type', foreground: '#000000' },
        { token: 'function', foreground: '#000000' },
        { token: 'variable', foreground: '#000000' },
      ]
    })
    monaco.editor.setTheme('Pseudocode-ES');

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
          mouseWheelZoom: true
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
          <div className="empty-editor-hint" widgetid="editor.widget.emptyHint" style={{ width: 'max-content', paddingLeft: '4px', fontFamily: 'Consolas, "Courier New", monospace', fontWeight: 'normal', fontSize: '14px', fontFeatureSettings: '"liga" 0, "calt" 0', fontVariationSettings: 'normal', lineHeight: '19px', letterSpacing: '0px', position: 'absolute', display: 'block', visibility: 'inherit', maxWidth: '564px', top: '0px', left: '0px' }} monaco-visible-content-widget="true">
            <div style={{ fontStyle: 'italic' }}>
              Empiece a escribir para descartar o <a title="" style={{ cursor: 'pointer' }}>no mostrar</a> esto de nuevo.
            </div>
          </div>
        </div>
      )}
    </div>


  )
}