import { createContext, useContext, useState } from 'react';

type ExecutionContext = {
  isRunning: boolean;
  play: () => void;
  stop: () => void;
}

const ExecutionContextContext = createContext<ExecutionContext>({
  isRunning: false,
  play: () => {},
  stop: () => {},
})

export function ExecutionContextProvider({children}: {children: React.ReactNode}) {

  const [isRunning, setIsRunning] = useState<boolean>(false)

  function play() {
    setIsRunning(true)
  }

  function stop() {
    setIsRunning(false)
  }

  return (
    <ExecutionContextContext.Provider value={{isRunning, stop, play}}>
      {children}
    </ExecutionContextContext.Provider>
  )
}

export function useExecutionContext() {
  return useContext(ExecutionContextContext)
}