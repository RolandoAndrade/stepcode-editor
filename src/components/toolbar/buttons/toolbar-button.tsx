import { IconType } from 'react-icons';

type Props = {
  icon: IconType,
  onClick: () => void,
  hint: string,
  color?: string,
}

export function ToolbarButton({icon: Icon, onClick, hint, color}: Props) {
  return (
    <div className="group flex relative">
      <button className={`flex flex-row place-items-center gap-2 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-300`} onClick={onClick}>
        <Icon className={`${color ? `text-${color}` : `text-white`}`}/>
      </button>
      <span className="group-hover:opacity-100 transition-opacity bg-oneDarkBlackDarker px-1 text-[0.5rem] text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto z-20 pointer-events-none">{hint}</span>
    </div>
  )
}