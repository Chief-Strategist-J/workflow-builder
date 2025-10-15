import { AgentNodeType } from '../types'

export const agentNodeTypes: AgentNodeType[] = [
  {
    id: 'llm',
    label: 'LLM Agent',
    icon: 'Brain',
    color: 'from-purple-500 to-pink-500',
    description: 'AI language model agent'
  },
  {
    id: 'chat',
    label: 'Chat Interface',
    icon: 'MessageSquare',
    color: 'from-blue-500 to-cyan-500',
    description: 'User interaction point'
  },
  {
    id: 'database',
    label: 'Data Source',
    icon: 'Database',
    color: 'from-green-500 to-emerald-500',
    description: 'Connect to databases'
  },
  {
    id: 'code',
    label: 'Code Executor',
    icon: 'Code',
    color: 'from-orange-500 to-red-500',
    description: 'Run custom code'
  },
  {
    id: 'workflow',
    label: 'Workflow',
    icon: 'Workflow',
    color: 'from-indigo-500 to-purple-500',
    description: 'Sequential tasks'
  },
  {
    id: 'condition',
    label: 'Conditional',
    icon: 'GitBranch',
    color: 'from-yellow-500 to-orange-500',
    description: 'Branch logic'
  },
]
