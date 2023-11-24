import { Completion } from '@codemirror/autocomplete';
import {snippetCompletion} from "@codemirror/autocomplete"
export const typesCompletions: Completion[] = [
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
]