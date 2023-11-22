import { StreamLanguage, StringStream } from '@codemirror/language'
import { createTokens, StepCodeLexer } from 'stepcode';


const keywords = [
  StepCodeLexer.DEFINE,
  StepCodeLexer.AS,
  StepCodeLexer.PROGRAM,
  StepCodeLexer.ENDPROGRAM,
  StepCodeLexer.PROCEDURE,
  StepCodeLexer.ENDPROCEDURE,
  StepCodeLexer.FUNCTION,
  StepCodeLexer.ENDFUNCTION,
  StepCodeLexer.RETURN,
  StepCodeLexer.WRITE,
  StepCodeLexer.READ,
  StepCodeLexer.IF,
  StepCodeLexer.ELSE,
  StepCodeLexer.ELIF,
  StepCodeLexer.ENDIF,
  StepCodeLexer.WHILE,
  StepCodeLexer.ENDWHILE,
  StepCodeLexer.FOR,
  StepCodeLexer.ENDFOR,
  StepCodeLexer.TO,
  StepCodeLexer.DO,
  StepCodeLexer.BREAK,
  StepCodeLexer.CONTINUE,
  StepCodeLexer.UNTIL,
  StepCodeLexer.REPEAT,
  StepCodeLexer.CASE,
  StepCodeLexer.ENDCASE,
  StepCodeLexer.OF,
  StepCodeLexer.OTHERWISE,
  StepCodeLexer.THEN,
  StepCodeLexer.HACER,
  StepCodeLexer.MIENTRASQUE,
  StepCodeLexer.WITHSTEP,
  StepCodeLexer.DIMENSION
] as const


const operators = [
  StepCodeLexer.PLUS,
  StepCodeLexer.MINUS,
  StepCodeLexer.POWER,
  StepCodeLexer.STAR,
  StepCodeLexer.SLASH,
  StepCodeLexer.ASSIGN,
  StepCodeLexer.DIV,
  StepCodeLexer.MOD,
  StepCodeLexer.OR,
  StepCodeLexer.NOT,
  StepCodeLexer.AND,
  StepCodeLexer.EQUAL,
  StepCodeLexer.NOT_EQUAL,
  StepCodeLexer.LT,
  StepCodeLexer.LE,
  StepCodeLexer.GT,
  StepCodeLexer.GE,
] as const

const typeNames = [
  StepCodeLexer.INTEGER,
  StepCodeLexer.REAL,
  StepCodeLexer.STRING,
  StepCodeLexer.BOOLEAN,
  StepCodeLexer.CHAR
] as const

const brackets = [
  StepCodeLexer.LPAREN,
  StepCodeLexer.RPAREN,
  StepCodeLexer.LBRACK,
  StepCodeLexer.RBRACK,
] as const

const tags = [
  StepCodeLexer.BYREFERENCE,
  StepCodeLexer.BYVALUE,
] as const

const tokenClasses = new Map<number, string>([
  ...keywords.map(keyword => [keyword, 'keyword'] as [number, string]),
  ...operators.map(operator => [operator, 'operator'] as [number, string]),
  ...typeNames.map(typeName => [typeName, 'typeName'] as [number, string]),
  ...brackets.map(bracket => [bracket, 'brace'] as [number, string]),
  ...tags.map(tag => [tag, 'tag'] as [number, string]),
  [StepCodeLexer.DIRECTIVE, 'meta'],
  [StepCodeLexer.STRING_LITERAL, 'string'],
  [StepCodeLexer.NUM_INT, 'number'],
  [StepCodeLexer.NUM_REAL, 'number'],
])

let tokensMemory: [string, { start: number, end: number, type: number, value: string }[]] | [undefined, undefined] = [undefined, undefined]
export const getTokens = (code: string) => {
  const [lastCode, lastTokens] = tokensMemory
  if (lastCode === code) {
    return lastTokens
  }
  const tokens = createTokens(code)
  const rTokens =  tokens.map(token => ({
    start: token.start,
    end: token.stop,
    type: token.type,
    value: token.text
  }))
  tokensMemory = [code, rTokens]
  return tokens
}

function isFunctionCallIdentifier(str: string) {
  return !!str?.match("\\b\\w+\\s*\\(.*?\\)")
}

export const stepCodeLanguage = StreamLanguage.define({
  token(stream: StringStream): string | null {
    const tokens = getTokens(stream.string)
    const nextToken = tokens.find(token => token.start >= stream.pos)
    if (nextToken) {
      if (stream.match(nextToken.value)) {
        if (nextToken.type === StepCodeLexer.IDENT) {
          if (isFunctionCallIdentifier(stream.string.slice(nextToken.start))) {
            return 'variableName.definition'
          }
          if (tokens.find(token => token.type === StepCodeLexer.PROGRAM)) {
            return 'variableName.definition'
          }
          if (tokens.find(token => token.type === StepCodeLexer.DIRECTIVE)) {
            return 'meta'
          }
        }
        return tokenClasses.get(nextToken.type) || 'content'
      }
    }
    stream.next()
    return 'comment'
  },
  languageData: {}
})