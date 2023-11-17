import { Completion } from '@codemirror/autocomplete';
import {snippetCompletion} from "@codemirror/autocomplete"
export const conditionalsCompletions: Completion[] = [
  snippetCompletion("Si ${Condicion} Entonces\n\t${// Codigo}\nFinSi",   {
    label: "Si",
    type: "keyword",
    detail: "Estructura condicional. Si se cumple la condición, se ejecuta el bloque de código dentro de la estructura.",
  }),
  snippetCompletion("Entonces\n\t${// Codigo}\nFinSi",   {
    label: "Entonces",
    type: "keyword",
    detail: "Estructura condicional. Si se cumple la condición, se ejecuta el bloque de código dentro de la estructura.",
  }),
  snippetCompletion("Sino Si ${Condicion} Entonces\n\t${// Codigo}",   {
    label: "Sino Si",
    type: "keyword",
    detail: "Estructura condicional. Si no se cumple la condición anterior, se evalúa la siguiente condición.",
  }),
  snippetCompletion("Sino\n\t${// Codigo}\nFinSi",   {
    label: "Sino",
    type: "keyword",
    detail: "Estructura condicional. Si no se cumple la condición, se ejecuta el bloque de código dentro de la estructura.",
  }),
  snippetCompletion("Segun ${1:expresion} Hacer\n\t${2:valor}:\n\t\t${3:// Descripción del caso}\n\t${4:valor}:\n\t\t${5:// Descripción del caso}\n\tDe otro modo:\n\t\t${6:// Caso por defecto}\nFinSegun",   {
    label: "Segun",
    type: "keyword",
    detail: "Estructura condicional. Evalúa una expresión y ejecuta el bloque de código correspondiente al caso que se cumpla.",
  })
]
