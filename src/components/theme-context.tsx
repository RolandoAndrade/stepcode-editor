import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

type ThemeContext = {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContext>({
  theme: 'dark',
  setTheme: () => {}
});

export function ThemeContextProvider({children}: {children: React.ReactNode}) {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  function changeTheme(theme: string) {
    setTheme(theme);
  }

  useEffect(() => {
    // change css color scheme
    if (theme === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{theme, setTheme: changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}