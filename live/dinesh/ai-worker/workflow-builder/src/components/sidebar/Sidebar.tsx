import React from 'react'
import { nodeTemplates } from '../../constants/nodes'
import { theme } from '../../styles/theme'
import DraggableNodeItem, { NodeTemplateData } from '../DraggableNodeItem'

export interface SidebarSection {
  title: string
  items: NodeTemplateData[]
}

interface SidebarProps {
  title?: string
  sections?: SidebarSection[]
  width?: string | number
  height?: string | number
  onItemDragStart: (event: React.DragEvent, item: NodeTemplateData) => void
  className?: string
  style?: React.CSSProperties
}

interface SidebarHeaderProps {
  title: string
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ title }) => (
  <div style={{
    padding: theme.spacing.lg,
    borderBottom: `1px solid ${theme.colors.border.primary}`,
    background: 'rgba(30, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)',
  }}>
    <h2 style={{
      fontSize: theme.fontSize.lg,
      color: theme.colors.text.primary,
      fontWeight: 600,
      margin: 0,
    }}>{title}</h2>
  </div>
)

interface SidebarSectionProps {
  section: SidebarSection
  onItemDragStart: (event: React.DragEvent, item: NodeTemplateData) => void
}

const SidebarSectionComponent: React.FC<SidebarSectionProps> = ({ section, onItemDragStart }) => (
  <div style={{ marginBottom: theme.spacing.lg }}>
    <h3 style={{
      fontSize: theme.fontSize.xs,
      color: theme.colors.text.secondary,
      textTransform: 'uppercase',
      marginBottom: theme.spacing.md,
      fontWeight: 600,
      letterSpacing: '0.5px',
    }}>{section.title}</h3>

    {section.items.map(item => (
      <DraggableNodeItem
        key={item.id || item.type}
        item={item}
        onDragStart={onItemDragStart}
        style={{
          marginBottom: theme.spacing.sm,
          padding: theme.spacing.sm,
          borderRadius: theme.borderRadius.md,
          background: theme.colors.bg.tertiary,
          border: `1px solid ${theme.colors.border.primary}`,
          cursor: 'grab',
          transition: 'all 0.2s ease',
        }}
      />
    ))}
  </div>
)

interface SidebarContentProps {
  sections: SidebarSection[]
  onItemDragStart: (event: React.DragEvent, item: NodeTemplateData) => void
}

const SidebarContent: React.FC<SidebarContentProps> = ({ sections, onItemDragStart }) => (
  <div style={{
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing.md,
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.colors.accent.primary} ${theme.colors.bg.secondary}`,
  }}>
    {sections.map((section, idx) => (
      <SidebarSectionComponent
        key={idx}
        section={section}
        onItemDragStart={onItemDragStart}
      />
    ))}
  </div>
)

export const Sidebar: React.FC<SidebarProps> = ({
  title = "Workflow Builder",
  sections = [{ title: "Components", items: nodeTemplates }],
  width = "260px",
  height = "100vh",
  onItemDragStart,
  className = ""
}) => {
  const sidebarStyle: React.CSSProperties = {
    width,
    height,
    background: `linear-gradient(180deg, ${theme.colors.bg.panel} 0%, ${theme.colors.bg.secondary} 100%)`,
    backdropFilter: 'blur(16px)',
    borderRight: `1px solid ${theme.colors.border.primary}`,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: `${theme.shadows.lg}, inset 0 1px 0 ${theme.glassmorphism.light}`,
    position: 'relative',
    overflow: 'hidden'
  }

  return (
    <div className={className} style={sidebarStyle}>
      <SidebarHeader title={title} />
      <SidebarContent sections={sections} onItemDragStart={onItemDragStart} />
    </div>
  )
}
