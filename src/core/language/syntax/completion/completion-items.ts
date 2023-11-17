import { languages } from 'monaco-editor';

export function createCompletionItems(range: languages.CompletionItem['range']): languages.CompletionItem[] {
  return [
    {
      label: {
        label: 'Proceso',
        detail: 'Define un proceso o algoritmo',
        description: 'Define un proceso o algoritmo. En este se pueden definir variables, constantes, funciones, etc. para resolver un problema.'
      },
      kind: languages.CompletionItemKind.Struct,
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
      kind: languages.CompletionItemKind.Struct,
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
      kind: languages.CompletionItemKind.Function,
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
      kind: languages.CompletionItemKind.Function,
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
        label: 'Sino Si',
        detail: 'Estructura de control condicional',
        description: 'Estructura de control condicional. Si se cumple la condición, se ejecuta el bloque de código dentro de la estructura.'
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Sino Si ${1:Condicion} Entonces\n\t${2:// Descripción del condicional}',
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
    },
    {
      label: {
        label: 'Segun',
        detail: 'Estructura de control de selección múltiple',
        description: 'Estructura de control de selección múltiple. Se evalúa una expresión y se ejecuta el bloque de código que corresponda al valor de la expresión.'
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Segun ${1:expresion} Hacer\n\t${2:valor}:\n\t\t${3:// Descripción del caso}\n\t${4:valor}:\n\t\t${5:// Descripción del caso}\n\tDe otro modo:\n\t\t${6:// Caso por defecto}\nFinSegun',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Estructura de control de selección múltiple. Se evalúa una expresión y se ejecuta el bloque de código que corresponda al valor de la expresión.',
      range
    },
    {
      label: {
        label: 'Entero',
        detail: 'Tipo de dato numérico',
        description: 'Tipo de dato numérico. Se utiliza para almacenar números enteros.'
      },
      kind: languages.CompletionItemKind.Operator,
      insertText: 'Entero',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Tipo de dato numérico. Se utiliza para almacenar números enteros.',
      range
    },
    {
      label: {
        label: 'Real',
        detail: 'Tipo de dato numérico',
        description: 'Tipo de dato numérico. Se utiliza para almacenar números reales.'
      },
      kind: languages.CompletionItemKind.Operator,
      insertText: 'Real',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Tipo de dato numérico. Se utiliza para almacenar números reales.',
      range
    },
    {
      label: {
        label: 'Cadena',
        detail: 'Tipo de dato alfanumérico',
        description: 'Tipo de dato alfanumérico. Se utiliza para almacenar cadenas de texto.'
      },
      kind: languages.CompletionItemKind.Text,
      insertText: 'Cadena',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Tipo de dato alfanumérico. Se utiliza para almacenar cadenas de texto.',
      range
    },
    {
      label: {
        label: 'Caracter',
        detail: 'Tipo de dato alfanumérico',
        description: 'Tipo de dato alfanumérico. Se utiliza para almacenar caracteres.'
      },
      kind: languages.CompletionItemKind.Text,
      insertText: 'Caracter',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Tipo de dato alfanumérico. Se utiliza para almacenar caracteres.',
      range
    },
    {
      label: {
        label: 'Logico',
        detail: 'Tipo de dato lógico',
        description: 'Tipo de dato lógico. Se utiliza para almacenar valores de verdad.'
      },
      kind: languages.CompletionItemKind.Operator,
      insertText: 'Logico',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Tipo de dato lógico. Se utiliza para almacenar valores de verdad.',
      range
    },
    {
      label: {
        label: 'Mientras',
        detail: 'Estructura de control repetitiva',
        description: 'Estructura de control repetitiva. Se ejecuta el bloque de código mientras se cumpla la condición.'
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Mientras ${1:Condicion} Hacer\n\t${2:// Descripción del ciclo}\n\t${3:// Alterar parámetro de salida}\nFinMientras',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Estructura de control repetitiva. Se ejecuta el bloque de código mientras se cumpla la condición.',
      range
    },
    {
      label: {
        label: 'Para',
        detail: 'Estructura de control repetitiva',
        description: 'Estructura de control repetitiva. Se ejecuta el bloque de código mientras el parámetro de salida se encuentre dentro del rango especificado.'
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Para ${1:Variable} ← ${2:ValorInicial} Hasta ${3:ValorFinal} Con Paso ${4:Incremento} Hacer\n\t${5:// Descripción del ciclo}\nFinPara',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Estructura de control repetitiva. Se ejecuta el bloque de código mientras el parámetro de salida se encuentre dentro del rango especificado.',
      range
    },
    {
      label: {
        label: 'Longitud',
        detail: 'Función para obtener la longitud de una cadena',
        description: 'Función para obtener la longitud de una cadena. Retorna un valor entero.'
      },
      kind: languages.CompletionItemKind.Function,
      insertText: 'Longitud(${1:Cadena})',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Función para obtener la longitud de una cadena. Retorna un valor entero.',
      range
    },
    {
      label: {
        label: 'Subcadena',
        detail: 'Función para obtener una subcadena de una cadena',
        description: 'Función para obtener una subcadena de una cadena. Retorna una cadena.'
      },
      kind: languages.CompletionItemKind.Function,
      insertText: 'Subcadena(${1:Cadena}, ${2:Inicio}, ${3:Fin})',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Función para obtener una subcadena de una cadena. Retorna una cadena.',
      range
    },
    {
      label: {
        label: 'Mayusculas',
        detail: 'Función para convertir una cadena a mayúsculas',
        description: 'Función para convertir una cadena a mayúsculas. Retorna una cadena.'
      },
      kind: languages.CompletionItemKind.Function,
      insertText: 'Mayusculas(${1:Cadena})',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Función para convertir una cadena a mayúsculas. Retorna una cadena.',
      range
    },
    {
      label: {
        label: 'Minusculas',
        detail: 'Función para convertir una cadena a minúsculas',
        description: 'Función para convertir una cadena a minúsculas. Retorna una cadena.'
      },
      kind: languages.CompletionItemKind.Function,
      insertText: 'Minusculas(${1:Cadena})',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Función para convertir una cadena a minúsculas. Retorna una cadena.',
      range
    },
    {
      label: {
        label: 'Dimension',
        detail: 'Define un arreglo de datos',
        description: 'Define un arreglo de datos. Los arreglos son espacios de memoria que se utilizan para almacenar datos.'
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Dimension ${1:Variable}[${2:Dimensiones}];',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Define un arreglo de datos. Los arreglos son espacios de memoria que se utilizan para almacenar datos.',
      range
    },
    {
      label: {
        label: 'SubProceso',
        detail: 'Define un subproceso',
        description: 'Define un subproceso. Un subproceso es un bloque de código que se puede reutilizar en el proceso principal.'
      },
      kind: languages.CompletionItemKind.Struct,
      insertText: 'SubProceso ${1:NombreSubProceso}(${2:Parametros})\n\t${3:// Descripcion del subproceso}\nFinSubProceso',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Define un subproceso. Un subproceso es un bloque de código que se puede reutilizar en el proceso principal.',
      range
    },
    {
      label: {
        label: 'SubAlgoritmo',
        detail: 'Define un subproceso',
        description: 'Define un subproceso. Un subproceso es un bloque de código que se puede reutilizar en el proceso principal.'
      },
      kind: languages.CompletionItemKind.Struct,
      insertText: 'SubAlgoritmo ${1:NombreSubProceso}(${2:Parametros})\n\t${3:// Descripcion del subproceso}\nFinSubAlgoritmo',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Define un subproceso. Un subproceso es un bloque de código que se puede reutilizar en el proceso principal.',
      range
    },
    {
      label: {
        label: 'Por Valor',
        detail: 'Define un parámetro por valor',
        description: 'Define un parámetro por valor. Los parámetros por valor se utilizan para pasar valores a un subproceso.'
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Por Valor',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Define un parámetro por valor. Los parámetros por valor se utilizan para pasar valores a un subproceso.',
      range
    },
    {
      label: {
        label: 'Por Referencia',
        detail: 'Define un parámetro por referencia',
        description: 'Define un parámetro por referencia. Los parámetros por referencia se utilizan para pasar valores a un subproceso.'
      },
      kind: languages.CompletionItemKind.Keyword,
      insertText: 'Por Referencia',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Define un parámetro por referencia. Los parámetros por referencia se utilizan para pasar valores a un subproceso.',
      range
    },
    {
      label: {
        label: 'Funcion',
        detail: 'Define una función',
        description: 'Define una función. Las funciones son bloques de código que retornan un valor.'
      },
      kind: languages.CompletionItemKind.Struct,
      insertText: 'Funcion ${1:NombreFuncion}(${2:Parametros}): ${3:TipoRetorno}\n\t${4:// Descripcion de la funcion}\nFinFuncion',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Define una función. Las funciones son bloques de código que retornan un valor.',
      range
    },
    {
      label: {
        label: 'Funcion PSeInt',
        detail: 'Define una función con el estilo de PSeInt',
        description: 'Define una función. Las funciones son bloques de código que retornan un valor.'
      },
      kind: languages.CompletionItemKind.Struct,
      insertText: 'Funcion ${1:VariableDeRetorno} ← ${2:NombreFuncion}(${3:Parametros})\n\t${4:// Descripcion de la funcion}\n\tDefinir ${1:VariableDeRetorno} Como ${5:TipoVariable};\nFinFuncion',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'Define una función. Las funciones son bloques de código que retornan un valor.',
      range
    }
  ]
}