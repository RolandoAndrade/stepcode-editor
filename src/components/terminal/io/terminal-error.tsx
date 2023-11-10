import { ReactNode } from 'react';

type Props = {
  children: ReactNode
}
export function TerminalError({children}: Props) {
  return (
    <pre style={{
      whiteSpace: 'pre-wrap',
    }}>
      <div className="text-red-500">
        {children}
      </div>
    </pre>
  )
}