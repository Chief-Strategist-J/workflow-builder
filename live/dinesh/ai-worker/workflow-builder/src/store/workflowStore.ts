import { create } from 'zustand'
import { NodeData } from '../types'

interface WorkflowState {
  selectedNodeId: string | null
  configPanelOpen: boolean
  nodes: Record<string, NodeData>
  setSelectedNode: (id: string | null) => void
  openConfigPanel: (id: string) => void
  closeConfigPanel: () => void
  updateNode: (nodeId: string, data: Partial<NodeData>) => void
  addNode: (nodeId: string, data: NodeData) => void
  getNodeData: (nodeId: string) => NodeData | null
  deleteNode: (nodeId: string) => void
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  selectedNodeId: null,
  configPanelOpen: false,
  nodes: {},
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  openConfigPanel: (id) => set({ selectedNodeId: id, configPanelOpen: true }),
  closeConfigPanel: () => set({ configPanelOpen: false }),
  updateNode: (nodeId, data) => set((state) => ({
    nodes: {
      ...state.nodes,
      [nodeId]: { ...state.nodes[nodeId], ...data }
    }
  })),
  addNode: (nodeId, data) => set((state) => ({
    nodes: {
      ...state.nodes,
      [nodeId]: data
    }
  })),
  getNodeData: (nodeId) => {
    const state = get()
    return state.nodes[nodeId] || null
  },
  deleteNode: (nodeId) => set((state) => {
    const { [nodeId]: removed, ...restNodes } = state.nodes
    return {
      nodes: restNodes,
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
      configPanelOpen: state.selectedNodeId === nodeId ? false : state.configPanelOpen,
    }
  }),
}))
