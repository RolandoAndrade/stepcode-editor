import { parser } from 'lezer-stepcode'
import { foldNodeProp, foldInside, indentNodeProp, continuedIndent, syntaxTree } from '@codemirror/language'
import {LRLanguage, LanguageSupport} from "@codemirror/language"
import { localCompletionSource } from '../../../core/language/grammar/complete.ts';
import { conditionalsCompletions } from './completions/conditionals.completions.ts';
import { structuresCompletions } from './completions/structures.completions.ts';
import { loopCompletions } from './completions/loop.completions.ts';
import { definitionCompletions } from './completions/definition.completions.ts';
import { functionCompletions } from './completions/function.completions.ts';
import { CompletionContext } from '@codemirror/autocomplete';

const stepCodeParser = parser.configure({
  props: [
    indentNodeProp.add({
      Application: context => context.column(context.node.from) + context.unit
    }),
    foldNodeProp.add({
      Application: foldInside
    })
  ]
})

export const stepCodeLanguage = LRLanguage.define({
  parser: stepCodeParser.configure({
    props:[
      indentNodeProp.add({
        IfStatement: continuedIndent({except: /^\s*({|sino|finsi\b)/}),

      }),
      foldNodeProp.add({
        "ProgramDefinition IfStatement SwitchStatement": (node)=> {
          const children = node.getChildren('Body').concat(node.getChildren('SwitchBody'))
          if (children.length === 0) return null
          return {
            from: children[0].prevSibling?.to ?? children[0].from,
            to: children[children.length - 1].to
          }
        }
      })
    ]
  }),
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