import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ExecutionContextProvider } from './components/execution-context.tsx';
import { EditorContextProvider } from './components/editor-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EditorContextProvider>
      <ExecutionContextProvider>
        <App />
      </ExecutionContextProvider>
    </EditorContextProvider>
  </React.StrictMode>,
)
