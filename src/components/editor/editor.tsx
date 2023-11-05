import { Editor as MonacoEditor, useMonaco } from '@monaco-editor/react';
import { useEffect } from 'react';
import { languageConfiguration } from '../../core/language/configuration/configuration.config.ts';
import { languageSyntax } from '../../core/language/syntax/syntax.config.ts';
import { useEditor } from '../editor-context.tsx';
import { darkTheme } from '../../core/colors/dark-theme.ts';
import { lightTheme } from '../../core/colors/light-theme.ts';
import { completionProvider } from '../../core/language/syntax/completion/completion-provider.ts';

export function Editor() {
  const monaco = useMonaco();
  const { content, setContent } = useEditor();

  useEffect(() => {
    if (!monaco) return
    monaco.languages.register({ id: 'Pseudocode-ES' });
    const { dispose: disposeLanguageConfig } = monaco.languages.setLanguageConfiguration('Pseudocode-ES', languageConfiguration);
    const { dispose: disposeTokensProvider } = monaco.languages.setMonarchTokensProvider('Pseudocode-ES', languageSyntax);
    const { dispose: disposeCompletionItemProvider } = monaco.languages.registerCompletionItemProvider('Pseudocode-ES', completionProvider)
    monaco.editor.defineTheme('step-code', darkTheme)
    monaco.editor.defineTheme('step-code-light', lightTheme)
    monaco.editor.setTheme('step-code');
    return () => {
      disposeLanguageConfig();
      disposeTokensProvider();
      disposeCompletionItemProvider();
    }
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