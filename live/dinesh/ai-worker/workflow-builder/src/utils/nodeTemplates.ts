import { NodeTemplate } from '../types'

export const nodeTemplates: NodeTemplate[] = [
  {
    type: 'trigger',
    label: 'Trigger',
    icon: '⚡',
    category: 'Start',
    defaultConfig: { event: 'manual' }
  },
  {
    type: 'widget',
    label: 'Chat Widget',
    icon: '💬',
    category: 'Interface',
    defaultConfig: { message: 'Hello!' }
  },
  {
    type: 'logic',
    label: 'Code',
    icon: '{ }',
    category: 'Logic',
    defaultConfig: { code: '' }
  },
  {
    type: 'flow',
    label: 'Classifier',
    icon: '🤖',
    category: 'Flow',
    defaultConfig: { model: 'gpt-4' }
  },
]
