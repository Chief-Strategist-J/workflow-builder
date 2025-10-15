import { memo } from 'react'
import { theme } from '@/styles/theme'

interface ContextMenuProps {
  x: number
  y: number
  onDisconnect: () => void
  onClose: () => void
}

export const ContextMenu = memo(({ x, y, onDisconnect, onClose }: ContextMenuProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: y,
        left: x,
        background: theme.colors.bg.secondary,
        border: `1px solid ${theme.colors.border.primary}`,
        borderRadius: theme.borderRadius.md,
        boxShadow: theme.shadows.lg,
        zIndex: 1000,
        minWidth: '150px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        onClick={() => {
          onDisconnect()
          onClose()
        }}
        style={{
          padding: theme.spacing.md,
          cursor: 'pointer',
          color: theme.colors.text.primary,
          fontSize: theme.fontSize.sm,
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = theme.colors.bg.hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
        }}
      >
        <span style={{ color: theme.colors.accent.danger }}>🗑️</span>
        Disconnect
      </div>
    </div>
  )
})

ContextMenu.displayName = 'ContextMenu'
