import { TokenStream } from './token-stream.ts';
// https://lisperator.net/pltut/parser/the-parser
export class Parser {
  protected precedence: { [operator: string]: number } = {
    "=": 1,
    "||": 2,
    "&&": 3,
    "<": 7,
    ">": 7,
    "<=": 7,
    ">=": 7,
    "==": 7,
    "!=": 7,
    "+": 10,
    "-": 10,
    "*": 20,
    "/": 20,
    "%": 20,
  }
  constructor(protected input: TokenStream) {
  }

  protected maybeCall(expr: () => any) {
    expr = expr();
    return this.isPunc("(") ? this.parseCall(expr) : expr;
  }

  protected delimited(start: string, stop: string, separator: string, parser: () => any) {
    const a = []
    let first = true;
    this.skipPunc(start);
    while (!this.input.eof()) {
      if (this.isPunc(stop)) break;
      if (first) first = false
      else this.skipPunc(separator);
      if (this.isPunc(stop)) break;
      a.push(parser());
    }
    this.skipPunc(stop);
    return a;
  }

  protected parseCall(func: () => any) {
    return {
      type: "call",
      func: func,
      args: this.delimited("(", ")", ",", this.parseExpression.bind(this))
    };
  }

  parseExpression() {
    return this.maybeCall(() => {
      return this.maybeBinary(this.parseAtom(), 0);
    });
  }

  isKw(kw: string) {
    const tok = this.input.peek();
    return tok && tok.type == "keyword" && (!kw || tok.value == kw) && tok;
  }
  isOp(op?: string) {
    const tok = this.input.peek();
    return tok && tok.type == "operator" && (!op || tok.value == op) && tok;
  }

  maybeBinary(left: {
    type: string;
    operator: string;
    left: any;
    right: any;
  }, precedent: number) {
    const tok = this.isOp();
    if (tok) {
      const prec = this.precedence[`${tok.value}`];
      if (prec > precedent) {
        this.input.next();
        return this.maybeBinary({
          type     : tok.value == "=" ? "assign" : "binary",
          operator : tok.value as string,
          left     : left,
          right    : this.maybeBinary(this.parseAtom(), prec)
        }, prec);
      }
    }
    return left;
  }

  parseAtom() {
    return this.maybeCall(() =>{
      if (this.isPunc("(")) {
        this.input.next();
        const exp = this.parseExpression()
        this.skipPunc(")");
        return exp;
      }
      if (this.isPunc("{")) return this.parseProg();
      if (this.isKw("if")) return this.parseIf();
      if (this.isKw("true") || this.isKw("false")) return this.parseBool();
      if (this.isKw("lambda") || this.isKw("λ")) {
        this.input.next();
        return this.parseLambda();
      }
      const tok = this.input.next();
      if (tok && (tok.type == "variable" || tok.type == "number" || tok.type == "string"))
        return tok;
      this.unexpected();
    });
  }

  protected unexpected() {
    this.input.croak("Unexpected token: " + JSON.stringify(this.input.peek()));
  }

  protected parseVarName() {
    const name = this.input.next();
    if (name?.type != "variable") this.input.croak("Expecting variable name");
    return name?.value;
  }

  protected parseLambda() {
    return {
      type: "lambda",
      vars: this.delimited("(", ")", ",", this.parseVarName.bind(this)),
      body: this.parseExpression()
    };
  }
  protected parseBool() {
    return {
      type  : "boolean",
      value : this.input.next()?.value == "true"
    };
  }

  protected parseProg() {
    const prog = this.delimited("{", "}", ";", this.parseExpression.bind(this));
    if (prog.length == 0) return {
      type: "boolean",
      value: false
    };
    if (prog.length == 1) return prog[0];
    return { type: "prog", prog: prog };
  }

  protected isPunc(ch: string) {
    const tok = this.input.peek();
    return tok && tok.type === "punctuation" && (!ch || tok.value === ch) && tok;
  }

  protected skipKw(kw: string) {
    if (this.isKw(kw)) this.input.next();
    else this.input.croak(`Expecting keyword: "${kw}"`);
  }

  protected parseIf() {
    this.skipKw("si");
    const condition = this.parseExpression();
    if (!this.isPunc("{")) this.skipKw("entonces");
    const then = this.parseExpression();
    const ret: {
      type: string;
      cond: any;
      then: any;
      else?: any;
    } = {
      type: "if",
      cond: condition,
      then: then,
    };
    if (this.isKw("else")) {
      this.input.next();
      ret.else = this.parseExpression();
    }
    return ret;
  }

  protected skipPunc(ch: string) {
    if (this.isPunc(ch)) this.input.next();
    else this.input.croak(`Expecting punctuation: "${ch}"`);
  }

  parse() {
    const prog = [];
    while (!this.input.eof()) {
      prog.push(this.parseExpression());
      if (!this.input.eof()) this.skipPunc(";");
    }
    return { type: "prog", prog: prog };
  }
}