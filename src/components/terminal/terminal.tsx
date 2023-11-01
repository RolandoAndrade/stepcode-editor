import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { TerminalUI } from './terminal-ui.tsx';
import { useWindowSize } from '@uidotdev/usehooks';

export function Terminal() {

  const [maximized, setMaximized] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const windowSize = useWindowSize()
  const [terminalDimensions, setTerminalDimensions] = useState({width: 500, height: 200})

  function maximize() {
    setMaximized(true)
    setCoordinates({x: 0, y: 0})
  }

  useEffect(() => {
    if (maximized) {
      setTerminalDimensions(windowSize as {width: number, height: number})
    }
  }, [maximized, windowSize.width, windowSize.height])

  function toggleMaximize() {
    if (maximized) {
      normalize()
    } else {
      maximize()
    }
  }

  function normalize() {
    setMaximized(false)
    setTerminalDimensions({width: 500, height: 200})
    setCoordinates({x: window.innerWidth / 2 - 250, y: window.innerHeight / 2 - 100})
  }

  function minimize() {
    setMinimized(true)
  }

  function restore() {
    setMinimized(false)
  }


  const [coordinates, setCoordinates] = useState({x: 0, y: 0});

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



  return (
    <DndContext onDragEnd={dragEnd}>
      <>
        <button
          type="button"
          onClick={restore}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open dialog
        </button>

        <Transition appear show={!minimized} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={minimize}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25"/>
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden" >
              <div className=" min-h-full">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div>
                    <TerminalUI coordinates={coordinates} width={terminalDimensions.width} height={terminalDimensions.height} toggleMaximize={toggleMaximize} minimize={minimize}></TerminalUI>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </DndContext>

  )
}

/**
 * <div className="bg-transparent fixed inset-0 flex flex-1 items-center justify-center backdrop-filter backdrop-blur-[2px] bg-black bg-opacity-30" style={{
 *       display: minimized ? 'none' : 'flex',
 *     }}>
 *       <section className="bg-transparent rounded-lg shadow-lg overflow-hidden" style={{
 *         width: width,
 *         height: height,
 *       }}>
 *         <div className="bg-black text-white font-mono p-4 rounded-lg w-full h-full transition-all duration-300">
 *           <div className="flex items-center mb-2">
 *             <button onClick={()=>console.log('closed')} className="w-3 h-3 rounded-full bg-red-500 mr-2"></button>
 *             <button onClick={minimize} className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></button>
 *             <button onClick={toggleMaximize} className="w-3 h-3 rounded-full bg-green-500"></button>
 *           </div>
 *           <div className="flex">
 *             <span className="text-green-500 mr-1">guest@terminal:</span>
 *             <span className="text-gray-400">~$</span>
 *             <input
 *               type="text"
 *               className="bg-transparent ml-1 focus:outline-none"
 *             />
 *           </div>
 *           <div className="mt-2">
 *         <pre className="text-gray-300">
 *           {`Welcome to the terminal!
 * Type 'help' to see available commands.`}
 *         </pre>
 *           </div>
 *         </div>
 *       </section>
 *     </div>
 */