import {linter, Diagnostic, Action} from "@codemirror/lint"
import { validate } from 'stepcode';

export const stepcodeLinter = linter(view => {
  const diagnostics: Diagnostic[] = []
  validate(view.state.doc.toString()).forEach(error => {
    let start = 0
    let end = 0
    let message = error.message
    const actions: Action[] = []
    if (error.message.includes(";")) {
      const startLine = view.state.doc.line(Math.max(1, error.startLine - 1));
      start = startLine.to
      end = startLine.to + 1
      message = 'Falta un ";" al final de la instrucción'
      actions.push({
        name: "Añadir ;",
        apply: () => {
          view.dispatch({
            changes: {from: start, insert: ";"},
            selection: {anchor: start + 1}
          })
        }
      })
    } else {
      const startLine = view.state.doc.line(error.startLine);
      start = startLine.from + error.startColumn;
      const endLine = view.state.doc.line(error.endLine);
      end = Math.min(endLine.to, endLine.from + error.endColumn);
    }
    diagnostics.push({
      from: start,
      to: end,
      severity: "error",
      message: message,
      actions: actions
    })
  })
  return diagnostics
})