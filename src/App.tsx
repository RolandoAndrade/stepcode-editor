import './App.css'
import { Editor, useMonaco } from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { languageConfiguration } from './core/language/configuration/configuration.config.ts';
import { languageSyntax } from './core/language/syntax/syntax.config.ts';
import { colors } from './core/colors/colors.ts';

function App() {
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return
    monaco.languages.register({ id: 'Pseudocode-ES' });
    monaco.languages.setLanguageConfiguration('Pseudocode-ES', languageConfiguration);
    monaco.languages.setMonarchTokensProvider('Pseudocode-ES', languageSyntax);
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
    <Editor
      height="100vh"
      defaultLanguage="Pseudocode-ES"
      defaultValue="// some comment"
      options={{
        minimap: { enabled: false },
      }}
      onChange={(value) => {
        const newValue = value?.replace('<-', `←`)?.replace('!=', '≠')?.replace('==', '≡')?.replace('<=', '≤')?.replace('>=', '≥')?.replace('->', '→');
        if (value !== newValue) {
          const lastPosition = monaco?.editor?.getEditors()[0].getPosition()
          monaco?.editor?.getEditors()[0].setValue(newValue || '');
          monaco?.editor.getEditors()[0].setPosition({ column: (lastPosition?.column || 1) - 1, lineNumber: lastPosition?.lineNumber || 0});
        }
      }}

    />
  )
}

export default App
