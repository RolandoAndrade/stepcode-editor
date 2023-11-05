import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Terminal } from './terminal.tsx';
import { useEffect, useMemo, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { useExecutionContext } from '../execution-context.tsx';

export function TerminalContainer() {
  const {stop, showingTerminal, hideTerminal} = useExecutionContext()

  const [maximized, setMaximized] = useState(false)
  const [terminalDimensions, setTerminalDimensions] = useState({width: 500, height: 200})
  const windowSize = useWindowSize()
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  })
  function dragEnd(event: DragEndEvent) {
    const {delta} = event;
    setCoordinates(({x, y}) => {
      return {
        x: x + delta.x,
        y: y + delta.y,
      };
    });
  }

  const maxSize = useMemo(() => {
    console.log('windowSize', windowSize)
    return {
      width: Math.min(windowSize.width || 0, 500),
      height: Math.min(windowSize.height || 0, 200),
    }
  }, [windowSize.width, windowSize.height])

  useEffect(() => {
    console.log('maxSize', maxSize)
    if (!maximized) {
      normalize()
    }
  }, [maxSize.width, maxSize.height, maximized])


  function maximize() {
    setMaximized(true)
    setCoordinates({x: 0, y: 0})
    setTerminalDimensions({width: windowSize.width || 0, height: windowSize.height || 0})
  }

  function normalize() {
    setMaximized(false)
    const newDimensions = {
      width: Math.min(maxSize.width, 500),
      height: Math.min(maxSize.height, 200),
    }
    setTerminalDimensions(newDimensions)
    setCoordinates({
      x: (windowSize.width || 0 )/ 2 - newDimensions.width / 2,
      y: (windowSize.height || 0) / 2 - newDimensions.height / 2,
    })
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