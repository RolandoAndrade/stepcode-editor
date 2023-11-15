import { CompletionContext } from '@codemirror/autocomplete'
import { autocompletion, CompletionResult } from "@codemirror/autocomplete";
import { structuresCompletions } from './structures.completions.ts';
import { conditionalsCompletions } from './conditionals.completions.ts';

function langCompletions(context: CompletionContext): CompletionResult | null {
  const word = context.matchBefore(/\w*/)
  if (!context.explicit && !word)
    return null
  return {
    from: word?.from || context.pos,
    options: [
      ...structuresCompletions,
      ...conditionalsCompletions
    ]
  }
}

export const stepcodeCompletions = autocompletion({ override: [langCompletions]});