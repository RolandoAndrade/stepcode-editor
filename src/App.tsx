import './App.css'
import { Toolbar } from './components/toolbar/toolbar.tsx';
import { TerminalContainer } from './components/terminal/terminal-container.tsx';
import { Editor } from './components/editor/editor.tsx';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';



self.MonacoEnvironment = {
  getWorker: async function (_workerId, label) {
    console.log(`getWorker: ${label} ${_workerId}`);
    switch (label) {
      case 'stepcode':
        return new Worker(new URL('./stepcode.worker', import.meta.url), {
          type: 'module',
        });
      default:
        return new editorWorker();
    }
  }
}

function App() {



  return (
    <div className={'w-full h-full flex flex-1 flex-col'}>
      <Toolbar />
      <Editor/>
      <TerminalContainer />
    </div>
  )
}

export default App
