import React from 'react'
import { theme } from '../styles/theme'

interface NodeTemplateData {
  id?: string
  type?: string
  label: string
  icon: string
  category: string
  [key: string]: any
}

interface DraggableNodeItemProps {
  item: NodeTemplateData
  onDragStart: (event: React.DragEvent, item: NodeTemplateData) => void
  className?: string
  style?: React.CSSProperties
}

const DraggableNodeItem: React.FC<DraggableNodeItemProps> = ({
  item,
  onDragStart,
  className = '',
  style = {}
}) => {
  const UI_CONFIG = {
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
      xxl: '24px',
    },
    dimensions: {
      padding: '16px',
      marginBottom: '12px',
      borderRadius: '12px',
      gap: '16px',
      minHeight: '56px',
      iconContainer: {
        width: '40px',
        height: '40px',
      }
    },
    typography: {
      iconSize: '24px',
      labelSize: '16px',
      categorySize: '12px',
      fontWeight: {
        label: 600,
        category: 500,
      }
    },
    layout: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'grab',
      position: 'relative',
    },
    animations: {
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    target.style.background = `linear-gradient(135deg, ${theme.colors.bg.hover} 0%, ${theme.colors.bg.tertiary} 100%)`
    target.style.borderColor = theme.colors.accent.primary
    target.style.transform = 'translateX(4px) scale(1.02)'
    target.style.boxShadow = `0 4px 12px rgba(0, 122, 204, 0.15)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    target.style.background = theme.colors.bg.tertiary
    target.style.borderColor = theme.colors.border.primary
    target.style.transform = 'translateX(0px) scale(1)'
    target.style.boxShadow = 'none'
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '0.8'
    onDragStart(e, item)
  }

  const componentStyle: React.CSSProperties = {
    padding: UI_CONFIG.dimensions.padding,
    marginBottom: UI_CONFIG.dimensions.marginBottom,
    background: theme.colors.bg.tertiary,
    border: `2px solid ${theme.colors.border.primary}`,
    borderRadius: UI_CONFIG.dimensions.borderRadius,
    cursor: UI_CONFIG.layout.cursor,
    display: UI_CONFIG.layout.display,
    alignItems: UI_CONFIG.layout.alignItems,
    gap: UI_CONFIG.dimensions.gap,
    minHeight: UI_CONFIG.dimensions.minHeight,
    transition: UI_CONFIG.animations.transition,
    position: UI_CONFIG.layout.position as any,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    ...style
  }

  return (
    <div
      className={className}
      draggable
      onDragStart={handleDragStart}
      style={componentStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: UI_CONFIG.dimensions.iconContainer.width,
        height: UI_CONFIG.dimensions.iconContainer.height,
        borderRadius: '10px',
        background: `linear-gradient(135deg, ${theme.colors.accent.primary}15, ${theme.colors.accent.success}10)`,
        marginRight: UI_CONFIG.spacing.sm,
      }}>
        <span style={{
          fontSize: UI_CONFIG.typography.iconSize,
          filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
        }}>{item.icon}</span>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: UI_CONFIG.spacing.xs,
        justifyContent: 'center',
      }}>
        <div style={{
          fontSize: UI_CONFIG.typography.labelSize,
          color: theme.colors.text.primary,
          fontWeight: UI_CONFIG.typography.fontWeight.label,
          lineHeight: '1.4',
          letterSpacing: '-0.01em',
        }}>{item.label}</div>
        <div style={{
          fontSize: UI_CONFIG.typography.categorySize,
          color: theme.colors.text.secondary,
          fontWeight: UI_CONFIG.typography.fontWeight.category,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          opacity: 0.8,
        }}>{item.category}</div>
      </div>

      <div style={{
        opacity: 0.6,
        fontSize: '14px',
        color: theme.colors.text.tertiary,
        transform: 'rotate(-45deg)',
      }}>
        ⋮⋮
      </div>
    </div>
  )
}

export default DraggableNodeItem
export { DraggableNodeItem }
export type { NodeTemplateData, DraggableNodeItemProps }
