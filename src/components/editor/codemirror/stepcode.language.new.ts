import { parser } from '../../../core/language/grammar/stepcode.ts';
import {foldNodeProp, foldInside, indentNodeProp} from "@codemirror/language"
import {LRLanguage, LanguageSupport} from "@codemirror/language"
import { localCompletionSource } from '../../../core/language/grammar/complete.ts';

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
  parser: stepCodeParser,
  languageData: {}
})

export function stepCode() {
  return new LanguageSupport(stepCodeLanguage, [
    stepCodeLanguage.data.of({
      autocomplete: localCompletionSource
    })
  ])
}