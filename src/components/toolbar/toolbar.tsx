import { HiOutlineMenu } from 'react-icons/hi';
import { useExecutionContext } from '../execution-context.tsx';
import { GoPlay, GoTerminal } from 'react-icons/go';
import { FaRegStopCircle } from 'react-icons/fa';
import { ToolbarButton } from './buttons/toolbar-button.tsx';

export function Toolbar() {
  const {isRunning, play, stop} = useExecutionContext()

  return (
    <div className="flex flex-row justify-between items-center p-2 text-4xl sm:text-base px-3">
      <div className="flex flex-row justify-start items-center">
        <div className="flex flex-row justify-start items-center h-full gap-2">
          <ToolbarButton icon={HiOutlineMenu} onClick={()=>{}} hint={'Menu'}/>
        </div>
      </div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex flex-row justify-end items-center h-full gap-2">
          <ToolbarButton icon={GoTerminal} onClick={()=>{}} hint={'Terminal'}/>
          {!isRunning && <ToolbarButton icon={GoPlay} onClick={play} hint={'Run'}/>}
          {isRunning && <ToolbarButton icon={FaRegStopCircle} onClick={stop} hint={'Stop'} color={'red-500'}/>
          }
        </div>

      </div>
    </div>

  )
}