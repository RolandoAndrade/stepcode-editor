import { languages } from 'monaco-editor';
import { createCompletionItems } from './completion-items.ts';

export const completionProvider = {
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
} as languages.CompletionItemProvider;