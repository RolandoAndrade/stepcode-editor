import { languages } from 'monaco-editor';

export function createCompletionItems(range: languages.CompletionItem['range']): languages.CompletionItem[] {
  return [
    {
      label: {
        label: 'Proceso',
        detail: 'Define un proceso o algoritmo',
        description: 'Define un proceso o algoritmo. En este se pueden definir variables, constantes, funciones, etc. para resolver un problema.'
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Proceso ${1:NombreProceso}\n\t${2:// Descripcion del proceso}\nFinProceso',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Define un proceso o algoritmo. En este se pueden definir variables, constantes, funciones, etc. para resolver un problema.',
      range
    },
    {
      label: {
        label: 'Algoritmo',
        detail: 'Define un proceso o algoritmo',
        description: 'Define un proceso o algoritmo. En este se pueden definir variables, constantes, funciones, etc. para resolver un problema.'
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Algoritmo ${1:NombreAlgoritmo}\n\t${2:// Descripcion del algoritmo}\nFinAlgoritmo',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Define un proceso o algoritmo. En este se pueden definir variables, constantes, funciones, etc. para resolver un problema.',
      range
    },
    {
      label: {
        label: 'Definir',
        detail: 'Define una variable',
        description: 'Define una variable. Las variables son espacios de memoria que se utilizan para almacenar datos.'
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Definir ${1:NombreVariable} Como ${2:TipoVariable};',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Define una variable. Las variables son espacios de memoria que se utilizan para almacenar datos.',
      range
    },
    {
      label: {
        label: 'Como',
        detail: 'Define el tipo de una variable',
        description: 'Define el tipo de una variable. Los tipos de variables son: entero, real, caracter, literal, lógico, cadena.'
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Como ${1:TipoVariable};',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Define el tipo de una variable. Los tipos de variables son: entero, real, caracter, literal, lógico, cadena.',
      range
    },
    {
      label: {
        label: 'Escribir',
        detail: 'Imprime un mensaje en pantalla',
        description: 'Imprime un mensaje en pantalla. El mensaje puede ser una cadena de texto o una variable.'
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Escribir ${1:Mensaje};',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Imprime un mensaje en pantalla. El mensaje puede ser una cadena de texto o una variable.',
      range
    },
    {
      label: {
        label: 'Leer',
        detail: 'Lee un valor desde el teclado',
        description: 'Lee un valor desde el teclado. El valor leído se almacena en una variable.'
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Leer ${1:Variable};',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Lee un valor desde el teclado. El valor leído se almacena en una variable.',
      range
    },
    {
      label: {
        label: 'Si',
        detail: 'Estructura de control condicional',
        description: 'Estructura de control condicional. Si se cumple la condición, se ejecuta el bloque de código dentro de la estructura.'
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Si ${1:Condicion} Entonces\n\t${2:// Descripción del condicional}\nFinSi',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Estructura de control condicional. Si se cumple la condición, se ejecuta el bloque de código dentro de la estructura.',
      range
    },
    {
      label: {
        label: 'Sino',
        detail: 'Estructura de control condicional',
        description: 'Estructura de control condicional. Si no se cumple la condición, se ejecuta el bloque de código dentro de la estructura.',
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Sino\n\t${1:// Descripción del condicional}',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Estructura de control condicional. Si no se cumple la condición, se ejecuta el bloque de código dentro de la estructura.',
      range
    }
  ]
}