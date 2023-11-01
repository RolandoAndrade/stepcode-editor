import { InputStream } from './input-stream.ts';

export class CharInputStream extends InputStream<string> {

  public next(): string {
    const ch = this.input.charAt(this.pos++);
    if (ch === "\n") {
      this.line++;
      this.col = 0;
    } else {
      this.col++;
    }
    return ch;
  }

  public peek(): string {
    return this.input.charAt(this.pos);
  }

  public eof(): boolean {
    return this.peek() === "";
  }
}