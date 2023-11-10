import { EventBus, interpret } from 'stepcode';

type RunRequest = {
  type: 'run',
  code: string,
}

type InputResponse = {
  type: 'input-response',
  input: string,
}


type Message = RunRequest | InputResponse;

let resolveInput: (s: string) => void = () => { };

self.onmessage = (e: MessageEvent<Message>) => {
  const eventBus = new EventBus();
  eventBus.on('input-request', (resolve: (s: string) => void) => {
    self.postMessage({ type: 'input' });
    resolveInput = resolve;
  });
  eventBus.on('output-request', (content: string) => {
    self.postMessage({ type: 'output', content });
  })
  if (e.data.type === 'run') {
    interpret({
      code: e.data.code,
      eventBus
    }).then(() => {
      self.postMessage({ type: 'finish' });
    }).catch((e) => {
      self.postMessage({ type: 'error', error: e });
    })
  } else if (e.data.type === 'input-response') {
    resolveInput(e.data.input);
    resolveInput = () => { };
  }
};