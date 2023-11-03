import { createContext, useContext } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";

type EditorContext = {
  content: string;
  setContent: (content: string) => void;
}

const EditorContext = createContext<EditorContext>({
  content: '',
  setContent: () => {}
});

export function EditorContextProvider({children}: {children: React.ReactNode}) {
  const [content, saveContent] = useLocalStorage('content', '');

  function setContent(content: string) {
    saveContent(content);
  }

  return (
    <EditorContext.Provider value={{content, setContent}}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  return useContext(EditorContext);
}