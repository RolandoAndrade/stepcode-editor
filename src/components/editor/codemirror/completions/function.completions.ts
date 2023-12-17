import { Completion } from '@codemirror/autocomplete';
import {snippetCompletion} from "@codemirror/autocomplete"

export const functionCompletions: Completion[] = [
  snippetCompletion("Escribir ${Mensaje};${}",   {
    label: "Escribir",
    type: "function",
    info: "Muestra un mensaje en pantalla",
    detail: "Escribir <mensajes>",
    section: 'Funciones internas'
  }),
  snippetCompletion("Leer ${Variable};${}",   {
    label: "Leer",
    type: "function",
    info: "Lee un valor desde el teclado",
    detail: "Leer <variables>",
    section: 'Funciones internas'
  }),
  snippetCompletion("Longitud(${Arreglo})${}",   {
    label: "Longitud",
    type: "function",
    info: "Retorna la cantidad de elementos de un arreglo o cadena",
    detail: "Longitud(<arreglo>) → Entero",
    section: 'Funciones internas'
  }),
  snippetCompletion("SubCadena(${Cadena}, ${Inicio}, ${Fin})${}",   {
    label: "SubCadena",
    type: "function",
    info: "Función para obtener una subcadena de una cadena. Retorna una cadena",
    detail: "SubCadena(<cadena>, <inicio>, <fin>) → Cadena",
    section: 'Funciones internas'
  }),
  snippetCompletion("Mayusculas(${Cadena})${}",   {
    label: "Mayusculas",
    type: "function",
    info: "Función para convertir una cadena a mayúsculas. Retorna una cadena",
    detail: "Mayusculas(<cadena>) → Cadena",
    section: 'Funciones internas'
  }),
  snippetCompletion("Minusculas(${Cadena})${}",   {
    label: "Minusculas",
    type: "function",
    info: "Función para convertir una cadena a minúsculas. Retorna una cadena",
    detail: "Minusculas(<cadena> → Cadena",
    section: 'Funciones internas'
  }),
  snippetCompletion('ConvertirANumero(${Cadena})${}',   {
    label: "ConvertirANumero",
    type: "function",
    info: "Función para convertir una cadena a número. Retorna un número",
    detail: "ConvertirANumero(<cadena>) → Real o Entero",
    section: 'Funciones internas'
  }),
  snippetCompletion('ConvertirACadena(${Numero})${}',   {
    label: "ConvertirACadena",
    type: "function",
    info: "Función para convertir un número a cadena. Retorna una cadena",
    detail: "ConvertirACadena(<numero>) → Cadena",
    section: 'Funciones internas'
  }),
]