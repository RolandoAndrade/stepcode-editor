import { StreamLanguage, StringStream } from '@codemirror/language'
import { createTokens } from 'stepcode';

const tokenClasses = new Map([
  [101, 'string'],
  [102, 'number'],
])

export const getTokens = (code: string) => {
  const tokens = createTokens(code)
  return tokens.map(token => ({
    start: token.start,
    end: token.stop,
    type: token.type,
    value: token.text
  }))
}

export const stepCodeLanguage = StreamLanguage.define({
  token(stream: StringStream): string | null {

    const nextToken = getTokens(stream.string).find(token => token.start >= stream.pos)
    if (nextToken) {
      if (stream.match(nextToken.value)) {
        console.log(nextToken.type == 101 ? 'string' : 'number')
        return tokenClasses.get(nextToken.type) || 'name'
      }
    }
    stream.next()
    return null
  }
})