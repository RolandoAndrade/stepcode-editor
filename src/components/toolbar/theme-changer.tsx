import { ToolbarButton } from './buttons/toolbar-button.tsx';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from '../theme-context.tsx';


export function ThemeChanger() {
  const { theme, play } = useTheme();

  function toggleTheme(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    play(e)
  }

  return (
    <>
      {theme == 'light' ? <ToolbarButton icon={MdDarkMode} onClick={toggleTheme} hint={'Modo oscuro'}/>:
        <ToolbarButton icon={MdLightMode} onClick={toggleTheme} hint={'Modo claro'}/>}
    </>
  )
}