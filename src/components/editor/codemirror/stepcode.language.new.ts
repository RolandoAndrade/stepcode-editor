import { parser } from 'lezer-stepcode'
import { foldNodeProp, foldInside, indentNodeProp, syntaxTree, continuedIndent } from '@codemirror/language'
import {LRLanguage, LanguageSupport} from "@codemirror/language"
import { conditionalsCompletions } from './completions/conditionals.completions.ts';
import { insideFunctionsCompletions, structuresCompletions } from './completions/structures.completions.ts';
import { insideLoopCompletions, loopCompletions } from './completions/loop.completions.ts';
import { definitionCompletions } from './completions/definition.completions.ts';
import { functionCompletions } from './completions/function.completions.ts';
import { CompletionContext } from '@codemirror/autocomplete';
import { localCompletionSource } from './completions/complete.ts';
import { asCompletions, typesCompletions } from './completions/types.completions.ts';
import { getNamedScope } from './lezer-helpers.ts';
import { paramsCompletions } from './completions/params.completions.ts';

const stepCodeParser = parser.configure({
  props: [
    foldNodeProp.add({
      Script: foldInside
    }),
    indentNodeProp.add({
      IfStatement: continuedIndent({except: /^\s*({|else\b)/}),
      ProgramDefinition: continuedIndent(),
      Function: continuedIndent(),
      Procedure: continuedIndent(),
    }),
  ]
})

export const stepCodeLanguage = LRLanguage.define({
  parser: stepCodeParser.configure({
  }),
  languageData: {}
})

const genericCompletions = [
  ...conditionalsCompletions,
  ...loopCompletions,
  ...definitionCompletions,
  ...functionCompletions
]

const completionsMap = new Map([
  ['Script', structuresCompletions],
  ['ParamList', [...typesCompletions, ...paramsCompletions, ...asCompletions]],
  ['DefineStatement', [...typesCompletions, ...asCompletions]],
  ['VariableType', typesCompletions],
  ['ForStatement', [...genericCompletions, ...insideLoopCompletions]],
  ['WhileStatement', [...genericCompletions, ...insideLoopCompletions]],
  ['RepeatStatement', [...genericCompletions, ...insideLoopCompletions]],
  ['Function', [
    ...genericCompletions,
    ...insideFunctionsCompletions,
  ]]
])

function completeStepCode(context: CompletionContext) {
  const word = context.matchBefore(/\w*/)
  if (!context.explicit && (!word || word.from === word.to))
    return null
  const tree = syntaxTree(context.state)
  const node = tree.resolveInner(context.pos, -1)
  if (['ProgramName', 'FunctionName', 'ProcedureName'].includes(node.node.name))
    return null
  const currentScope = getNamedScope(node.node) || ''
  const options = completionsMap.get(currentScope) ?? genericCompletions
  return {
    from: word?.from ?? context.pos,
    options,
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