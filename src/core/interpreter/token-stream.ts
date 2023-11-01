import { InputStream } from './input-stream.ts';
import { Token } from './token.ts';
import { CharInputStream } from './char-input-stream.ts';


export class TokenStream extends InputStream<CharInputStream,Token | undefined> {

  protected keywords: Set<string> = new Set([
    "si",
    "entonces",
    "sino",
    "finsi",
    "mientras",
    "hacer",
    "finmientras",
    "funcion",
    "regresa",
    "verdadero",
    "falso",
    "definir",
    "proceso",
    "algoritmo",
    "finproceso",
    "finfuncion",
    "finalgoritmo",
    "leer",
    "escribir",
    "entero",
    "real",
    "cadena",
    "caracter",
    "logico",
  ]);

  protected operators: Set<string> = new Set([
    "+",
    "-",
    "*",
    "/",
  ])

  protected current: Token | undefined;



  eof(): boolean {
    return !this.peek();
  }

  next() {
    const token = this.current;
    this.current = undefined;
    return token || this.readNext();
  }

  peek() {
    return this.current || (this.current = this.readNext());
  }

  protected isKeyword(x: string): boolean {
    return this.keywords.has(x);
  }


  protected readWhile(predicate: (ch: string) => boolean): string {
    let str = "";
    while (!this.input.eof() && predicate(this.input.peek())) {
      str += this.input.next();
    }
    return str;
  }

  protected isWhitespace(ch: string): boolean {
    return " \t\n".indexOf(ch) >= 0;
  }

  protected isDigit(ch: string): boolean {
    return /[0-9]/i.test(ch);
  }

  protected isIdStart(ch: string): boolean {
    return /[a-z_]/i.test(ch);
  }

  protected isId(ch: string): boolean {
    return this.isIdStart(ch) || "?!-<>=0123456789".indexOf(ch) >= 0;
  }

  protected isOpChar(ch: string): boolean {
    return this.operators.has(ch);
  }

  protected isPunc(ch: string): boolean {
    return ",;(){}[]".indexOf(ch) >= 0;
  }

  protected isStringStart(ch: string): boolean {
    return ch === "\"";
  }

  protected isCommentStart(ch: string): boolean {
    return ch === "#" ;
  }

  protected isLineEnd(ch: string): boolean {
    return ch === "\n";
  }

  protected skipComment(): void {
    this.readWhile((ch) => !this.isLineEnd(ch));
    this.input.next();
  }

  protected readEscaped(end: string): string {
    let escaped = false;
    let str = "";
    this.input.next();
    while (!this.input.eof()) {
      const ch = this.input.next();
      if (escaped) {
        str += ch;
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === end) {
        break;
      } else {
        str += ch;
      }
    }
    return str;
  }

  protected readString(): Token {
    return {
      type: "string",
      value: this.readEscaped("\""),
    };
  }

  protected readNumber(): Token {
    let hasDot = false;
    const number = this.readWhile((ch) => {
      if (ch == ".") {
        if (hasDot) return false;
        hasDot = true;
        return true;
      }
      return this.isDigit(ch);
    });
    return { type: "number", value: parseFloat(number) };
  }

  protected readIdent(): Token {
    const id = this.readWhile(this.isId);
    return {
      type: this.isKeyword(id) ? "keyword" : "variable",
      value: id,
    };
  }



  protected readNext(): Token | undefined {
    this.readWhile(this.isWhitespace);
    if (this.input.eof()) {
      return;
    }
    const ch = this.input.peek();
    if (this.isCommentStart(ch)) {
      this.skipComment();
      return this.readNext();
    }
    if (this.isStringStart(ch)) {
      return this.readString();
    }
    if (this.isDigit(ch)) {
      return this.readNumber();
    }
    if (this.isIdStart(ch)) {
      return this.readIdent();
    }
    if (this.isPunc(ch)) {
      return {
        type: "punctuation",
        value: this.input.next(),
      };
    }
    if (this.isOpChar(ch)) {
      return {
        type: "operator",
        value: this.readWhile(this.isOpChar),
      };
    }
    this.input.croak(`Can't handle character: ${ch}`);
  }

}