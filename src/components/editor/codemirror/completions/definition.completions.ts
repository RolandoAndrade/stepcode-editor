import { Completion } from '@codemirror/autocomplete';
import {snippetCompletion} from "@codemirror/autocomplete"
export const definitionCompletions: Completion[] = [
  snippetCompletion("Definir ${Variable} Como ${TipoVariable};${}",   {
    label: "Definir",
    type: "keyword",
    info: "Define una variable",
    detail: "Definir <variable> Como <tipo de variable>",
    section: 'Definición de variables'
  }),
  snippetCompletion("Dimension ${1:Variable}[${2:Dimensiones}];${}", {
    label: "Dimension",
    type: "keyword",
    info: "Define una variable de tipo arreglo. Los arreglos son variables que almacenan varios valores.",
    detail: "Dimension <variable>[<dimensiones>]",
    section: 'Definición de variables'
  })
]