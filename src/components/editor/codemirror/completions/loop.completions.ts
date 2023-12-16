import { Completion } from '@codemirror/autocomplete';
import {snippetCompletion} from "@codemirror/autocomplete"
export const loopCompletions: Completion[] = [
  snippetCompletion("Mientras ${Condicion} Hacer\n\t${// Codigo}\nFinMientras",   {
    label: "Mientras",
    type: "keyword",
    info: "Mientras se cumpla la condición, se ejecuta el bloque de código dentro de la estructura.",
    detail: "Mientras <condición> Hacer <bloque de código> FinMientras",
    section: 'Estructuras repetitivas'
  }),
  snippetCompletion("Hacer\n\t${// Codigo}\nFinMientras",   {
    label: "Hacer",
    type: "keyword",
    info: "Mientras se cumpla la condición, se ejecuta el bloque de código dentro de la estructura.",
    detail: "Hacer <bloque de código> FinMientras",
    section: 'Estructuras repetitivas'
  }),
  snippetCompletion("Repetir\n\t${// Codigo}\nHasta Que ${Condicion};",   {
    label: "Repetir Hasta Que",
    type: "keyword",
    info: "Repite el bloque de código hasta que se cumpla la condición.",
    detail: "Repetir <bloque de código> Hasta Que <condición>",
    section: 'Estructuras repetitivas'
  }),
  snippetCompletion("Repetir\n\t${// Codigo}\nMientras Que ${Condicion};",   {
    label: "Repetir Mientras Que",
    type: "keyword",
    info: "Repite el bloque de código mientras que se cumpla la condición.",
    detail: "Repetir <bloque de código> Mientras Que <condición>",
    section: 'Estructuras repetitivas'
  }),
  snippetCompletion("Para ${Variable} ← ${ValorInicial} Hasta ${ValorFinal} Con Paso ${Paso} Hacer\n\t${// Codigo}\nFinPara",   {
    label: "Para",
    type: "keyword",
    info: "Repite el bloque de código desde un valor inicial hasta un valor final, con un paso determinado.",
    detail: "Para <variable> ← <valor inicial> Hasta <valor final> Con Paso <paso> Hacer <bloque de código> FinPara",
    section: 'Estructuras repetitivas'
  }),
]

export const insideLoopCompletions: Completion[] = [
  snippetCompletion("Continuar;",   {
    label: "Continuar",
    type: "keyword",
    info: "Continúa con la siguiente iteración del ciclo.",
    detail: "Continuar",
    section: 'Estructuras repetitivas'
  }),
  snippetCompletion("Romper;",   {
    label: "Romper",
    type: "keyword",
    info: "Termina la ejecución del ciclo.",
    detail: "Salir",
    section: 'Estructuras repetitivas'
  }),
]