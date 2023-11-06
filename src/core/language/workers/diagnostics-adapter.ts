import { StepCodeWorker } from './stepcode-worker.ts';
import { Uri, MarkerSeverity } from 'monaco-editor';
import type { editor as EditorType } from 'monaco-editor';

export type WorkerAccessor = (...uris: Uri[]) => Promise<StepCodeWorker>;

export class DiagnosticsAdapter {
  constructor(private worker: WorkerAccessor, private editor: typeof EditorType) {
    const onModelAdd = (model: EditorType.IModel): void => {
      let handle: any;
      model.onDidChangeContent(() => {
        // here we are Debouncing the user changes, so everytime a new change is done, we wait 500ms before validating
        // otherwise if the user is still typing, we cancel the
        clearTimeout(handle);
        handle = setTimeout(() => this.validate(model.uri), 500);
      });

      this.validate(model.uri);
    };
    editor.onDidCreateModel(onModelAdd);
    editor.getModels().forEach(onModelAdd);
  }
  private async validate(resource: Uri): Promise<void> {
    // get the worker proxy
    const worker = await this.worker(resource)
    // call the validate methode proxy from the langaueg service and get errors
    const errorMarkers = await worker.doValidation();
    // get the current model(editor or file) which is only one
    const model = this.editor.getModel(resource)!;
    // add the error markers and underline them with severity of Error
    this.editor.setModelMarkers(model, 'stepcode', errorMarkers.map(toDiagnostics));

  }
}

// TODO: FIX type when StepCodeError is available
function toDiagnostics(error: any): EditorType.IMarkerData {
  return {
    endLineNumber: error.endLine, startLineNumber: error.startLine,
    ...error,
    severity: MarkerSeverity.Error
  };
}