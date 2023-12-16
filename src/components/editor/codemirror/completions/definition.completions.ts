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
  snippetCompletion("por Referencia", {
    label: "Variable por Referencia",
    type: "keyword",
    detail: "Define un parámetro por referencia. Los parámetros por referencia se utilizan para pasar valores a un subproceso.",
  }),
  snippetCompletion("por Valor", {
    label: "Variable por Valor",
    type: "keyword",
    detail: "Define un parámetro por valor. Los parámetros por valor se utilizan para pasar valores a un subproceso.",
  }),
  snippetCompletion("Dimension ${1:Variable}[${2:Dimensiones}];${}", {
    label: "Dimension",
    type: "keyword",
    detail: "Define una variable de tipo arreglo. Los arreglos son variables que almacenan varios valores.",
  })
]