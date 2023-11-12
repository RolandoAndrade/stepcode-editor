import './App.css'
import { Toolbar } from './components/toolbar/toolbar.tsx';
import { TerminalContainer } from './components/terminal/terminal-container.tsx';
import { useHotkeys } from 'react-hotkeys-hook';
import { useEditor } from './components/editor-context.tsx';
import { CodemirrorEditor } from './components/editor/codemirror-editor.tsx';

function App() {
  const {saveFile} = useEditor()
  useHotkeys('ctrl+s', (e) => {
    e.preventDefault()
    saveFile()
  }, {
    enableOnFormTags: true,
  })
  return (
    <div className={'w-full h-full flex flex-1 flex-col'}>
      <Toolbar />
      <CodemirrorEditor/>
      <TerminalContainer />
    </div>
  )
}

export default App
