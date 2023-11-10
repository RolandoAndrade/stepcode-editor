import { HiOutlineMenu, HiPlus } from 'react-icons/hi';
import { useExecutionContext } from '../execution-context.tsx';
import { GoPlay, GoTerminal } from 'react-icons/go';
import { FaRegStopCircle } from 'react-icons/fa';
import { ToolbarButton } from './buttons/toolbar-button.tsx';
import { ThemeChanger } from './theme-changer.tsx';
import { MdFolderOpen, MdOutlineSave } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';

export function Toolbar() {
  const {isRunning, play, stop, showTerminal} = useExecutionContext()

  const [showMenu, setShowMenu] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        hideMenuElements();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function showMenuElements() {
    setShowMenu(true)
  }

  function hideMenuElements() {
    setShowMenu(false)
  }

  return (
    <div className="flex flex-row justify-between items-center p-1 text-xl px-3 bg-white dark:bg-oneDarkBlack">
      <div className="flex flex-row justify-start items-center" onBlur={hideMenuElements} ref={ref}>
        <div className="flex flex-row justify-start items-center h-full gap-2">
          {!showMenu && <ToolbarButton icon={HiOutlineMenu} onClick={showMenuElements} hint={'Menú'}/>}
          {showMenu && <ToolbarButton icon={MdOutlineSave} onClick={()=>{}} hint={'Guardar'}/>}
          {showMenu && <ToolbarButton icon={HiPlus} onClick={()=>{}} hint={'Nuevo'}/>}
          {showMenu && <ToolbarButton icon={MdFolderOpen} onClick={()=>{}} hint={'Abrir'}/>}
          {showMenu && <ThemeChanger/>}
        </div>
      </div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex flex-row justify-end items-center h-full gap-2">
          {isRunning && <ToolbarButton icon={GoTerminal} onClick={showTerminal} hint={'Terminal'}/>}
          {!isRunning && <ToolbarButton icon={GoPlay} onClick={play} hint={'Ejecutar'}/>}
          {isRunning && <ToolbarButton icon={FaRegStopCircle} onClick={stop} hint={'Detener'} color={'text-red-500'}/>
          }
        </div>

      </div>
    </div>

  )
}