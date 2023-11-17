import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";
import { getFileHandle, readFile, updateFile, writeFile } from '../shared/filesystem.ts';

type EditorContext = {
  content: string;
  fileName: string;
  setFileName: (fileName: string) => void;
  setContent: (content: string) => void;
  openFile: () => Promise<void>;
  saveFile: () => Promise<void>;
  saved?: boolean;
  externalChange?: boolean;
}

const EditorContext = createContext<EditorContext>({
  content: '',
  fileName: 'untitled.stepcode',
  setFileName: () => {},
  setContent: () => {},
  openFile: async () => {},
  saveFile: async () => {},
  saved: false,
  externalChange: false,
});

export function EditorContextProvider({children}: {children: React.ReactNode}) {
  const [content, saveContent] = useLocalStorage('content', '');

  const [fileName, setFileName] = useLocalStorage('title', 'pseudocódigo.stepcode');

  const [saved, setSaved] = useState<boolean>(true);

  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null);

  const [externalChange, setExternalChange] = useState<boolean>(false);

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
    setFileName(fileHandle.name)
    setExternalChange(p => !p)
  }

  async function saveNewFile() {
    const fileHandle = await writeFile(fileName, content);
    if (!fileHandle) {
      return;
    }
    setFileHandle(fileHandle);
    setFileName(fileHandle.name)
    setSaved(true)
  }

  async function saveFile() {
    if (saved) return;
    if (!fileHandle) {
      saveNewFile();
      return;
    }
    await updateFile(fileHandle, content);
    setFileName(fileHandle.name)
    setSaved(true)
  }

  useEffect(() => {
    setSaved(false)
  }, [content]);

  function updateFileName(name: string) {
    setFileName(name)
    setSaved(false)
    setFileHandle(null)
  }

  return (
    <EditorContext.Provider value={{content, setContent, fileName, setFileName: updateFileName, saveFile, openFile, saved, externalChange}}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  return useContext(EditorContext);
}