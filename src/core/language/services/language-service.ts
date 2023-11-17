import { validate } from 'stepcode';

export class LanguageService {
  validate(code: string){
    return validate(code);
  }
}