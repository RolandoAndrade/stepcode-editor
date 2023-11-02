import { HiOutlineMenu, HiOutlinePlay, HiOutlineStop } from 'react-icons/hi';
import { useExecutionContext } from '../execution-context.tsx';

export function Toolbar() {
  const {isRunning, play, stop} = useExecutionContext()

  return (
    <div className="flex flex-row justify-between items-center p-2 text-4xl sm:text-base">
      <div className="flex flex-row justify-start items-center ml-3">
        <div className="flex flex-row justify-start items-center h-full gap-3">
          <button>
            <HiOutlineMenu className="text-white"/>
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex flex-row justify-end items-center h-full mr-3 gap-3">
          <button className={`${isRunning && 'hidden'}`} onClick={play}>
            <HiOutlinePlay className="text-white"/>
          </button>
          <button className={`${!isRunning && 'hidden'}`} onClick={stop}>
            <HiOutlineStop className="text-red-500"/>
          </button>
        </div>

      </div>
    </div>

  )
}