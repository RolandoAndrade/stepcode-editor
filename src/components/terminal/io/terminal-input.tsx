import { useState } from 'react';

type Props = {
  onSend: (input: string) => void,
}
export function TerminalInput({onSend}: Props) {
  const [disabled, setDisabled] = useState<boolean>(false)
  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const input = e.currentTarget['terminal-input'].value
    setDisabled(true)
    onSend(input)
  }
  return (
    <form className="flex" onSubmit={send}>
      <span className="text-green-500 mr-1">{`>>`}</span>
      <input
        autoFocus={!disabled}
        disabled={disabled}
        autoComplete={'off'}
        type="text"
        name={'terminal-input'}
        className="bg-transparent ml-1 focus:outline-none"
      />
    </form>
  )
}
