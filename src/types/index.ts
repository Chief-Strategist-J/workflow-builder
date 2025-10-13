export interface AgentNodeType {
  id: string
  x: number
  y: number
  type: AgentNodeDefinition
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

export interface AgentNodeDefinition {
  id: string
  name: string
  description: string
  icon: string
  category: string
  inputs?: string[]
  outputs?: string[]
}