import { SyntaxNode } from '@lezer/common';

const nodes = [
  'Script', 'ProgramDefinition',
  'Function', 'Procedure', 'PSeIntFunction', 'ParamList',
  'DefineStatement', 'VariableType', 'ForStatement', 'WhileStatement', 'RepeatStatement'
] as const

type ScopeNode = typeof nodes[number]

const ScopeNodes = new Set(nodes);

export function getNamedScope(node: SyntaxNode): ScopeNode | null {
  while (node.parent) {
    if (ScopeNodes.has(node.parent.name as ScopeNode))
      return node.parent.name as ScopeNode;
    node = node.parent;
  }
  return null;
}