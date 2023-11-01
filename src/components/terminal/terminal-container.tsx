import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Terminal } from './terminal.tsx';
import { useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';

export function TerminalContainer() {

  const [maximized, setMaximized] = useState(false)
  const [terminalDimensions, setTerminalDimensions] = useState({width: 500, height: 200})
  const windowSize = useWindowSize()
  const [minimized, setMinimized] = useState(false)
  const [coordinates, setCoordinates] = useState({x: (window.innerWidth || 0) / 2 - terminalDimensions.width / 2, y: (window.innerHeight || 0) / 2 - terminalDimensions.height / 2})
  console.log(coordinates)
  function dragEnd(event: DragEndEvent) {
    console.log(event)
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
  }

  function normalize() {
    setMaximized(false)
    setTerminalDimensions({width: 500, height: 200})
    setCoordinates({x: windowSize.width!/ 2 - 250, y: windowSize.height! / 2 - 100})
  }

  function minimize() {
    setMinimized(true)
  }

  function restore() {
    setMinimized(false)
  }

  useEffect(() => {
    if (maximized) {
      setTerminalDimensions(windowSize as {width: number, height: number})
    }
  }, [maximized, windowSize.width, windowSize.height])

  return (
    <DndContext onDragEnd={dragEnd}>
      minimize && <Terminal coordinates={coordinates} terminalDimensions={terminalDimensions} maximized={maximized} maximize={maximize}
      normalize={normalize} minimize={minimize}></Terminal>
    </DndContext>
  )
}