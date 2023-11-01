

type InputStreamProps<T> = {
  input: T;
}

export abstract class InputStream<InputType, ReturnType = InputType> {
  protected pos: number;
  protected line: number;
  protected col: number;
  protected input: InputType;

  constructor({ input }: InputStreamProps<InputType>) {
    this.pos = 0;
    this.line = 1;
    this.col = 0;
    this.input = input;
  }

  public abstract next(): ReturnType;

  public abstract peek(): ReturnType;

  public abstract eof(): boolean;

  public croak(msg: string): void {
    throw new Error(`${msg} (${this.line}:${this.col})`);
  }
}