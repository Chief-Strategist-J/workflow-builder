export const nodeTemplates = [
  {
    type: 'trigger',
    label: 'Trigger',
    icon: '⚡',
    category: 'Start',
    defaultConfig: {
      triggerType: 'webhook',
      webhookUrl: '',
    }
  },
  {
    type: 'widget',
    label: 'Chat Widget',
    icon: '💬',
    category: 'Interface',
    defaultConfig: {
      title: 'Chat Widget',
      welcomeMessage: 'Hello! How can I help you today?',
      showAvatar: true,
    }
  },
  {
    type: 'logic',
    label: 'Code',
    icon: '{ }',
    category: 'Logic',
    defaultConfig: {
      language: 'javascript',
      code: '// Your code here\nreturn data;',
    }
  },
  {
    type: 'flow',
    label: 'Classifier',
    icon: '🤖',
    category: 'Flow',
    defaultConfig: {
      classificationType: 'intent',
      confidenceThreshold: 0.8,
    }
  },
]
