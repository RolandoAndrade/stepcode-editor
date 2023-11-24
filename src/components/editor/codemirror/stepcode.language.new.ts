import { parser } from '../../../core/language/grammar/stepcode.ts';
import {foldNodeProp, foldInside, indentNodeProp, continuedIndent} from "@codemirror/language"
import {LRLanguage, LanguageSupport} from "@codemirror/language"
import { localCompletionSource } from '../../../core/language/grammar/complete.ts';
import { conditionalsCompletions } from './completions/conditionals.completions.ts';
import { structuresCompletions } from './completions/structures.completions.ts';
import { loopCompletions } from './completions/loop.completions.ts';
import { definitionCompletions } from './completions/definition.completions.ts';
import { functionCompletions } from './completions/function.completions.ts';

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

export function stepCode() {
  return new LanguageSupport(stepCodeLanguage, [
    stepCodeLanguage.data.of({
      autocomplete: localCompletionSource
    }),
    stepCodeLanguage.data.of({
      autocomplete: [
        ...structuresCompletions,
        ...conditionalsCompletions,
        ...loopCompletions,
        ...definitionCompletions,
        ...functionCompletions
      ]
    })
  ])
}