import { createContext, useContext, useEffect, useRef } from 'react';
import { useLocalStorage, useWindowSize } from '@uidotdev/usehooks';
import { toCanvas } from 'html-to-image';

type ThemeContext = {
  theme: string;
  setTheme: (theme: string) => void;
  play: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ThemeContext = createContext<ThemeContext>({
  theme: 'dark',
  setTheme: () => {},
  play: () => {},
});

export function ThemeContextProvider({children}: {children: React.ReactNode}) {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  const duration = 500;

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

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {width, height} = useWindowSize();

  async function takeScreenshot(): Promise<HTMLCanvasElement> {
    return toCanvas(document.getElementsByTagName('body')[0], {
      width: (width || window.innerWidth) * devicePixelRatio,
      height: (height || window.innerHeight) * devicePixelRatio,
      canvasWidth: (width || window.innerWidth) * devicePixelRatio,
      canvasHeight: (height || window.innerHeight) * devicePixelRatio,
      pixelRatio: window.devicePixelRatio,
      quality: 1,
      skipAutoScale: true,
      skipFonts: true,
    })
  }

  async function handleChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const editor = document.getElementById('editor')!;
    editor.style.overflow = 'hidden';
    const canvas = await takeScreenshot();
    editor.style.overflow = 'auto';
    const canvasWrapper = canvasRef.current!;
    canvasWrapper.style.display = 'block';
    const { pageX, pageY } = e;
    const { clientWidth, clientHeight } = document.body;
    const startDate = Date.now();
    canvasWrapper.width = (width || clientWidth) * devicePixelRatio;
    canvasWrapper.height = (height || clientHeight) * devicePixelRatio;
    const ctx = canvasWrapper.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0)
    if (theme === 'light') {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "destination-in";
    }
    ctx.fillStyle = "white";
    const finalRadius = Math.sqrt(
      Math.max(clientWidth ** 2,
        clientHeight ** 2)
    ) * 1.5;
    const render = () => {
      const diff = Date.now() - startDate;
      const progress = diff / duration;
      let radius = 0;
      if (theme === 'dark') {
        radius = Math.max(finalRadius * (1 - progress), 0);
      } else {
        radius = finalRadius * progress;
      }
      ctx.beginPath();
      ctx.arc(pageX + 60, pageY + 10, radius, 0, 2 * Math.PI);
      ctx.fill();
      if (progress < 1) requestAnimationFrame(render);
      else canvasWrapper.style.display = 'none';
    };
    setTheme(theme === 'dark' ? 'light' : 'dark');
    requestAnimationFrame(render);
  }

  return (
    <ThemeContext.Provider value={{theme, setTheme: changeTheme, play: handleChange}}>
      <canvas ref={canvasRef} width={width || '100%'} height={height || '100%'} className={'fixed top-0 left-0'} style={{
        width: width || '100%',
        height: height || '100%',
        zIndex: 1000,
        display: 'none',
        pointerEvents: 'none',
      }}></canvas>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}