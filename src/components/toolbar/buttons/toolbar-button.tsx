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
      <button className={`flex flex-row place-items-center gap-2 hover:bg-gray-700 p-1 rounded-lg transition-colors duration-300`} onClick={onClick}>
        <Icon className={`${color ? `${color}` : `text-white`}`}/>
      </button>
      <span className="group-hover:opacity-100 transition-opacity bg-oneDarkBlackDarker p-1 text-xs text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-3 opacity-0 m-4 mx-auto z-20 pointer-events-none">{hint}</span>
    </div>
  )
}