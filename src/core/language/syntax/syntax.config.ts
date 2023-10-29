import * as monaco from 'monaco-editor';

export const sintax = {
  "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
  "name": "algo-Aix",
  "patterns": [
    {"include": "#keywords"},
    {"include": "#expression"},
    {"include": "#strings"},
    {"include": "#string"},
    {"include": "#params"}
  ],
  "repository": {
    "keywords": {
      "patterns": [
        {
          "name": "comment.line",
          "match": "//.*$"
        },
        {
          "name": "comment.block",
          "begin": "\\/\\*",
          "end": "\\*\\/"
        },
        {
          "name": "keyword.control.algo-aix",
          "match": "\\b(?i:(definir|como|esperar|hasta que|repita|retorne|para|escribir|leer|borrar|esperar))\\b"
        },
        {
          "name": "markup.italic",
          "match": "\\b(?i:(raiz|rc|abs|ln|exp|sen|cos|tan|asen|acos|atan|trunc|redon|azar|aleatorio|longitud|mayusculas|minusculas|subcadenas|concatenar|convertiranumero|convertiratexto))\\b"
        },
        {
          "name": "support.type",
          "match": "\\b(?i:(proceso|finproceso|algoritmo|inicio|fin|finalgoritmo|<-|->|:=))\\b"
        },
        {
          "name": "variable.language",
          "match": "\\b(?i:(void|real|entero|caracter|literal|lógico|logico))\\b"
        },
        {
          "name": "constant.numeric",
          "match": "\\b(?i:(verdadero|falso|true|false))\\b"
        },
        {
          "name": "storage.type",
          "match": "\\b(?i:(de otro modo|repetir|hasta que|para|finpara|hasta|con paso|funcion|finfuncion|si|entonces|sino|escoger|caso|mientras|finmientras|segun|finsegun|hacer|finsi))\\b"
        },
        {
          "name": "keyword.operator",
          "match": "\\b(?i:(es|no|distinto de|igual a|mayor que|menor que|mayor o igual a|menor o igual a|==|=|!=|<|>|<=|>=))\\b"
        },
        {
          "name": "keyword.control",
          "match": "\\b(o|y|no|or|and|not|then)\\b"
        }
      ]
    },
    "strings": {
      "name": "string.quoted.double.algo-aix",
      "begin": "\"",
      "end": "\"",
      "patterns": [
        {
          "name": "constant.character.escape.algo-aix",
          "match": "\\\\."
        }
      ]
    },
    "string": {
      "name": "string.quoted.single.algo-aix",
      "begin": "'",
      "end": "'",
      "patterns": [
        {
          "name": "constant.character.escape.algo-aix",
          "match": "\\\\."
        }
      ]
    },
    "numbers": {
      "patterns": [
        {
          "name": "constant.numeric.integer.algo-aix",
          "match": "\\b[0-9]+(?![0-9]*\\.)\\b"
        },
        {
          "name": "constant.numeric.float.algo-aix",
          "match": "\\b[0-9]+\\.[0-9]+\\b"
        }
      ]
    },
    "punctuation": {
      "patterns": [
        {
          "name": "punctuation.terminator.algo-aix",
          "match": ";"
        }
      ]
    },
    "expression": {
      "name": "support.function",
      "match": "afficher|"
    },
    "params": {
      "name": "variable.parameter",
      "match": "\\b(in|in_out|out)\\b"
    }
  },
  "scopeName": "source.algo"
}

const controlKeywords = ["definir", "como", "esperar", "hasta que", "repita", "retorne", "para", "escribir", "leer", "borrar"];
const processKeywords = ["proceso", "finproceso", "algoritmo", "inicio", "fin", "finalgoritmo"];
const internalFunctions = ["raiz", "rc", "abs", "ln", "exp", "sen", "cos", "tan", "asen", "acos", "atan", "trunc", "redon", "azar", "aleatorio", "longitud", "mayusculas", "minusculas", "subcadenas", "concatenar", "convertiranumero", "convertiratexto"];
const typesKeywords = ["void", "real", "entero", "caracter", "literal", "lógico", "logico", "cadena"];
const constantsKeywords = ["verdadero", "falso", "true", "false"];
const operatorsKeywords = ["es", "no", "distinto de", "igual a", "mayor que", "menor que", "mayor o igual a", "menor o igual a", "==", "=", "!=", "<", ">", "<=", ">="];
const controlTypeKeywords = ["de otro modo", "repetir", "hasta que", "para", "finpara", "hasta", "con paso", "funcion", "finfuncion", "si", "entonces", "sino", "escoger", "caso", "mientras", "finmientras", "segun", "finsegun", "hacer", "finsi"];
const logicKeywords = ["o", "y", "no", "or", "and", "not", "then"];
const arrows = ["←", "≠", "≤", "≥", "→"]

export const allKeywords = [
  ...controlKeywords,
  ...processKeywords,
  ...internalFunctions,
  ...typesKeywords,
  ...constantsKeywords,
  ...operatorsKeywords,
  ...controlTypeKeywords,
  ...logicKeywords,
  ...arrows
]

export const languageSyntax: monaco.languages.IMonarchLanguage = {
  controlKeywords,
  processKeywords,
  internalFunctions,
  typesKeywords,
  constantsKeywords,
  operatorsKeywords,
  controlTypeKeywords,
  logicKeywords,
  arrows,
  ignoreCase: true,
  unicode: true,
  tokenizer: {
    root: [
      [/[a-z_$][\w$]*/, {
      log: 'identifier',
      cases: {
        // Control keywords
        '@controlKeywords': 'keyword.control' ,
        // Process keywords
        '@processKeywords': 'keyword.control',
        // Functions
        '@internalFunctions': 'internal-function',
        // Types
        '@typesKeywords': 'keyword.type',
        // Constants
        '@constantsKeywords': 'keyword.constant',
        // Operators
        '@operatorsKeywords': 'keyword.operator',
        // Control types
        '@controlTypeKeywords': 'keyword.control',
        // Logic
        '@logicKeywords': 'keyword.control',
      },
    }],
      // strings
      [/".*?"/, "string"],
      [/'.*?'/, "string"],
      // numbers
      [/\d+/, "number"],
      // comments
      [/\/\/.*$/, "comment"],
      // comments with #
      [/#[^\n]*$/, "comment"],
    ]
  }
}

