export function createInterpreterWorker() {
    return new Worker(new URL('./interpreter.worker.ts', import.meta.url), {type: 'module'})
}