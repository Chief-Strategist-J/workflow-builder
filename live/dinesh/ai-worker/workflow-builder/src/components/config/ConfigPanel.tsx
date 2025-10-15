import { memo, useState, useEffect } from 'react'
import { theme } from '@/styles/theme'
import { NodeData } from '../../types'

interface ConfigPanelProps {
  isOpen: boolean
  nodeId: string | null
  nodeData: NodeData | null
  onClose: () => void
  onUpdateNode: (nodeId: string, data: Partial<NodeData>) => void
}

export const ConfigPanel = memo(({ 
  isOpen, 
  nodeId, 
  nodeData, 
  onClose, 
  onUpdateNode 
}: ConfigPanelProps) => {
  const [formData, setFormData] = useState<NodeData | null>(null)

  useEffect(() => {
    if (nodeData) {
      setFormData({ ...nodeData })
    }
  }, [nodeData])

  if (!isOpen || !nodeId || !nodeData || !formData) {
    return null
  }

  const handleInputChange = (field: keyof NodeData, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null)
  }

  const handleConfigChange = (key: string, value: any) => {
    setFormData(prev => prev ? {
      ...prev,
      config: { ...prev.config, [key]: value }
    } : null)
  }

  const handleSave = () => {
    if (formData) {
      onUpdateNode(nodeId, formData)
      onClose()
    }
  }

  const getNodeSpecificFields = () => {
    switch (formData.type) {
      case 'trigger':
        return (
          <>
            <div style={{ marginBottom: theme.spacing.md }}>
              <label style={{
                display: 'block',
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
                fontWeight: 500,
              }}>
                Trigger Type
              </label>
              <select
                value={formData.config?.triggerType || 'webhook'}
                onChange={(e) => handleConfigChange('triggerType', e.target.value)}
                style={{
                  width: '100%',
                  padding: theme.spacing.sm,
                  background: theme.colors.bg.tertiary,
                  border: `1px solid ${theme.colors.border.primary}`,
                  borderRadius: theme.borderRadius.sm,
                  color: theme.colors.text.primary,
                  fontSize: theme.fontSize.sm,
                }}
              >
                <option value="webhook">Webhook</option>
                <option value="schedule">Schedule</option>
                <option value="manual">Manual</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div style={{ marginBottom: theme.spacing.md }}>
              <label style={{
                display: 'block',
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
                fontWeight: 500,
              }}>
                Webhook URL
              </label>
              <input
                type="text"
                value={formData.config?.webhookUrl || ''}
                onChange={(e) => handleConfigChange('webhookUrl', e.target.value)}
                placeholder="https://your-webhook-url.com"
                style={{
                  width: '100%',
                  padding: theme.spacing.sm,
                  background: theme.colors.bg.tertiary,
                  border: `1px solid ${theme.colors.border.primary}`,
                  borderRadius: theme.borderRadius.sm,
                  color: theme.colors.text.primary,
                  fontSize: theme.fontSize.sm,
                }}
              />
            </div>
          </>
        )

      case 'widget':
        return (
          <>
            <div style={{ marginBottom: theme.spacing.md }}>
              <label style={{
                display: 'block',
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
                fontWeight: 500,
              }}>
                Widget Title
              </label>
              <input
                type="text"
                value={formData.config?.title || ''}
                onChange={(e) => handleConfigChange('title', e.target.value)}
                placeholder="Enter widget title"
                style={{
                  width: '100%',
                  padding: theme.spacing.sm,
                  background: theme.colors.bg.tertiary,
                  border: `1px solid ${theme.colors.border.primary}`,
                  borderRadius: theme.borderRadius.sm,
                  color: theme.colors.text.primary,
                  fontSize: theme.fontSize.sm,
                }}
              />
            </div>
            <div style={{ marginBottom: theme.spacing.md }}>
              <label style={{
                display: 'block',
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
                fontWeight: 500,
              }}>
                Welcome Message
              </label>
              <textarea
                value={formData.config?.welcomeMessage || ''}
                onChange={(e) => handleConfigChange('welcomeMessage', e.target.value)}
                placeholder="Enter welcome message"
                rows={3}
                style={{
                  width: '100%',
                  padding: theme.spacing.sm,
                  background: theme.colors.bg.tertiary,
                  border: `1px solid ${theme.colors.border.primary}`,
                  borderRadius: theme.borderRadius.sm,
                  color: theme.colors.text.primary,
                  fontSize: theme.fontSize.sm,
                  resize: 'vertical',
                }}
              />
            </div>
            <div style={{ marginBottom: theme.spacing.md }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.primary,
                fontWeight: 500,
              }}>
                <input
                  type="checkbox"
                  checked={formData.config?.showAvatar || false}
                  onChange={(e) => handleConfigChange('showAvatar', e.target.checked)}
                  style={{
                    accentColor: theme.colors.accent.primary,
                  }}
                />
                Show Avatar
              </label>
            </div>
          </>
        )

      case 'logic':
        return (
          <>
            <div style={{ marginBottom: theme.spacing.md }}>
              <label style={{
                display: 'block',
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
                fontWeight: 500,
              }}>
                Code Language
              </label>
              <select
                value={formData.config?.language || 'javascript'}
                onChange={(e) => handleConfigChange('language', e.target.value)}
                style={{
                  width: '100%',
                  padding: theme.spacing.sm,
                  background: theme.colors.bg.tertiary,
                  border: `1px solid ${theme.colors.border.primary}`,
                  borderRadius: theme.borderRadius.sm,
                  color: theme.colors.text.primary,
                  fontSize: theme.fontSize.sm,
                }}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="sql">SQL</option>
              </select>
            </div>
            <div style={{ marginBottom: theme.spacing.md }}>
              <label style={{
                display: 'block',
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
                fontWeight: 500,
              }}>
                Code
              </label>
              <textarea
                value={formData.config?.code || ''}
                onChange={(e) => handleConfigChange('code', e.target.value)}
                placeholder="Enter your code here..."
                rows={8}
                style={{
                  width: '100%',
                  padding: theme.spacing.sm,
                  background: theme.colors.bg.tertiary,
                  border: `1px solid ${theme.colors.border.primary}`,
                  borderRadius: theme.borderRadius.sm,
                  color: theme.colors.text.primary,
                  fontSize: theme.fontSize.sm,
                  fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                  resize: 'vertical',
                }}
              />
            </div>
          </>
        )

      case 'flow':
        return (
          <>
            <div style={{ marginBottom: theme.spacing.md }}>
              <label style={{
                display: 'block',
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
                fontWeight: 500,
              }}>
                Classification Type
              </label>
              <select
                value={formData.config?.classificationType || 'intent'}
                onChange={(e) => handleConfigChange('classificationType', e.target.value)}
                style={{
                  width: '100%',
                  padding: theme.spacing.sm,
                  background: theme.colors.bg.tertiary,
                  border: `1px solid ${theme.colors.border.primary}`,
                  borderRadius: theme.borderRadius.sm,
                  color: theme.colors.text.primary,
                  fontSize: theme.fontSize.sm,
                }}
              >
                <option value="intent">Intent Classification</option>
                <option value="sentiment">Sentiment Analysis</option>
                <option value="category">Category Classification</option>
                <option value="priority">Priority Classification</option>
              </select>
            </div>
            <div style={{ marginBottom: theme.spacing.md }}>
              <label style={{
                display: 'block',
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
                fontWeight: 500,
              }}>
                Confidence Threshold
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={formData.config?.confidenceThreshold || 0.8}
                onChange={(e) => handleConfigChange('confidenceThreshold', parseFloat(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: theme.colors.accent.primary,
                }}
              />
              <div style={{
                fontSize: theme.fontSize.xs,
                color: theme.colors.text.secondary,
                textAlign: 'center',
                marginTop: theme.spacing.xs,
              }}>
                {(formData.config?.confidenceThreshold || 0.8).toFixed(1)}
              </div>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      background: theme.colors.bg.secondary,
      borderLeft: `1px solid ${theme.colors.border.primary}`,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: theme.shadows.lg,
    }}>
      {/* Header */}
      <div style={{
        padding: theme.spacing.lg,
        borderBottom: `1px solid ${theme.colors.border.primary}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h2 style={{
          fontSize: theme.fontSize.lg,
          color: theme.colors.text.primary,
          fontWeight: 600,
          margin: 0,
        }}>
          Configure Node
        </h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: theme.colors.text.secondary,
            fontSize: theme.fontSize.lg,
            cursor: 'pointer',
            padding: theme.spacing.xs,
            borderRadius: theme.borderRadius.sm,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.colors.bg.hover
            e.currentTarget.style.color = theme.colors.text.primary
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none'
            e.currentTarget.style.color = theme.colors.text.secondary
          }}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: theme.spacing.lg,
      }}>
        {/* Node Info */}
        <div style={{
          marginBottom: theme.spacing.xl,
          padding: theme.spacing.md,
          background: theme.colors.bg.tertiary,
          border: `1px solid ${theme.colors.border.primary}`,
          borderRadius: theme.borderRadius.md,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm,
            marginBottom: theme.spacing.sm,
          }}>
            <span style={{ fontSize: theme.fontSize.lg }}>{formData.icon}</span>
            <div>
              <div style={{
                fontSize: theme.fontSize.md,
                color: theme.colors.text.primary,
                fontWeight: 500,
              }}>
                {formData.label}
              </div>
              <div style={{
                fontSize: theme.fontSize.xs,
                color: theme.colors.text.secondary,
                textTransform: 'uppercase',
              }}>
                {formData.type}
              </div>
            </div>
          </div>
        </div>

        {/* Basic Settings */}
        <div style={{ marginBottom: theme.spacing.xl }}>
          <h3 style={{
            fontSize: theme.fontSize.md,
            color: theme.colors.text.primary,
            fontWeight: 600,
            marginBottom: theme.spacing.md,
          }}>
            Basic Settings
          </h3>
          
          <div style={{ marginBottom: theme.spacing.md }}>
            <label style={{
              display: 'block',
              fontSize: theme.fontSize.sm,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.xs,
              fontWeight: 500,
            }}>
              Node Name
            </label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => handleInputChange('label', e.target.value)}
              style={{
                width: '100%',
                padding: theme.spacing.sm,
                background: theme.colors.bg.tertiary,
                border: `1px solid ${theme.colors.border.primary}`,
                borderRadius: theme.borderRadius.sm,
                color: theme.colors.text.primary,
                fontSize: theme.fontSize.sm,
              }}
            />
          </div>
        </div>

        {/* Node-specific Settings */}
        <div style={{ marginBottom: theme.spacing.xl }}>
          <h3 style={{
            fontSize: theme.fontSize.md,
            color: theme.colors.text.primary,
            fontWeight: 600,
            marginBottom: theme.spacing.md,
          }}>
            Configuration
          </h3>
          {getNodeSpecificFields()}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: theme.spacing.lg,
        borderTop: `1px solid ${theme.colors.border.primary}`,
        display: 'flex',
        gap: theme.spacing.md,
      }}>
        <button
          onClick={onClose}
          style={{
            flex: 1,
            padding: theme.spacing.md,
            background: theme.colors.bg.tertiary,
            border: `1px solid ${theme.colors.border.primary}`,
            borderRadius: theme.borderRadius.md,
            color: theme.colors.text.primary,
            fontSize: theme.fontSize.sm,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.colors.bg.hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.colors.bg.tertiary
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          style={{
            flex: 1,
            padding: theme.spacing.md,
            background: theme.colors.accent.primary,
            border: 'none',
            borderRadius: theme.borderRadius.md,
            color: theme.colors.bg.primary,
            fontSize: theme.fontSize.sm,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.colors.border.active
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.colors.accent.primary
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  )
})

ConfigPanel.displayName = 'ConfigPanel'