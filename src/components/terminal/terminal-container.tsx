import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Terminal } from './terminal.tsx';
import { useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { useExecutionContext } from '../execution-context.tsx';

export function TerminalContainer() {
  const {stop, showingTerminal, hideTerminal} = useExecutionContext()

  const [maximized, setMaximized] = useState(false)
  const [terminalDimensions, setTerminalDimensions] = useState({width: 500, height: 200})
  const windowSize = useWindowSize()
  const [coordinates, setCoordinates] = useState({x: (window.innerWidth || 0) / 2 - terminalDimensions.width / 2, y: (window.innerHeight || 0) / 2 - terminalDimensions.height / 2})

  function dragEnd(event: DragEndEvent) {
    const {delta} = event;
    setCoordinates(({x, y}) => {
      return {
        x: x + delta.x,
        y: y + delta.y,
      };
    });
  }



  function maximize() {
    setMaximized(true)
    setCoordinates({x: 0, y: 0})
    setTerminalDimensions({width: windowSize.width!, height: windowSize.height!})
  }

  function normalize() {
    setMaximized(false)
    setTerminalDimensions({width: 500, height: 200})
    setCoordinates({x: windowSize.width!/ 2 - 250, y: windowSize.height! / 2 - 100})
  }

  function close(){
    stop()
  }

  return (
    <DndContext onDragEnd={dragEnd}>
      {showingTerminal && <Terminal coordinates={coordinates} terminalDimensions={terminalDimensions} maximized={maximized} maximize={maximize}
      normalize={normalize} minimize={hideTerminal} close={close}></Terminal>}
    </DndContext>
  )
}