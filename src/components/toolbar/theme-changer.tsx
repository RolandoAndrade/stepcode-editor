import { useRef } from 'react';
import { toCanvas } from 'html-to-image'
import { ToolbarButton } from './buttons/toolbar-button.tsx';
import { useTheme } from '../theme-context.tsx';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const duration = 500;

export function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  function toggleTheme(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    handleChange(e)
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function takeScreenshot(): Promise<HTMLCanvasElement> {
    return toCanvas(document.getElementsByTagName('body')[0], {
      width: window.innerWidth,
      height: window.innerHeight,
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight,
      pixelRatio: 1,
      skipAutoScale: true,
      skipFonts: true,
    })
  }

  async function handleChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const canvas = await takeScreenshot();
    const canvasWrapper = canvasRef.current!;
    canvasWrapper.style.display = 'block';
    const { pageX, pageY } = e;
    const { clientWidth, clientHeight } = document.body;
    const startDate = Date.now();
    canvasWrapper.width = clientWidth;
    canvasWrapper.height = clientHeight;
    const ctx = canvasWrapper.getContext("2d")!;
    ctx.drawImage(canvas, 0, 0)
    if (theme === 'light') {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "destination-in";
    }
    ctx.fillStyle = "white";
    const finalRadius = Math.sqrt(
      Math.max(clientWidth * clientWidth,
        clientHeight * clientHeight)
    );
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
      ctx.arc(pageX, pageY, radius, 0, 2 * Math.PI);
      ctx.fill();
      if (progress < 1) requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setTimeout(() => {
      canvasWrapper.style.display = 'none';
    }, duration);
  }


  return (
    <>
      <canvas ref={canvasRef} width={'100%'} height={'100%'} className={'fixed top-0 left-0'} style={{
        width: '100%',
        height : '100%',
        zIndex: 1000,
        display: 'none',
      }}></canvas>
      {theme == 'light' ? <ToolbarButton icon={MdDarkMode} onClick={toggleTheme} hint={'Modo oscuro'}/>:
        <ToolbarButton icon={MdLightMode} onClick={toggleTheme} hint={'Modo claro'}/>}
    </>
  )
}