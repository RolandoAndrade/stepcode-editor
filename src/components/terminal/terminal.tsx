import { Fragment, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { TerminalButtons } from './buttons/terminal-buttons.tsx';
import { TerminalInput } from './io/terminal-input.tsx';
import { TerminalOutput } from './io/terminal-output.tsx';
import { useExecutionContext } from '../execution-context.tsx';
import './terminal.css'

type Props = {
  coordinates: {x: number, y: number},
  maximized: boolean,
  terminalDimensions: {width: number, height: number},
  maximize: () => void,
  normalize: () => void,
  minimize: () => void,
  close: () => void,
}
export function Terminal({coordinates, maximize, normalize, maximized, terminalDimensions, minimize, close}: Props) {
  const {terminalContent} = useExecutionContext()
  function toggleMaximize() {
    if (maximized) {
      normalize()
    } else {
      maximize()
    }
  }

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable-1',
  });

  const terminalContentRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    terminalContentRef.current?.scrollTo({
      top: terminalContentRef.current!.scrollHeight,
      behavior: 'smooth'
    })
  }, [terminalContent.length])

  return (
      <Transition show={true} appear as={Fragment}>
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
                  <div
                    ref={setNodeRef}
                    style={{
                      position: 'absolute',
                      left: `${coordinates.x}px`,
                      top: `${coordinates.y}px`,
                      transform: CSS.Translate.toString(transform)
                    }}
                  >
                    <Dialog.Panel
                      className="text-sm bg-black transform overflow-hidden rounded-2xl text-left text-white font-mono align-middle shadow-xl transition-all" style={{
                      width: terminalDimensions.width,
                      height: terminalDimensions.height,
                    }}>
                      <div className="bg-oneDarkBlack text-white p-4 font-mono rounded-lg w-full h-full transition-all duration-300 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <TerminalButtons onClick={close} hint={'Stop'} color={'bg-red-500'}/>
                          <TerminalButtons onClick={minimize} hint={'Minimize'} color={'bg-yellow-500'}/>
                          <TerminalButtons onClick={toggleMaximize} hint={maximized ? `Restore` : `Maximize`} color={'bg-green-500'}/>
                          <div className={`w-full h-3 rounded-full ${attributes['aria-pressed'] ? 'cursor-grabbing' : 'cursor-grab'}` } {...listeners} {...attributes}></div>
                        </div>
                        <div className={'overflow-y-auto terminal-scrollbar'} ref={terminalContentRef} onClick={() => {
                          terminalContentRef.current?.focus()
                        }}>
                          {
                            terminalContent.map((content) => {
                              if (content.type === 'input') {
                                return <TerminalInput key={`${content.id}`} onSend={content.onSend}/>
                              }
                              return <TerminalOutput key={`${content.id}`}>{content.content}</TerminalOutput>
                            })
                          }
                        </div>
                      </div>
                    </Dialog.Panel>
                  </div>                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

  )
}
