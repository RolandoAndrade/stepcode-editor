import { Completion } from '@codemirror/autocomplete';
import {snippetCompletion} from "@codemirror/autocomplete"
export const typesCompletions: Completion[] = [
  snippetCompletion("Entero", {
    label: "Entero",
    type: "type",
    detail: "Define una variable de tipo entero",
    section: {
      name: 'Tipos de datos',
      rank: 0
    }
  }),
  snippetCompletion("Real", {
    label: "Real",
    type: "type",
    detail: "Define una variable de tipo real",
    section: {
      name: 'Tipos de datos',
      rank: 0
    }
  }),
  snippetCompletion("Logico", {
    label: "Logico",
    type: "type",
    detail: "Define una variable de tipo lógico",
    section: {
      name: 'Tipos de datos',
      rank: 0
    }
  }),
  snippetCompletion("Caracter", {
    label: "Caracter",
    type: "type",
    detail: "Define una variable de tipo caracter",
    section: {
      name: 'Tipos de datos',
      rank: 0
    }
  }),
  snippetCompletion("Cadena", {
    label: "Cadena",
    type: "type",
    detail: "Define una variable de tipo cadena",
    section: {
      name: 'Tipos de datos',
      rank: 0
    }
  }),
]