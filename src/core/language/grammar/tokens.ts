import {
  como,
  definir,
  entonces,
  escribir,
  finproceso,
  finsegun,
  finsi,
  hacer,
  leer,
  proceso,
  segun,
  si,
  sino
} from './stepcode.terms.ts';

const keywordsMap = new Map([
  ['proceso', proceso],
  ['finproceso', finproceso],
  ['definir', definir],
  ['como', como],
  ['escribir', escribir],
  ['leer', leer],
  ['si', si],
  ['sino', sino],
  ['entonces', entonces],
  ['finsi', finsi],
  ['segun', segun],
  ['hacer', hacer],
  ['finsegun', finsegun]
])

export function keywords(name: string) {
  name = name?.toLowerCase()
  console.log(name)
  return keywordsMap.has(name) ? keywordsMap.get(name) : -1
}