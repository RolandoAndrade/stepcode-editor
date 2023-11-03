import { ReactNode } from 'react';

type Props = {
  children: ReactNode
}
export function TerminalOutput({children}: Props) {
  return (
    <pre style={{
      whiteSpace: 'pre-wrap',
    }}>
      <div className="text-gray-300">
        {children}
      </div>
    </pre>
  )
}