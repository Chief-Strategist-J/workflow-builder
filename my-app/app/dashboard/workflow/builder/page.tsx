"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Key,
  Settings as SettingsIcon,
  BarChart3,
  FileText,
  Users,
  Calendar,
  Copy,
  Check,
  GitBranch,
  Play,
  Square,
  Save,
  Zap,
  Mail,
  MessageSquare,
  Filter,
  Timer,
  Webhook,
  Database as DatabaseIcon,
  Cloud,
  FileText as FileIcon,
  Plus,
  Trash2,
  ArrowLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const navigation = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: Calendar,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: FileText,
  },
  {
    title: "Team",
    url: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Workflow",
    url: "/dashboard/workflow",
    icon: GitBranch,
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: SettingsIcon,
  },
]

// Workflow node types
const nodeTypes = [
  {
    id: "trigger",
    name: "Trigger",
    icon: Zap,
    color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    description: "Start a workflow",
  },
  {
    id: "email",
    name: "Send Email",
    icon: Mail,
    color: "bg-blue-100 border-blue-300 text-blue-800",
    description: "Send an email",
  },
  {
    id: "condition",
    name: "Condition",
    icon: Filter,
    color: "bg-purple-100 border-purple-300 text-purple-800",
    description: "If/else logic",
  },
  {
    id: "delay",
    name: "Delay",
    icon: Timer,
    color: "bg-gray-100 border-gray-300 text-gray-800",
    description: "Wait for time",
  },
  {
    id: "webhook",
    name: "Webhook",
    icon: Webhook,
    color: "bg-green-100 border-green-300 text-green-800",
    description: "HTTP request",
  },
  {
    id: "database",
    name: "Database",
    icon: DatabaseIcon,
    color: "bg-indigo-100 border-indigo-300 text-indigo-800",
    description: "Database operation",
  },
]

interface WorkflowNode {
  id: string
  type: string
  name: string
  x: number
  y: number
  config: Record<string, any>
}

export default function WorkflowBuilderPage() {
  const params = useParams()
  const workflowId = params.id as string
  const isViewMode = new URLSearchParams(window.location.search).get('view') === 'true'
  const isNewWorkflow = workflowId === 'new'

  // Sample workflow data (in a real app, this would come from an API)
  const sampleWorkflows = [
    {
      id: "1",
      name: "User Registration Flow",
      description: "Automated workflow for new user onboarding",
      nodes: [
        { id: "trigger-1", type: "trigger", name: "User Registration", x: 100, y: 100, config: {} },
        { id: "email-1", type: "email", name: "Welcome Email", x: 300, y: 100, config: {} },
        { id: "delay-1", type: "delay", name: "Wait 1 Day", x: 500, y: 100, config: {} },
        { id: "email-2", type: "email", name: "Follow-up Email", x: 700, y: 100, config: {} },
        { id: "webhook-1", type: "webhook", name: "Update CRM", x: 900, y: 100, config: {} },
      ],
      connections: [
        { from: "trigger-1", to: "email-1" },
        { from: "email-1", to: "delay-1" },
        { from: "delay-1", to: "email-2" },
        { from: "email-2", to: "webhook-1" },
      ],
    },
    {
      id: "2",
      name: "Email Marketing Campaign",
      description: "Send automated emails based on user actions",
      nodes: [
        { id: "trigger-2", type: "trigger", name: "User Action", x: 100, y: 100, config: {} },
        { id: "condition-1", type: "condition", name: "Check Status", x: 300, y: 100, config: {} },
        { id: "email-3", type: "email", name: "Promotional Email", x: 500, y: 50, config: {} },
        { id: "delay-2", type: "delay", name: "Wait 3 Days", x: 500, y: 150, config: {} },
        { id: "webhook-2", type: "webhook", name: "Track Response", x: 700, y: 100, config: {} },
      ],
      connections: [
        { from: "trigger-2", to: "condition-1" },
        { from: "condition-1", to: "email-3" },
        { from: "condition-1", to: "delay-2" },
        { from: "delay-2", to: "webhook-2" },
      ],
    },
    {
      id: "3",
      name: "Data Backup Process",
      description: "Automated daily database backup workflow",
      nodes: [
        { id: "trigger-3", type: "trigger", name: "Daily Schedule", x: 100, y: 100, config: {} },
        { id: "database-1", type: "database", name: "Export Data", x: 300, y: 100, config: {} },
        { id: "webhook-3", type: "webhook", name: "Upload Backup", x: 500, y: 100, config: {} },
      ],
      connections: [
        { from: "trigger-3", to: "database-1" },
        { from: "database-1", to: "webhook-3" },
      ],
    },
    // Add workflow for the specific ID the user mentioned
    {
      id: "1761415106367",
      name: "Custom Workflow",
      description: "Custom workflow created by user",
      nodes: [
        { id: "trigger-1761415106367-1", type: "trigger", name: "Start Event", x: 100, y: 100, config: {} },
        { id: "email-1761415106367-1", type: "email", name: "Send Notification", x: 300, y: 100, config: {} },
        { id: "webhook-1761415106367-1", type: "webhook", name: "API Call", x: 500, y: 100, config: {} },
      ],
      connections: [
        { from: "trigger-1761415106367-1", to: "email-1761415106367-1" },
        { from: "email-1761415106367-1", to: "webhook-1761415106367-1" },
      ],
    },
  ]

  const currentWorkflow = sampleWorkflows.find(w => w.id === workflowId) || sampleWorkflows[0]

  const [nodes, setNodes] = useState<WorkflowNode[]>(
    isNewWorkflow ? [] : (currentWorkflow?.nodes || [])
  )
  const [connections, setConnections] = useState<{ from: string; to: string }[]>(
    isNewWorkflow ? [] : (currentWorkflow?.connections || [])
  )
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [workflowName, setWorkflowName] = useState(
    isNewWorkflow ? "New Workflow" : (currentWorkflow?.name || "My Workflow")
  )
  const [isRunning, setIsRunning] = useState(false)
  const [isEditMode, setIsEditMode] = useState(!isViewMode)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStart, setConnectionStart] = useState<string | null>(null)

  const handleNodeMouseDown = (nodeId: string) => {
    if (!isEditMode || isViewMode) return

    setConnectionStart(nodeId)
    setIsConnecting(true)
  }

  const handleNodeMouseUp = (nodeId: string) => {
    if (!isEditMode || isViewMode || !isConnecting || !connectionStart) return

    if (nodeId !== connectionStart) {
      // Check if connection already exists
      const existingConnection = connections.find(
        conn => conn.from === connectionStart && conn.to === nodeId
      )

      if (!existingConnection) {
        setConnections(prev => [...prev, { from: connectionStart, to: nodeId }])
      }
    }

    setConnectionStart(null)
    setIsConnecting(false)
  }

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isConnecting && connectionStart) {
      const rect = e.currentTarget.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleCanvasClick = () => {
    setConnectionStart(null)
    setIsConnecting(false)
    setSelectedNode(null)
  }

  const handleDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.setData("nodeType", nodeType)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const nodeType = e.dataTransfer.getData("nodeType")
    if (!nodeType) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - 100
    const y = e.clientY - rect.top - 50

    const nodeTypeData = nodeTypes.find(n => n.id === nodeType)
    if (!nodeTypeData) return

    const newNode: WorkflowNode = {
      id: `${nodeType}-${Date.now()}`,
      type: nodeType,
      name: nodeTypeData.name,
      x,
      y,
      config: {},
    }

    setNodes(prev => [...prev, newNode])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleNodeDrag = (e: React.DragEvent, nodeId: string) => {
    if (!isEditMode) return

    const rect = e.currentTarget.getBoundingClientRect()
    const parentRect = e.currentTarget.closest('.workflow-canvas')?.getBoundingClientRect()

    if (parentRect) {
      const x = e.clientX - parentRect.left - 100
      const y = e.clientY - parentRect.top - 50

      setNodes(prev => prev.map(node =>
        node.id === nodeId
          ? { ...node, x: Math.max(0, x), y: Math.max(0, y) }
          : node
      ))
    }
  }

  const handleDeleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId))
    setConnections(prev => prev.filter(conn => conn.from !== nodeId && conn.to !== nodeId))
    if (selectedNode === nodeId) {
      setSelectedNode(null)
    }
  }

  const handleDeleteConnection = (from: string, to: string) => {
    setConnections(prev => prev.filter(conn => !(conn.from === from && conn.to === to)))
  }

  const handleSaveWorkflow = () => {
    const workflowData = {
      name: workflowName,
      nodes,
      connections,
    }
    // Simulate save
    alert(`Workflow "${workflowName}" saved successfully!`)
    console.log("Saved workflow:", workflowData)
  }

  const handleRunWorkflow = () => {
    if (nodes.length === 0) {
      alert("Please add some nodes to the workflow before running.")
      return
    }

    setIsRunning(true)
    // Simulate workflow execution
    setTimeout(() => {
      setIsRunning(false)
      alert(`Workflow "${workflowName}" executed successfully!`)
    }, 3000)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BarChart3 className="h-4 w-4" />
              </div>
              <span className="font-semibold">Dashboard</span>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-4 py-4">
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.title === "Workflow"}
                    className="w-full justify-start"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-muted" />
              <div className="flex-1 text-sm">
                <p className="font-medium">John Doe</p>
                <p className="text-muted-foreground">john@example.com</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1">
          <header className="sticky top-0 z-40 border-b bg-background backdrop-blur">
            <div className="flex h-14 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/workflow">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Workflows
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-semibold">Workflow Builder</h1>
                    <div className="flex items-center gap-2">
                      <Input
                        value={workflowName}
                        onChange={(e) => setWorkflowName(e.target.value)}
                        className="w-64"
                        placeholder="Enter workflow name"
                        disabled={isViewMode}
                      />
                      {isViewMode && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full border">View Mode</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveWorkflow}
                  disabled={isRunning || isViewMode}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  size="sm"
                  onClick={handleRunWorkflow}
                  disabled={isRunning || nodes.length === 0 || isViewMode}
                  className={isRunning ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  {isRunning ? (
                    <>
                      <Square className="h-4 w-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run
                    </>
                  )}
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{workflowName}</h2>
                  <p className="text-muted-foreground">
                    {isViewMode ? "View workflow configuration" : "Create automated workflows by dragging and connecting nodes"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {nodes.length} nodes • {connections.length} connections
                  </span>
                  {isRunning && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                      Running...
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                {/* Node Palette */}
                {!isViewMode && (
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle className="text-base">Node Types</CardTitle>
                      <CardDescription className="text-sm">
                        Drag to canvas
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {nodeTypes.map((nodeType) => (
                        <div
                          key={nodeType.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, nodeType.id)}
                          className={`p-2 rounded-md border-2 border-dashed cursor-move hover:border-solid hover:shadow-sm transition-all ${nodeType.color}`}
                        >
                          <div className="flex items-center gap-2">
                            <nodeType.icon className="h-3 w-3" />
                            <div>
                              <div className="font-medium text-xs">{nodeType.name}</div>
                              <div className="text-xs opacity-75 leading-tight">{nodeType.description}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Workflow Canvas */}
                <Card className={!isViewMode ? "lg:col-span-5" : "lg:col-span-6"}>
                  <CardHeader>
                    <CardTitle className="text-lg">Workflow Canvas</CardTitle>
                    <CardDescription>
                      {isViewMode ? "View workflow structure" : "Drop nodes here and connect them to create your workflow"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="workflow-canvas relative min-h-[600px] w-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden"
                      onDrop={!isViewMode ? handleDrop : undefined}
                      onDragOver={!isViewMode ? handleDragOver : undefined}
                      onClick={handleCanvasClick}
                      onMouseMove={handleCanvasMouseMove}
                      style={{
                        backgroundImage: `
                          radial-gradient(circle, #e5e7eb 1px, transparent 1px),
                          radial-gradient(circle, #e5e7eb 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 10px 10px',
                      }}
                    >
                      {/* Render workflow nodes */}
                      {nodes.map((node) => (
                        <div
                          key={node.id}
                          className={`absolute w-32 p-3 rounded-lg border-2 shadow-lg cursor-move transition-all hover:shadow-xl ${
                            selectedNode === node.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 bg-white'
                          }`}
                          style={{
                            left: node.x,
                            top: node.y,
                            zIndex: selectedNode === node.id ? 10 : 1,
                          }}
                          onMouseDown={() => handleNodeMouseDown(node.id)}
                          onMouseUp={() => handleNodeMouseUp(node.id)}
                          onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {(() => {
                                const nodeTypeData = nodeTypes.find(n => n.id === node.type)
                                const IconComponent = nodeTypeData?.icon || GitBranch
                                return <IconComponent className="h-3 w-3" />
                              })()}
                              <span className="font-medium text-xs">{node.name}</span>
                            </div>
                            {isEditMode && !isViewMode && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-5 w-5 p-0 text-red-500 hover:text-red-700"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteNode(node.id)
                                }}
                              >
                                <Trash2 className="h-2 w-2" />
                              </Button>
                            )}
                          </div>
                          <div className="text-xs text-gray-600 mb-2 leading-tight">
                            {nodeTypes.find(n => n.id === node.type)?.description}
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                            </div>
                            {isEditMode && !isViewMode && (
                              <Button variant="outline" size="sm" className="h-5 text-xs px-2">
                                Configure
                              </Button>
                            )}
                          </div>

                          {/* Connection points */}
                          {isEditMode && !isViewMode && (
                            <>
                              {/* Input connection point (left) */}
                              <div
                                className="absolute w-3 h-3 rounded-full bg-blue-500 border-2 border-white -left-2 top-1/2 transform -translate-y-1/2 cursor-crosshair hover:bg-blue-600 transition-colors"
                                onMouseDown={(e) => {
                                  e.stopPropagation()
                                  handleNodeMouseDown(node.id)
                                }}
                              />
                              {/* Output connection point (right) */}
                              <div
                                className="absolute w-3 h-3 rounded-full bg-blue-500 border-2 border-white -right-2 top-1/2 transform -translate-y-1/2 cursor-crosshair hover:bg-blue-600 transition-colors"
                                onMouseUp={(e) => {
                                  e.stopPropagation()
                                  handleNodeMouseUp(node.id)
                                }}
                              />
                            </>
                          )}
                        </div>
                      ))}

                      {/* Temporary connection line while connecting */}
                      {isConnecting && connectionStart && (
                        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
                          {(() => {
                            const startNode = nodes.find(n => n.id === connectionStart)
                            if (!startNode) return null

                            const startX = startNode.x + 128 // Right side of node
                            const startY = startNode.y + 60 // Center vertically

                            return (
                              <line
                                x1={startX}
                                y1={startY}
                                x2={mousePosition.x || startX + 100}
                                y2={mousePosition.y || startY}
                                stroke="#3b82f6"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                className="animate-pulse opacity-75"
                              />
                            )
                          })()}
                        </svg>
                      )}

                      {/* Render connections */}
                      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                        {connections.map((connection, index) => {
                          const fromNode = nodes.find(n => n.id === connection.from)
                          const toNode = nodes.find(n => n.id === connection.to)
                          if (!fromNode || !toNode) return null

                          const fromX = fromNode.x + 128 // Right side of source node
                          const fromY = fromNode.y + 60 // Center vertically
                          const toX = toNode.x + 0 // Left side of target node
                          const toY = toNode.y + 60 // Center vertically

                          return (
                            <g key={index}>
                              <line
                                x1={fromX}
                                y1={fromY}
                                x2={toX}
                                y2={toY}
                                stroke="#3b82f6"
                                strokeWidth="2"
                                className="hover:stroke-blue-600 transition-colors"
                              />
                              {/* Connection points */}
                              <circle cx={fromX} cy={fromY} r="3" fill="#3b82f6" className="hover:fill-blue-600 transition-colors" />
                              <circle cx={toX} cy={toY} r="3" fill="#3b82f6" className="hover:fill-blue-600 transition-colors" />

                              {/* Delete connection button (only in edit mode) */}
                              {isEditMode && !isViewMode && (
                                <foreignObject
                                  x={(fromX + toX) / 2 - 10}
                                  y={(fromY + toY) / 2 - 10}
                                  width="20"
                                  height="20"
                                >
                                  <button
                                    className="w-5 h-5 rounded-full bg-red-500 text-white text-xs hover:bg-red-600 transition-colors flex items-center justify-center"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDeleteConnection(connection.from, connection.to)
                                    }}
                                    title="Delete connection"
                                  >
                                    ×
                                  </button>
                                </foreignObject>
                              )}
                            </g>
                          )
                        })}
                      </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                          <div className="text-center">
                            <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">
                              {isViewMode ? "No workflow nodes" : "Start Building Your Workflow"}
                            </p>
                            <p className="text-sm">
                              {isViewMode
                                ? "This workflow doesn't have any nodes yet"
                                : "Drag nodes from the left panel to get started"
                              }
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Workflow Actions */}
              {selectedNode && !isViewMode && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Node Configuration</CardTitle>
                    <CardDescription>
                      Configure the selected workflow node
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Node Type</Label>
                        <Select value={nodes.find(n => n.id === selectedNode)?.type || ""}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {nodeTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Node Name</Label>
                        <Input
                          value={nodes.find(n => n.id === selectedNode)?.name || ""}
                          onChange={(e) => {
                            setNodes(prev => prev.map(node =>
                              node.id === selectedNode
                                ? { ...node, name: e.target.value }
                                : node
                            ))
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setSelectedNode(null)}>
                        Cancel
                      </Button>
                      <Button>Save Configuration</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
