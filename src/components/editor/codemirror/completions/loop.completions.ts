import { Completion } from '@codemirror/autocomplete';
import {snippetCompletion} from "@codemirror/autocomplete"
export const loopCompletions: Completion[] = [
  snippetCompletion("Mientras ${Condicion} Hacer\n\t${// Codigo}\nFinMientras",   {
    label: "Mientras",
    type: "keyword",
    detail: "Estructura repetitiva. Mientras se cumpla la condición, se ejecuta el bloque de código dentro de la estructura.",
  }),
  snippetCompletion("Hacer\n\t${// Codigo}\nMientras ${Condicion}",   {
    label: "Hacer",
    type: "keyword",
    detail: "Estructura repetitiva. Mientras se cumpla la condición, se ejecuta el bloque de código dentro de la estructura.",
  }),
  snippetCompletion("Repetir\n\t${// Codigo}\nHasta Que ${Condicion};",   {
    label: "Repetir Hasta Que",
    type: "keyword",
    detail: "Estructura repetitiva. Repite el bloque de código hasta que se cumpla la condición.",
  }),
  snippetCompletion("Repetir\n\t${// Codigo}\nMientras Que ${Condicion};",   {
    label: "Repetir Mientras Que",
    type: "keyword",
    detail: "Estructura repetitiva. Repite el bloque de código mientras que se cumpla la condición.",
  }),
  snippetCompletion("Para ${Variable} ← ${ValorInicial} Hasta ${ValorFinal} Con Paso ${Paso} Hacer\n\t${// Codigo}\nFinPara",   {
    label: "Para",
    type: "keyword",
    detail: "Estructura repetitiva. Repite el bloque de código desde un valor inicial hasta un valor final, con un paso determinado.",
  }),
]