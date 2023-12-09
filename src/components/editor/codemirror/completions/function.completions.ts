import { Completion } from '@codemirror/autocomplete';
import {snippetCompletion} from "@codemirror/autocomplete"

export const functionCompletions: Completion[] = [
  snippetCompletion("Escribir ${Mensaje};",   {
    label: "Escribir",
    type: "function",
    detail: "Muestra un mensaje en pantalla",
  }),
  snippetCompletion("Leer ${Variable};",   {
    label: "Leer",
    type: "function",
    detail: "Lee un valor desde el teclado",
  }),
  snippetCompletion("Longitud(${Arreglo})",   {
    label: "Longitud",
    type: "function",
    detail: "Retorna la cantidad de elementos de un arreglo o cadena",
  }),
  snippetCompletion("SubCadena(${Cadena}, ${Inicio}, ${Fin})",   {
    label: "SubCadena",
    type: "function",
    detail: "Función para obtener una subcadena de una cadena. Retorna una cadena",
  }),
  snippetCompletion("Mayusculas(${Cadena})",   {
    label: "Mayusculas",
    type: "function",
    detail: "Función para convertir una cadena a mayúsculas. Retorna una cadena",
  }),
  snippetCompletion("Minusculas(${Cadena})",   {
    label: "Minusculas",
    type: "function",
    detail: "Función para convertir una cadena a minúsculas. Retorna una cadena",
  }),
  snippetCompletion('ConvertirANumero(${Cadena})',   {
    label: "ConvertirANumero",
    type: "function",
    detail: "Función para convertir una cadena a número. Retorna un número",
  }),
  snippetCompletion('ConvertirACadena(${Numero})',   {
    label: "ConvertirACadena",
    type: "function",
    detail: "Función para convertir un número a cadena. Retorna una cadena",
  }),
]