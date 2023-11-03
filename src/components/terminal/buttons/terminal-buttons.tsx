

type Props = {
  onClick: () => void,
  hint: string,
  color: string,
}

export function TerminalButtons({onClick, hint, color}: Props) {
  return (
    <div className="group flex relative">
      <button className={`w-3 h-3 rounded-full p-1.5 ${color}`} onClick={onClick}>
      </button>
      <span className="group-hover:opacity-100 transition-opacity bg-oneDarkBlackDarker p-1 text-[0.5rem] text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 opacity-0 m-4 mx-auto z-20 pointer-events-none">{hint}</span>
    </div>
  )
}