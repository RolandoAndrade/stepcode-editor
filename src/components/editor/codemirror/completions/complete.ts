import { IterMode, NodeWeakMap, SyntaxNode, SyntaxNodeRef } from '@lezer/common'
import {
  completeFromList,
  Completion,
  CompletionContext,
  CompletionResult,
  ifNotIn,
  snippetCompletion as snip
} from '@codemirror/autocomplete'
import { syntaxTree } from '@codemirror/language'
import { Text } from '@codemirror/state'

const cache = new NodeWeakMap<readonly Completion[]>()

const ScopeNodes = new Set([
  'Script', 'Body',
  'Function', 'Procedure', 'LambdaExpression', 'ProgramDefinition',
  'ForStatement', 'MatchClause', 'PSeIntFunction'
])

function defID(type: string) {
  return (node: SyntaxNodeRef, def: (node: SyntaxNodeRef, type: string) => void, outer: boolean) => {
    if (outer) return false
    const id = node.node.getChild('VariableName')
    if (id) def(id, type)
    return true
  }
}

const functionContext = ['Function', 'Procedure']
const gatherCompletions: {
  [node: string]: (node: SyntaxNodeRef, def: (node: SyntaxNodeRef, type: string) => void, outer: boolean) => void | boolean
} = {
  ProgramDefinition: defID('variable'),
  Function(node, def, outer) {
    if (outer) return false
    const id = node.node.getChild('FunctionName')
    if (id) def(id, 'function')
    return true
  },
  PSeIntFunction(node, def, outer) {
    if (outer) return false
    const id = node.node.getChild('FunctionName')
    if (id) def(id, 'function')
    return true
  },
  Procedure(node, def, outer) {
    if (outer) return false
    const id = node.node.getChild('ProcedureName')
    if (id) def(id, 'function')
    return true
  },
  ForStatement(node, def, outer) {
    if (outer) for (let child = node.node.firstChild; child; child = child.nextSibling) {
      if (child.name == 'VariableName') def(child, 'variable')
      else if (child.name == 'in') break
    }
  },
  ParamList(node, def) {
    for (let prev: SyntaxNode | null = null, child = node.node.firstChild; child; child = child.nextSibling) {
      if (child.name == 'VariableName' && (!prev || !/\*|AssignOp/.test(prev.name)))
        def(child, 'variable')
      prev = child
    }
  },
  VariableDefinition(node, def) {
    if (!node.matchContext(functionContext)) def(node, 'variable')
  },
}

function getScope(doc: Text, node: SyntaxNode) {
  const cached = cache.get(node)
  if (cached) return cached

  const completions: Completion[] = [];
  let top = true

  function def(node: SyntaxNodeRef, type: string) {
    const name = doc.sliceString(node.from, node.to)
    if (type === 'function') {
      let params = ''
      let details = ''
      const paramList = node.node.nextSibling
      if (paramList && paramList.name === 'ParamList') {
        for (let child = paramList.firstChild; child; child = child.nextSibling) {
          if (child.name === 'VariableParam') {
            const childChild = child.node.firstChild;
            childChild?.name === 'VariableName' && (params += `\${${doc.sliceString(childChild.from, childChild.to)}}, `)
            childChild?.name === 'VariableName' && (details += `<${doc.sliceString(childChild.from, childChild.to)}>, `)
          }
        }
        params = params.slice(0, -2)
        details = details.slice(0, -2)
        details = `(${details})`
        const parent = node.node.parent!;
        if (parent.name === 'Function') {
          const returnType = parent.node.getChild('VariableType')
          returnType && (details += `→ ${doc.sliceString(returnType.from, returnType.to)}`)
        }
      }
      
      completions.push(snip(`${name}(${params})\${}`,{
        label: name, type,
        detail: `${name}${details}`,
        section: {
          name: 'Funciones y procedimientos',
          rank: -1
        }
      }))
      return;
    }
    completions.push({label: name, type, section: {
      name: 'Variables definidas',
      rank: -2
    }})
  }

  node.cursor(IterMode.IncludeAnonymous).iterate(node => {
    if (node.name) {
      const gather = gatherCompletions[node.name]
      if (gather && gather(node, def, top) || !top && ScopeNodes.has(node.name)) return false
      top = false
    } else if (node.to - node.from > 8192) {
      // Allow caching for bigger internal nodes
      for (const c of getScope(doc, node.node)) completions.push(c)
      return false
    }
  })
  cache.set(node, completions)
  return completions
}

const Identifier = /^[\w\xa1-\uffff][\w\d\xa1-\uffff]*$/

const dontComplete = ['String', 'FormatString', 'Comment', 'PropertyName']

/// Completion source that looks up locally defined names in
/// Python code.
export function localCompletionSource(context: CompletionContext): CompletionResult | null {
  const inner = syntaxTree(context.state).resolveInner(context.pos, -1)
  if (dontComplete.indexOf(inner.name) > -1) return null
  const isWord = inner.name == 'VariableName' ||
    inner.to - inner.from < 20 && Identifier.test(context.state.sliceDoc(inner.from, inner.to))
  if (!isWord && !context.explicit) return null
  let options: Completion[] = []
  for (let pos: SyntaxNode | null = inner; pos; pos = pos.parent) {
    if (ScopeNodes.has(pos.name)) options = options.concat(getScope(context.state.doc, pos))
  }
  return {
    options,
    from: isWord ? inner.from : context.pos,
    validFor: Identifier
  }
}

const globals: readonly Completion[] = [
  '__annotations__', '__builtins__', '__debug__', '__doc__', '__import__', '__name__',
  '__loader__', '__package__', '__spec__',
  'False', 'None', 'True'
].map(n => ({label: n, type: 'constant'})).concat([
  'ArithmeticError', 'AssertionError', 'AttributeError', 'BaseException', 'BlockingIOError',
  'BrokenPipeError', 'BufferError', 'BytesWarning', 'ChildProcessError', 'ConnectionAbortedError',
  'ConnectionError', 'ConnectionRefusedError', 'ConnectionResetError', 'DeprecationWarning',
  'EOFError', 'Ellipsis', 'EncodingWarning', 'EnvironmentError', 'Exception', 'FileExistsError',
  'FileNotFoundError', 'FloatingPointError', 'FutureWarning', 'GeneratorExit', 'IOError',
  'ImportError', 'ImportWarning', 'IndentationError', 'IndexError', 'InterruptedError',
  'IsADirectoryError', 'KeyError', 'KeyboardInterrupt', 'LookupError', 'MemoryError',
  'ModuleNotFoundError', 'NameError', 'NotADirectoryError', 'NotImplemented', 'NotImplementedError',
  'OSError', 'OverflowError', 'PendingDeprecationWarning', 'PermissionError', 'ProcessLookupError',
  'RecursionError', 'ReferenceError', 'ResourceWarning', 'RuntimeError', 'RuntimeWarning',
  'StopAsyncIteration', 'StopIteration', 'SyntaxError', 'SyntaxWarning', 'SystemError',
  'SystemExit', 'TabError', 'TimeoutError', 'TypeError', 'UnboundLocalError', 'UnicodeDecodeError',
  'UnicodeEncodeError', 'UnicodeError', 'UnicodeTranslateError', 'UnicodeWarning', 'UserWarning',
  'ValueError', 'Warning', 'ZeroDivisionError'
].map(n => ({label: n, type: 'type'}))).concat([
  'bool', 'bytearray', 'bytes', 'classmethod', 'complex', 'float', 'frozenset', 'int', 'list',
  'map', 'memoryview', 'object', 'range', 'set', 'staticmethod', 'str', 'super', 'tuple', 'type'
].map(n => ({label: n, type: 'class'}))).concat([
  'abs', 'aiter', 'all', 'anext', 'any', 'ascii', 'bin', 'breakpoint', 'callable', 'chr',
  'compile', 'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'exec', 'exit', 'filter',
  'format', 'getattr', 'globals', 'hasattr', 'hash', 'help', 'hex', 'id', 'input', 'isinstance',
  'issubclass', 'iter', 'len', 'license', 'locals', 'max', 'min', 'next', 'oct', 'open',
  'ord', 'pow', 'print', 'property', 'quit', 'repr', 'reversed', 'round', 'setattr', 'slice',
  'sorted', 'sum', 'vars', 'zip'
].map(n => ({label: n, type: 'function'})))

export const snippets: readonly Completion[] = [
  snip('def ${name}(${params}):\n\t${}', {
    label: 'def',
    detail: 'function',
    type: 'keyword'
  }),
  snip('for ${name} in ${collection}:\n\t${}', {
    label: 'for',
    detail: 'loop',
    type: 'keyword'
  }),
  snip('while ${}:\n\t${}', {
    label: 'while',
    detail: 'loop',
    type: 'keyword'
  }),
  snip('try:\n\t${}\nexcept ${error}:\n\t${}', {
    label: 'try',
    detail: '/ except block',
    type: 'keyword'
  }),
  snip('if ${}:\n\t\n', {
    label: 'if',
    detail: 'block',
    type: 'keyword'
  }),
  snip('if ${}:\n\t${}\nelse:\n\t${}', {
    label: 'if',
    detail: '/ else block',
    type: 'keyword'
  }),
  snip('class ${name}:\n\tdef __init__(self, ${params}):\n\t\t\t${}', {
    label: 'class',
    detail: 'definition',
    type: 'keyword'
  }),
  snip('import ${module}', {
    label: 'import',
    detail: 'statement',
    type: 'keyword'
  }),
  snip('from ${module} import ${names}', {
    label: 'from',
    detail: 'import',
    type: 'keyword'
  })
]

/// Autocompletion for built-in Python globals and keywords.
export const globalCompletion = ifNotIn(dontComplete, completeFromList(globals.concat(snippets)))