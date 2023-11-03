import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { TerminalButtons } from './buttons/terminal-buttons.tsx';
import { TerminalInput } from './io/terminal-input.tsx';
import { TerminalOutput } from './io/terminal-output.tsx';
import { useExecutionContext } from '../execution-context.tsx';

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
                      className="bg-black transform overflow-hidden rounded-2xl text-left text-white font-mono align-middle shadow-xl transition-all" style={{
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
                        {
                          terminalContent.map((content, index) => {
                            if (content.type === 'input') {
                              return <TerminalInput key={`terminal-${index}`} onSend={content.onSend}/>
                            }
                            return <TerminalOutput key={`terminal-${index}`}>{content.content}</TerminalOutput>
                          })
                        }
  
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
 *             <buttons onClick={()=>console.log('closed')} className="w-3 h-3 rounded-full bg-red-500 mr-2"></buttons>
 *             <buttons onClick={minimize} className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></buttons>
 *             <buttons onClick={toggleMaximize} className="w-3 h-3 rounded-full bg-green-500"></buttons>
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