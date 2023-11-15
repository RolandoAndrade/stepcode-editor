import { Completion } from '@codemirror/autocomplete';
import {snippetCompletion} from "@codemirror/autocomplete"

export const structuresCompletions: Completion[] = [
  snippetCompletion("Proceso ${NombreProceso}\n\t${// Descripcion del proceso}\nFinProceso",   {
    label: "Proceso",
    type: "method",
    detail: "Define un proceso o algoritmo",
    boost: 100,
  }),
  snippetCompletion("Algoritmo ${NombreAlgoritmo}\n\t${// Descripcion del algoritmo}\nFinAlgoritmo",   {
    label: "Algoritmo",
    type: "method",
    detail: "Define un proceso o algoritmo",
  }),
  snippetCompletion("SubProceso ${NombreSubProceso}({${Parametros}})\n\t${// Descripcion del subproceso}\nFinSubProceso",     {
    label: "SubProceso",
    type: "method",
    detail: "Define un subproceso o subalgoritmo",
  }),
  snippetCompletion("SubAlgoritmo ${NombreSubAlgoritmo}({${Parametros}})\n\t${// Descripcion del subalgoritmo}\nFinSubAlgoritmo",     {
    label: "SubAlgoritmo",
    type: "method",
    detail: "Define un subproceso o subalgoritmo",
  }),
  snippetCompletion("Procedimiento ${NombreProcedimiento}(${Parametros})\n\t${// Descripcion del procedimiento}\nFinProcedimiento",     {
    label: "Procedimiento",
    type: "method",
    detail: "Define un procedimiento",
  }),
  snippetCompletion("Funcion ${NombreFuncion}(${Parametros}): ${TipoRetorno}\n\t${// Descripcion de la funcion}\nFinFuncion",     {
    label: "Funcion",
    type: "method",
    detail: "Define una funcion. Las funciones son bloques de código que retornan un valor.",
  }),
  snippetCompletion("Funcion ${VariableDeRetorno} ← ${NombreFuncion}(${Parametros})\n\t${// Descripcion de la funcion}\n\tDefinir ${VariableDeRetorno} Como ${TipoVariable};\nFinFuncion",     {
    label: "Funcion PSeInt",
    type: "method",
    detail: "Define una funcion. Las funciones son bloques de código que retornan un valor",
  }),
]