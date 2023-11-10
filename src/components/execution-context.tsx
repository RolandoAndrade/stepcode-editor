import { createContext, useContext, useEffect, useState } from 'react';
import { useEditor } from './editor-context.tsx';
import { createInterpreterWorker } from '../core/language/workers/interpreter-worker.ts';

type TerminalInput = {
  id: string,
  type: 'input',
  onSend: (input: string) => void,
}

type TerminalOutput = {
  id: string,
  type: 'output',
  content: string,
}

type TerminalError = {
  id: string,
  type: 'error',
  content: string,
}

type TerminalIO = TerminalInput | TerminalOutput | TerminalError

type ExecutionContext = {
  isRunning: boolean;
  play: () => void;
  stop: () => void;
  showingTerminal: boolean;
  showTerminal: () => void;
  hideTerminal: () => void;
  terminalContent: TerminalIO[];
}

const ExecutionContextContext = createContext<ExecutionContext>({
  isRunning: false,
  play: () => {},
  stop: () => {},
  showingTerminal: false,
  showTerminal: () => {},
  hideTerminal: () => {},
  terminalContent: [],
})

type OutputMessage = {
  type: 'output',
  content: string,
}

type InputMessage = {
  type: 'input',
}



type FinishMessage = {
  type: 'finish',
}

type ErrorMessage = {
  type: 'error',
  error: {
    message: string,
  },
}

type Message = OutputMessage | InputMessage | ErrorMessage | FinishMessage

type InputResponse = {
  type: 'input-response',
  input: string,
}

type RunRequest = {
  type: 'run',
  code: string,
}

export function ExecutionContextProvider({children}: {children: React.ReactNode}) {
  const {content} = useEditor()


  const [isRunning, setIsRunning] = useState<boolean>(false)

  const [showingTerminal, setShowingTerminal] = useState<boolean>(false)

  const [terminalContent, setTerminalContent] = useState<TerminalIO[]>([])

  const [worker, setWorker] = useState<Worker | null>(null)

  function setupWorker(_worker: Worker) {
    if (worker) worker.terminate()
    _worker.onmessage = (event: MessageEvent<Message>) => {
      if (event.data.type === 'input') {
        setTerminalContent(prev => [
          ...prev,
          {type: 'input', onSend: (input: string) => {
              _worker.postMessage({
                type: 'input-response',
                input
              } as InputResponse)
            }, id: crypto.randomUUID()},
        ])
      }
      else if (event.data.type === 'finish') {
        setTerminalContent(prev => [
          ...prev,
          {type: 'output', content: '\nLa ejecución ha finalizado...', id: crypto.randomUUID()},
        ])
      }
      else if (event.data.type === 'error') {
        setTerminalContent(prev => [
          ...prev,
          {type: 'error', content: (event.data as ErrorMessage).error.message, id: crypto.randomUUID()},
        ])
      }
      else if (event.data.type === 'output') {
        setTerminalContent(prev => [
            ...prev,
            {type: 'output', content: (event.data as OutputMessage).content, id: crypto.randomUUID()} as TerminalOutput,
          ].slice(-50))
      }
    }
    setWorker(_worker)
  }


  function play() {
    setIsRunning(true)
    setTerminalContent([])
    const worker = createInterpreterWorker()
    setupWorker(worker)
    worker.postMessage({
      type: 'run',
      code: content
    } as RunRequest)
  }

  function stop() {
    setIsRunning(false)
    worker?.terminate()
    setWorker(null)
  }

  function showTerminal() {
    setShowingTerminal(true)
  }

  function hideTerminal() {
    setShowingTerminal(false)
  }

  useEffect(() => {
    if (isRunning) {
      showTerminal()
    } else {
      hideTerminal()
    }
  }, [isRunning])

  return (
    <ExecutionContextContext.Provider value={{isRunning, stop, play, showingTerminal, showTerminal, hideTerminal, terminalContent}}>
      {children}
    </ExecutionContextContext.Provider>
  )
}

export function useExecutionContext() {
  return useContext(ExecutionContextContext)
}