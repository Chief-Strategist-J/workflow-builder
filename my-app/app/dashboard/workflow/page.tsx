"use client"

import { useState } from "react"
import Link from "next/link"
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
    isActive: true,
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

export default function WorkflowPage() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([])
  const [connections, setConnections] = useState<{ from: string; to: string }[]>([])
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [workflowName, setWorkflowName] = useState("My Workflow")
  const [isRunning, setIsRunning] = useState(false)
  const [isEditMode, setIsEditMode] = useState(true)

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
                    isActive={item.isActive}
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
                  <h1 className="text-lg font-semibold">Workflow Builder</h1>
                  <div className="flex items-center gap-2">
                    <Input
                      value={workflowName}
                      onChange={(e) => setWorkflowName(e.target.value)}
                      className="w-64"
                      placeholder="Enter workflow name"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditMode(!isEditMode)}
                    >
                      {isEditMode ? "View" : "Edit"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveWorkflow}
                  disabled={isRunning}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  size="sm"
                  onClick={handleRunWorkflow}
                  disabled={isRunning || nodes.length === 0}
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
                  <h2 className="text-2xl font-bold tracking-tight">Workflow Builder</h2>
                  <p className="text-muted-foreground">
                    Create automated workflows by dragging and connecting nodes
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

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Node Palette */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-lg">Node Types</CardTitle>
                    <CardDescription>
                      Drag nodes to the canvas to build your workflow
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {nodeTypes.map((nodeType) => (
                      <div
                        key={nodeType.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, nodeType.id)}
                        className={`p-3 rounded-lg border-2 border-dashed cursor-move hover:border-solid hover:shadow-md transition-all ${nodeType.color}`}
                      >
                        <div className="flex items-center gap-3">
                          <nodeType.icon className="h-5 w-5" />
                          <div>
                            <div className="font-medium text-sm">{nodeType.name}</div>
                            <div className="text-xs opacity-75">{nodeType.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Workflow Canvas */}
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle className="text-lg">Workflow Canvas</CardTitle>
                    <CardDescription>
                      Drop nodes here and connect them to create your workflow
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="workflow-canvas relative min-h-[500px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
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
                          className={`absolute w-48 p-4 rounded-lg border-2 shadow-lg cursor-move transition-all hover:shadow-xl ${
                            selectedNode === node.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 bg-white'
                          }`}
                          style={{
                            left: node.x,
                            top: node.y,
                            zIndex: selectedNode === node.id ? 10 : 1,
                          }}
                          draggable={isEditMode}
                          onDrag={(e) => handleNodeDrag(e, node.id)}
                          onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {(() => {
                                const nodeTypeData = nodeTypes.find(n => n.id === node.type)
                                const IconComponent = nodeTypeData?.icon || GitBranch
                                return <IconComponent className="h-4 w-4" />
                              })()}
                              <span className="font-medium text-sm">{node.name}</span>
                            </div>
                            {isEditMode && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteNode(node.id)
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          <div className="text-xs text-gray-600 mb-2">
                            {nodeTypes.find(n => n.id === node.type)?.description}
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 rounded-full bg-green-400"></div>
                              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                            </div>
                            {isEditMode && (
                              <Button variant="outline" size="sm" className="h-6 text-xs">
                                Configure
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Render connections */}
                      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                        {connections.map((connection, index) => {
                          const fromNode = nodes.find(n => n.id === connection.from)
                          const toNode = nodes.find(n => n.id === connection.to)
                          if (!fromNode || !toNode) return null

                          const fromX = fromNode.x + 192 // Center of node width
                          const fromY = fromNode.y + 60 // Bottom of node
                          const toX = toNode.x + 96 // Center of target node
                          const toY = toNode.y + 20 // Top of target node

                          return (
                            <g key={index}>
                              <line
                                x1={fromX}
                                y1={fromY}
                                x2={toX}
                                y2={toY}
                                stroke="#3b82f6"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                className="animate-pulse"
                              />
                              <circle cx={fromX} cy={fromY} r="4" fill="#3b82f6" />
                              <circle cx={toX} cy={toY} r="4" fill="#3b82f6" />
                            </g>
                          )
                        })}
                      </svg>

                      {nodes.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                          <div className="text-center">
                            <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">Start Building Your Workflow</p>
                            <p className="text-sm">Drag nodes from the left panel to get started</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Workflow Actions */}
              {selectedNode && (
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
