export type NodeType = 'trigger' | 'logic' | 'flow' | 'data' | 'widget'

export interface NodeData {
  label: string
  icon: string
  type: NodeType
  config?: Record<string, any>
}

export interface NodeTemplate {
  type: NodeType
  label: string
  icon: string
  category: string
  defaultConfig?: Record<string, any>
}

export interface AgentNodeType {
  id: string
  label: string
  icon: string
  color: string
  description: string
}

export interface AgentNode {
  id: string
  x: number
  y: number
  type: AgentNodeType
  selected: boolean
  config: Record<string, any>
}

export interface AgentConnection {
  id: string
  from: string
  to: string
  fromX: number
  fromY: number
  toX: number
  toY: number
}
