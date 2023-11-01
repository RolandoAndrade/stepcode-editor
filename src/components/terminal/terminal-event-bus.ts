interface EventCallbacks {
  [event: string]: ((...args: any[]) => void)[];
}
export class TerminalEventBus {
  protected events: EventCallbacks = {};
  
  public on(event: string, callback: () => void ): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  public off(event: string, callback: () => void ): void {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }
  
  public emit(event: string, ...args: any[]): void {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach((cb) => cb(...args));
  }
}