import * as worker from 'monaco-editor/esm/vs/editor/editor.worker';
import { StepCodeWorker } from './core/language/workers/stepcode-worker.ts';

self.onmessage = () => {
  worker.initialize((ctx) => new StepCodeWorker(ctx));
}