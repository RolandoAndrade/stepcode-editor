import { Completion } from '@codemirror/autocomplete';
import {snippetCompletion} from "@codemirror/autocomplete"
export const definitionCompletions: Completion[] = [
  snippetCompletion("Definir ${Variable} Como ${TipoVariable};",   {
    label: "Definir",
    type: "keyword",
    detail: "Define una variable",
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
  snippetCompletion("Entero", {
    label: "Entero",
    type: "type",
    detail: "Define una variable de tipo entero",
  }),
  snippetCompletion("Real", {
    label: "Real",
    type: "type",
    detail: "Define una variable de tipo real",
  }),
  snippetCompletion("Logico", {
    label: "Logico",
    type: "type",
    detail: "Define una variable de tipo lógico",
  }),
  snippetCompletion("Caracter", {
    label: "Caracter",
    type: "type",
    detail: "Define una variable de tipo caracter",
  }),
  snippetCompletion("Cadena", {
    label: "Cadena",
    type: "type",
    detail: "Define una variable de tipo cadena",
  }),
  snippetCompletion("Dimension ${1:Variable}[${2:Dimensiones}];", {
    label: "Dimension",
    type: "keyword",
    detail: "Define una variable de tipo arreglo. Los arreglos son variables que almacenan varios valores.",
  })
]