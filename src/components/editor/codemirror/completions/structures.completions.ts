import { Completion } from '@codemirror/autocomplete';
import {snippetCompletion} from "@codemirror/autocomplete"

export const structuresCompletions: Completion[] = [
  snippetCompletion("Proceso ${NombreProceso}\n\t${// Descripcion del proceso}\nFinProceso",   {
    label: "Proceso",
    type: "method",
    info: "Define un proceso o algoritmo",
    detail: "Proceso <nombre del proceso> <bloque de código> FinProceso",
    boost: 100,
    section: {
      name: 'Bloques de código',
      rank: -3
    }
  }),
  snippetCompletion("Algoritmo ${NombreAlgoritmo}\n\t${// Descripcion del algoritmo}\nFinAlgoritmo",   {
    label: "Algoritmo",
    type: "method",
    info: "Define un proceso o algoritmo",
    detail: "Algoritmo <nombre del algoritmo> <bloque de código> FinAlgoritmo",
    section: {
      name: 'Bloques de código',
      rank: -3
    }
  }),
  snippetCompletion("SubProceso ${NombreSubProceso}(${Parametros})\n\t${// Descripcion del subproceso}\nFinSubProceso",     {
    label: "SubProceso",
    type: "method",
    info: "Define un subproceso o subalgoritmo",
    detail: "SubProceso <nombre del subproceso> (<parametros>) <bloque de código> FinSubProceso",
    section: {
      name: 'Bloques de código',
      rank: -3
    }
  }),
  snippetCompletion("SubAlgoritmo ${NombreSubAlgoritmo}(${Parametros})\n\t${// Descripcion del subalgoritmo}\nFinSubAlgoritmo",     {
    label: "SubAlgoritmo",
    type: "method",
    info: "Define un subproceso o subalgoritmo",
    detail: "SubAlgoritmo <nombre del subalgoritmo> (<parametros>) <bloque de código> FinSubAlgoritmo",
    section: {
      name: 'Bloques de código',
      rank: -3
    }
  }),
  snippetCompletion("Procedimiento ${NombreProcedimiento}(${Parametros})\n\t${// Descripcion del procedimiento}\nFinProcedimiento",     {
    label: "Procedimiento",
    type: "method",
    info: "Define un procedimiento",
    detail: "Procedimiento <nombre del procedimiento> (<parametros>) <bloque de código> FinProcedimiento",
    section: {
      name: 'Bloques de código',
      rank: -3
    }
  }),
  snippetCompletion("Funcion ${NombreFuncion}(${Parametros}): ${TipoRetorno}\n\t${// Descripcion de la funcion}\nFinFuncion",     {
    label: "Funcion",
    type: "method",
    info: "Define una funcion. Las funciones son bloques de código que retornan un valor.",
    detail: "Funcion <nombre de la funcion> (<parametros>): <tipo de retorno> <bloque de código> FinFuncion",
    section: {
      name: 'Bloques de código',
      rank: -3
    }
  }),
  snippetCompletion("Funcion ${VariableDeRetorno} ← ${NombreFuncion}(${Parametros})\n\t${// Descripcion de la funcion}\n\tDefinir ${VariableDeRetorno} Como ${TipoVariable};${}\nFinFuncion",     {
    label: "Funcion PSeInt",
    type: "method",
    info: "Define una funcion. Las funciones son bloques de código que retornan un valor",
    detail: "Funcion <variable de retorno> ← <nombre de la funcion> (<parametros>) <bloque de código> FinFuncion",
    section: {
      name: 'Bloques de código',
      rank: -3
    }
  }),
]