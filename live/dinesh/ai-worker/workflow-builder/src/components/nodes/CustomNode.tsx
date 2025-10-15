import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { theme } from '@/styles/theme'
import { NodeData } from '../../types'
import { useWorkflowStore } from '../../store/workflowStore'

export const CustomNode = memo(({ data, id, selected }: NodeProps<NodeData>) => {
  const openConfigPanel = useWorkflowStore((state) => state.openConfigPanel)
  const setSelectedNode = useWorkflowStore((state) => state.setSelectedNode)

  const getNodeColor = () => {
    const nodeType = data.type as keyof typeof theme.colors.node
    return theme.colors.node[nodeType] || theme.colors.accent.primary
  }

  const handleClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.react-flow__handle')) {
      return
    }

    if (selected) {
      openConfigPanel(id)
    } else {
      setSelectedNode(id)
    }
  }

  const handleDoubleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    openConfigPanel(id)
  }

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      style={{
        minWidth: '180px',
        background: theme.colors.bg.secondary,
        border: `2px solid ${selected ? getNodeColor() : theme.colors.border.primary}`,
        borderRadius: '8px',
        boxShadow: selected ? theme.shadows.lg : theme.shadows.sm,
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      {/* Delete Button - Temporarily disabled until proper integration */}
      {/* <button
        onClick={handleDelete}
        className="nodrag"
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: 'none',
          background: theme.colors.accent.danger,
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          transition: 'all 0.2s ease',
          opacity: selected ? 1 : 0.7,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = theme.colors.accent.warning
          e.currentTarget.style.transform = 'scale(1.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = theme.colors.accent.danger
          e.currentTarget.style.transform = 'scale(1)'
        }}
        title="Delete Node"
      >
        ×
      </button> */}

      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        isConnectable={true}
        style={{
          background: getNodeColor(),
          width: 16,
          height: 16,
          border: `3px solid ${theme.colors.bg.primary}`,
          borderRadius: '50%',
          top: -8,
        }}
      />

      {/* Node Content */}
      <div style={{
        padding: '16px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '24px',
          marginBottom: '8px',
        }}>{data.icon}</div>

        <div style={{
          fontSize: '14px',
          fontWeight: 600,
          color: theme.colors.text.primary,
          marginBottom: '4px',
        }}>{data.label}</div>

        <div style={{
          fontSize: '11px',
          color: theme.colors.text.secondary,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>{data.type}</div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        isConnectable={true}
        style={{
          background: getNodeColor(),
          width: 16,
          height: 16,
          border: `3px solid ${theme.colors.bg.primary}`,
          borderRadius: '50%',
          bottom: -8,
        }}
      />
    </div>
  )
})

CustomNode.displayName = 'CustomNode'
