import { useDraggable } from '@dnd-kit/core';
import { Dialog } from '@headlessui/react';
import { CSS } from '@dnd-kit/utilities';

export function TerminalUI ({coordinates, width, height, toggleMaximize, minimize}: any) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable-1',
  });

  return (
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
        width: width,
        height: height,
      }}>
        <div className="bg-black text-white p-4 font-mono rounded-lg w-full h-full transition-all duration-300">
          <div className="flex items-center mb-2">
            <button onClick={() => console.log('closed')}
                    className="w-3 h-3 rounded-full bg-red-500 mr-2"></button>
            <button onClick={minimize} className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></button>
            <button onClick={toggleMaximize} className="w-3 h-3 rounded-full bg-green-500 mr-2"></button>
            <div className="w-full h-3 rounded-full" {...listeners} {...attributes}></div>
          </div>
          <div className="flex">
            <span className="text-green-500 mr-1">guest@terminal:</span>
            <span className="text-gray-400">~$</span>
            <input
              type="text"
              className="bg-transparent ml-1 focus:outline-none"
            />
          </div>
          <div className="mt-2">
                    <pre className="text-gray-300">
                      {`Welcome to the terminal!
            Type 'help' to see available commands.`}
                    </pre>
          </div>
        </div>
      </Dialog.Panel>
    </div>
  )
}