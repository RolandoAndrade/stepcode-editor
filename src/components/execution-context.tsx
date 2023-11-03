import { createContext, useContext, useEffect, useState } from 'react';
import { TerminalInput } from './terminal/io/terminal-input.tsx';

import { StepCodeInterpreter, EventBus, interpret } from 'stepcode';
import { useEditor } from './editor-context.tsx';

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

type TerminalIO = TerminalInput | TerminalOutput

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


export function ExecutionContextProvider({children}: {children: React.ReactNode}) {
  const {content} = useEditor()
  const eventBus = new EventBus();
  const interpreter = new StepCodeInterpreter(eventBus)

  const [isRunning, setIsRunning] = useState<boolean>(false)

  const [showingTerminal, setShowingTerminal] = useState<boolean>(false)

  const [terminalContent, setTerminalContent] = useState<TerminalIO[]>([])

  eventBus.on('output-request', (output: string) => {
    setTerminalContent(prev => [
      ...prev,
      {type: 'output', content: output, id: crypto.randomUUID()},
    ])
  })

  eventBus.on('input-request', (resolve: (input: string) => void) => {
    setTerminalContent(prev => [
      ...prev,
      {type: 'input', onSend: resolve, id: crypto.randomUUID()},
    ])
  })


  function play() {
    setIsRunning(true)
    setTerminalContent([])
    interpret(content, interpreter).then(() => {
      setTerminalContent(prev => [
        ...prev,
        {type: 'output', content: '\nLa ejecución ha finalizado...', id: crypto.randomUUID()},
      ])
    })
  }

  function stop() {
    setIsRunning(false)
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