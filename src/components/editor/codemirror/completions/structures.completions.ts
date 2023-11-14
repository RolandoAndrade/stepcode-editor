import { Completion } from '@codemirror/autocomplete';
import {snippetCompletion, snippet} from "@codemirror/autocomplete"

export const structuresCompletions: Completion[] = [
  snippetCompletion("Proceso ${NombreProceso}\n\t${// Descripcion del proceso}\nFinProceso",   {
    label: "Proceso",
    type: "method",
    detail: "Define un proceso o algoritmo",
  }),
  snippetCompletion("Algoritmo ${NombreAlgoritmo}\n\t${// Descripcion del algoritmo}\nFinAlgoritmo",   {
    label: "Algoritmo",
    type: "method",
    detail: "Define un proceso o algoritmo",
  }),
  {
    label: "for loop",
    apply: snippet("for (let #{1:index} = 0; #{1:index} < #{2:end}; #{1:index}++) {\n\t${}\n}")
  },
]