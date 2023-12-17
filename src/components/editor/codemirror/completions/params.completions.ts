import { Completion, snippetCompletion } from '@codemirror/autocomplete';

export const paramsCompletions: Completion[] = [
  snippetCompletion("por Referencia", {
    label: "Variable por Referencia",
    type: "keyword",
    info: "Define un parámetro por referencia. Los parámetros por referencia se utilizan para pasar valores a un subproceso.",
    detail: "<parametro> por Referencia",
    section: 'Definición de parámetros'
  }),
  snippetCompletion("por Valor", {
    label: "Variable por Valor",
    type: "keyword",
    info: "Define un parámetro por valor. Los parámetros por valor se utilizan para pasar valores a un subproceso.",
    detail: "<parametro> por Valor",
    section: 'Definición de parámetros'
  }),
]