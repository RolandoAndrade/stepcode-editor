import './App.css'
import { Toolbar } from './components/toolbar/toolbar.tsx';
import { TerminalContainer } from './components/terminal/terminal-container.tsx';
import { Editor } from './components/editor/editor.tsx';

function App() {



  return (
    <div className={'w-full h-full flex flex-1 flex-col bg-oneDarkBlackDarker'}>
      <Toolbar />
      <Editor/>
      <TerminalContainer />
    </div>
  )
}

export default App
