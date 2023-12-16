import { parser } from 'lezer-stepcode'
import { foldNodeProp, foldInside, indentNodeProp, syntaxTree } from '@codemirror/language'
import {LRLanguage, LanguageSupport} from "@codemirror/language"
import { conditionalsCompletions } from './completions/conditionals.completions.ts';
import { structuresCompletions } from './completions/structures.completions.ts';
import { loopCompletions } from './completions/loop.completions.ts';
import { definitionCompletions } from './completions/definition.completions.ts';
import { functionCompletions } from './completions/function.completions.ts';
import { CompletionContext } from '@codemirror/autocomplete';
import { localCompletionSource } from './completions/complete.ts';

const stepCodeParser = parser.configure({
  props: [
    indentNodeProp.add({
      Script: context => context.column(context.node.from) + context.unit
    }),
    foldNodeProp.add({
      Script: foldInside
    })
  ]
})

export const stepCodeLanguage = LRLanguage.define({
  parser: stepCodeParser.configure({}),
  languageData: {}
})

function completeStepCode(context: CompletionContext) {
  const word = context.matchBefore(/\w*/)
  if (!context.explicit && (!word || word.from === word.to))
    return null
  const tree = syntaxTree(context.state)
  const node = tree.resolveInner(context.pos, -1)
  if (node.parent?.name === 'Script') {
    return {
      from: word?.from ?? context.pos,
      options: [
        ...structuresCompletions,
      ],
      validFor: /^\w*$/,
    }
  }
  return {
    from: word?.from ?? context.pos,
    options: [
      ...conditionalsCompletions,
      ...loopCompletions,
      ...definitionCompletions,
      ...functionCompletions
    ],
    validFor: /^\w*$/,
  }
}

export function stepCode() {
  return new LanguageSupport(stepCodeLanguage, [
    stepCodeLanguage.data.of({
      autocomplete: localCompletionSource
    }),
    stepCodeLanguage.data.of({
      autocomplete: completeStepCode
    })
  ])
}