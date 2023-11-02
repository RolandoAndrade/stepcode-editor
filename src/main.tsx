import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ExecutionContextProvider } from './components/execution-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ExecutionContextProvider>
      <App />
    </ExecutionContextProvider>


  </React.StrictMode>,
)
