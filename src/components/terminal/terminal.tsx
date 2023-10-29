import { ReactTerminal } from 'react-terminal';
import { colors } from '../../core/colors/colors.ts';

export function Terminal() {
  return (
    <dialog className="bg-transparent fixed inset-0 flex items-center justify-center">
      <section className="bg-transparent rounded-lg shadow-lg overflow-hidden min-w-[500px] h-[200px]">
        <ReactTerminal
          showControlButtons={true}
          showControlBar={false}
          themes={{
            'one-dark': {
              themeBGColor: colors.black,
              themeToolbarColor: colors.black,
              themeColor: colors.white,
              themePromptColor: "#a917a8"
            }
          }}
          theme="one-dark"
        />

      </section>
    </dialog>

  )
}