export const agentNodeTypes = [
  {
    id: 'llm-agent',
    name: 'LLM Agent',
    description: 'AI language model agent',
    icon: '🧠',
    category: 'ai',
    inputs: ['input'],
    outputs: ['output']
  },
  {
    id: 'chat-interface',
    name: 'Chat Interface',
    description: 'User interaction point',
    icon: '💬',
    category: 'interface',
    inputs: ['input'],
    outputs: ['output']
  },
  {
    id: 'data-source',
    name: 'Data Source',
    description: 'Connect to databases',
    icon: '🗄️',
    category: 'data',
    inputs: [],
    outputs: ['data']
  }
]