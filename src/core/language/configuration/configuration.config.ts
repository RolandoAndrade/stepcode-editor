import * as monaco from 'monaco-editor';

export const languageConfiguration: monaco.languages.LanguageConfiguration = {
  "comments": {
    // symbol used for single line comment. Remove this entry if your language does not support line comments
    "lineComment": "//",
    // symbols used for start and end a block comment. Remove this entry if your language does not support block comments
    "blockComment": [
      "[",
      "]"
    ]
  },
  // symbols used as brackets
  "brackets": [
    [
      "{",
      "}"
    ],
    [
      "[",
      "]"
    ],
    [
      "(",
      ")"
    ]
  ],
  // symbols that are auto closed when typing
  "autoClosingPairs": [
    {
      "open": "Proceso",
      "close": "FinProceso"
    },
    {
      "open": "Algoritmo",
      "close": "FinAlgoritmo"
    },
    {
      "open": "{",
      "close": "}"
    },
    {
      "open": "[",
      "close": "]"
    },
    {
      "open": "(",
      "close": ")"
    },
    {
      "open": `"`,
      "close": `"`
    },
    {
      "open": "'",
      "close": "'"
    }
  ],
  // symbols that that can be used to surround a selection
  "surroundingPairs": [
    {
      "open": "{",
      "close": "}"
    },
    {
      "open": "[",
      "close": "]"
    },
    {
      "open": "(",
      "close": ")"
    },
    {
      "open": `"`,
      "close": `"`
    },
    {
      "open": "'",
      "close": "'"
    }
  ]
}