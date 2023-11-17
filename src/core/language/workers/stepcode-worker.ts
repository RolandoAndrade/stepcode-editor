import * as monaco from "monaco-editor";
type IWorkerContext = monaco.worker.IWorkerContext;
import { LanguageService } from '../services/language-service.ts';

export class StepCodeWorker {

  private _ctx: IWorkerContext;
  private languageService: LanguageService
  constructor(ctx: IWorkerContext) {
    this._ctx = ctx;
    this.languageService = new LanguageService();
  }

  doValidation() {
    const code = this.getTextDocument();
    return Promise.resolve(this.languageService.validate(code));
  }
  getTextDocument(): string {
    const model = this._ctx.getMirrorModels()[0];// When there are multiple files open, this will be an array
    return model.getValue();
  }

}