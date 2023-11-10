import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";
import { getFileHandle, readFile, updateFile, writeFile } from '../shared/filesystem.ts';

type EditorContext = {
  content: string;
  fileName: string;
  setFileName: (fileName: string) => void;
  setContent: (content: string) => void;
  openFile: () => Promise<void>;
  saveNewFile: () => Promise<void>;
  saveFile: () => Promise<void>;
}

const EditorContext = createContext<EditorContext>({
  content: '',
  fileName: 'untitled.stepcode',
  setFileName: () => {},
  setContent: () => {},
  openFile: async () => {},
  saveNewFile: async () => {},
  saveFile: async () => {},
});

export function EditorContextProvider({children}: {children: React.ReactNode}) {
  const [content, saveContent] = useLocalStorage('content', '');

  const [fileName, setFileName] = useState<string>('untitled.stepcode');

  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null);

  function setContent(content: string) {
    saveContent(content);
  }

  async function openFile() {
    const fileHandle = await getFileHandle();
    if (!fileHandle) {
      return;
    }
    setFileHandle(fileHandle);
    const content = await readFile(fileHandle);
    saveContent(content);
  }

  async function saveNewFile() {
    const fileHandle = await writeFile(fileName, content);
    if (!fileHandle) {
      return;
    }
    setFileHandle(fileHandle);
  }

  async function saveFile() {
    if (!fileHandle) {
      return;
    }
    await updateFile(fileHandle, content);
  }

  return (
    <EditorContext.Provider value={{content, setContent, fileName, setFileName, saveFile, saveNewFile, openFile}}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  return useContext(EditorContext);
}