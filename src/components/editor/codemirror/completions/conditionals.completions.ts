import { Completion } from '@codemirror/autocomplete';
import {snippetCompletion} from "@codemirror/autocomplete"
export const conditionalsCompletions: Completion[] = [
  snippetCompletion("Si ${Condicion} Entonces\n\t${// Codigo}\nFinSi",   {
    label: "Si",
    type: "keyword",
    detail: "Si <condición> Entonces <bloque de código> FinSi",
    info: "Si se cumple la condición, se ejecuta el bloque de código dentro de la estructura.",
    section: 'Estructuras condicionales'
  }),
  snippetCompletion("Entonces\n\t${// Codigo}\nFinSi",   {
    label: "Entonces",
    type: "keyword",
    detail: "Entonces <bloque de código> FinSi",
    info: "Si se cumple la condición, se ejecuta el bloque de código dentro de la estructura.",
    section: 'Estructuras condicionales'
  }),
  snippetCompletion("Sino Si ${Condicion} Entonces\n\t${// Codigo}",   {
    label: "Sino Si",
    type: "keyword",
    detail: "Sino Si <condición> Entonces <bloque de código>",
    info: "Si no se cumple la condición anterior, se evalúa la siguiente condición.",
    section: 'Estructuras condicionales'
  }),
  snippetCompletion("Sino\n\t${// Codigo}",   {
    label: "Sino",
    type: "keyword",
    detail: "Sino <bloque de código>",
    info: "Si no se cumple la condición, se ejecuta el bloque de código dentro de la estructura.",
    section: 'Estructuras condicionales'
  }),
  snippetCompletion("Segun ${1:expresion} Hacer\n\t${2:valor}:\n\t\t${3:// Descripción del caso}\n\t${4:valor}:\n\t\t${5:// Descripción del caso}\n\tDe otro modo:\n\t\t${6:// Caso por defecto}\nFinSegun",   {
    label: "Segun",
    type: "keyword",
    detail: "Segun <expresión> Hacer <casos> FinSegun",
    info: "Evalúa una expresión y ejecuta el bloque de código correspondiente al caso que se cumpla.",
    section: 'Estructuras condicionales'
  })
]
