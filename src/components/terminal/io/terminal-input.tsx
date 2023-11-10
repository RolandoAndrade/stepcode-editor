import { useState } from 'react';

type Props = {
  onSend: (input: string) => void,
  content?: string,
}
export function TerminalInput({onSend, content}: Props) {
  const [disabled, setDisabled] = useState<boolean>(false)
  const [input, setInput] = useState<string>(content || '')
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
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={!!content}
        autoComplete={'off'}
        type="text"
        name={'terminal-input'}
        className="bg-transparent ml-1 focus:outline-none text-black dark:text-gray-300"
      />
    </form>
  )
}
