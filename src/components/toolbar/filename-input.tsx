import { useEditor } from '../editor-context.tsx';

export function FilenameInput() {
  const {fileName, setFileName, saved} = useEditor()

  return <form className={`flex`} onSubmit={(e)=>e.preventDefault()}>
    {!saved && <div className={'w-1 h-1 bg-gray-600 dark:bg-white rounded-full'}></div>}
    <input
      value={fileName}
      onChange={(e) => setFileName(e.target.value)}
      autoComplete={`off`} type={`text`}
      name={`terminal-input`}
      placeholder={`Nombre del archivo`}
      className={`bg-transparent ml-1 focus:outline-none text-black dark:text-gray-300 text-xs focus:italic`} />
  </form>
}