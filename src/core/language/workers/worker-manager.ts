import { StepCodeWorker } from './stepcode-worker.ts';
import { Uri } from 'monaco-editor';
import type { editor as EditorType } from 'monaco-editor';

export class WorkerManager {

  private worker: EditorType.MonacoWebWorker<StepCodeWorker> | null;
  private workerClientProxy: Promise<StepCodeWorker> | undefined;

  constructor(protected editor: typeof EditorType) {
    this.worker = null;
  }

  private getClientProxy(): Promise<StepCodeWorker> {

    if (!this.workerClientProxy) {
      this.worker = this.editor.createWebWorker<StepCodeWorker>({
        // module that exports the create() method and returns a `JSONWorker` instance
        moduleId: 'src/stepcode.worker',
        label: 'stepcode',
        // passed in to the create() method
        createData: {
          languageId: 'stepcode'
        }
      });

      this.workerClientProxy = <Promise<StepCodeWorker>>this.worker.getProxy();
    }

    return this.workerClientProxy;
  }

  async getLanguageServiceWorker(...resources: Uri[]): Promise<StepCodeWorker> {
    const _client = await this.getClientProxy();
    await this.worker!.withSyncedResources(resources)
    return _client;
  }
}