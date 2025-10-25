"use client"

import { useState, useEffect } from "react"
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
  Grid3X3,
  Plus,
  Trash2,
  ArrowLeft,
  Home,
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
    icon: Home,
    isActive: false,
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

// Workflow node types - Enhanced n8n-style nodes
const nodeTypes = [
  {
    id: "trigger",
    name: "Trigger",
    icon: Zap,
    color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    description: "Start a workflow",
    category: "trigger",
  },
  {
    id: "manual",
    name: "Manual Trigger",
    icon: User,
    color: "bg-orange-100 border-orange-300 text-orange-800",
    description: "Manual execution",
    category: "trigger",
  },
  {
    id: "webhook",
    name: "Webhook",
    icon: Webhook,
    color: "bg-green-100 border-green-300 text-green-800",
    description: "HTTP request trigger",
    category: "trigger",
  },
  {
    id: "schedule",
    name: "Schedule",
    icon: Calendar,
    color: "bg-purple-100 border-purple-300 text-purple-800",
    description: "Time-based trigger",
    category: "trigger",
  },
  {
    id: "email",
    name: "Send Email",
    icon: Mail,
    color: "bg-blue-100 border-blue-300 text-blue-800",
    description: "Send an email",
    category: "communication",
  },
  {
    id: "http",
    name: "HTTP Request",
    icon: Cloud,
    color: "bg-indigo-100 border-indigo-300 text-indigo-800",
    description: "Make HTTP requests",
    category: "communication",
  },
  {
    id: "condition",
    name: "If...Else",
    icon: Filter,
    color: "bg-purple-100 border-purple-300 text-purple-800",
    description: "Conditional logic",
    category: "logic",
  },
  {
    id: "switch",
    name: "Switch",
    icon: GitBranch,
    color: "bg-pink-100 border-pink-300 text-pink-800",
    description: "Multiple conditions",
    category: "logic",
  },
  {
    id: "delay",
    name: "Wait",
    icon: Timer,
    color: "bg-gray-100 border-gray-300 text-gray-800",
    description: "Wait for time",
    category: "utility",
  },
  {
    id: "database",
    name: "Database",
    icon: DatabaseIcon,
    color: "bg-indigo-100 border-indigo-300 text-indigo-800",
    description: "Database operation",
    category: "data",
  },
  {
    id: "transform",
    name: "Transform",
    icon: SettingsIcon,
    color: "bg-teal-100 border-teal-300 text-teal-800",
    description: "Transform data",
    category: "data",
  },
  {
    id: "filter",
    name: "Filter",
    icon: Filter,
    color: "bg-cyan-100 border-cyan-300 text-cyan-800",
    description: "Filter data",
    category: "data",
  },
  {
    id: "set",
    name: "Set Data",
    icon: Database,
    color: "bg-emerald-100 border-emerald-300 text-emerald-800",
    description: "Set data values",
    category: "data",
  },
  {
    id: "code",
    name: "Code",
    icon: FileText,
    color: "bg-red-100 border-red-300 text-red-800",
    description: "Execute code",
    category: "utility",
  },
  {
    id: "error",
    name: "Error Handler",
    icon: Shield,
    color: "bg-red-100 border-red-300 text-red-800",
    description: "Handle errors",
    category: "utility",
  },
]

// Node categories for filtering
const nodeCategories = [
  { id: "all", name: "All Nodes", icon: Grid3X3 },
  { id: "trigger", name: "Triggers", icon: Zap },
  { id: "communication", name: "Communication", icon: Mail },
  { id: "logic", name: "Logic", icon: Filter },
  { id: "data", name: "Data", icon: Database },
  { id: "utility", name: "Utility", icon: SettingsIcon },
]

interface WorkflowNode {
  id: string
  type: string
  name: string
  x: number
  y: number
  config: Record<string, any>
}

export default function WorkflowEditPage() {
  const params = useParams()
  const workflowId = params.id as string

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
    currentWorkflow?.nodes || []
  )
  const [connections, setConnections] = useState<{ from: string; to: string }[]>(
    currentWorkflow?.connections || []
  )
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [workflowName, setWorkflowName] = useState(
    currentWorkflow?.name || "My Workflow"
  )
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStart, setConnectionStart] = useState<string | null>(null)
  const [nodeSearchQuery, setNodeSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isEditMode] = useState(true) // Always in edit mode for edit page
  const [isRunning, setIsRunning] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [nodePanelWidth, setNodePanelWidth] = useState(320) // Initial width in pixels
  const [minNodePanelWidth] = useState(280)
  const [maxNodePanelWidth] = useState(500)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Filter nodes based on search query and category
  const filteredNodeTypes = nodeTypes.filter(node => {
    const matchesSearch = node.name.toLowerCase().includes(nodeSearchQuery.toLowerCase()) ||
                         node.description.toLowerCase().includes(nodeSearchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || node.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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

    setNodes((prev: WorkflowNode[]) => [...prev, newNode])
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

      setNodes((prev: WorkflowNode[]) => prev.map((node: WorkflowNode) =>
        node.id === nodeId
          ? { ...node, x: Math.max(0, x), y: Math.max(0, y) }
          : node
      ))
    }
  }

  const handleDeleteNode = (nodeId: string) => {
    setNodes((prev: WorkflowNode[]) => prev.filter((node: WorkflowNode) => node.id !== nodeId))
    setConnections((prev: { from: string; to: string }[]) => prev.filter((conn: { from: string; to: string }) => conn.from !== nodeId && conn.to !== nodeId))
    if (selectedNode === nodeId) {
      setSelectedNode(null)
    }
  }

  const handleDeleteConnection = (from: string, to: string) => {
    setConnections((prev: { from: string; to: string }[]) => prev.filter((conn: { from: string; to: string }) => !(conn.from === from && conn.to === to)))
  }

  const handleSaveWorkflow = () => {
    if (!workflowName.trim()) {
      alert("Please enter a workflow name before saving.")
      return
    }

    const workflowData = {
      id: workflowId,
      name: workflowName,
      nodes,
      connections,
      updatedAt: new Date().toISOString().split('T')[0],
    }

    // Simulate save to database
    alert(`Workflow "${workflowName}" saved successfully!`)
    console.log("Saved workflow:", workflowData)

    // In a real app, you would save to database here
    // For demo purposes, we'll just show success message
  }

  const handleRunWorkflow = () => {
    if (nodes.length === 0) {
      alert("Please add some nodes to the workflow before running.")
      return
    }

    if (connections.length === 0) {
      alert("Please connect the nodes to create a workflow before running.")
      return
    }

    setIsRunning(true)
    // Simulate workflow execution
    setTimeout(() => {
      setIsRunning(false)
      alert(`Workflow "${workflowName}" executed successfully!\n\nExecution Summary:\n- ${nodes.length} nodes processed\n- ${connections.length} connections executed\n- Status: Completed`)
    }, 3000)
  }

  // Handle mouse events for connection system
  const handleConnectionMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (!isEditMode) return

    e.stopPropagation()
    setConnectionStart(nodeId)
    setIsConnecting(true)
    setSelectedNode(null)
  }

  const handleConnectionMouseUp = (e: React.MouseEvent, nodeId: string) => {
    if (!isEditMode || !isConnecting || !connectionStart) return

    e.stopPropagation()

    if (nodeId !== connectionStart) {
      // Check if connection already exists (prevent duplicate connections)
      const existingConnection = connections.find(
        (conn: { from: string; to: string }) => (conn.from === connectionStart && conn.to === nodeId) ||
                (conn.from === nodeId && conn.to === connectionStart)
      )

      if (!existingConnection) {
        setConnections((prev: { from: string; to: string }[]) => [...prev, { from: connectionStart, to: nodeId }])
      }
    }

    setConnectionStart(null)
    setIsConnecting(false)
  }

  const handleCanvasMouseUp = (e: React.MouseEvent) => {
    if (isConnecting) {
      setConnectionStart(null)
      setIsConnecting(false)
    }
  }

  // Resize functionality
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  const handleResizeMouseMove = (e: MouseEvent) => {
    if (!isResizing) return

    const container = document.querySelector('.resizable-container') as HTMLElement
    if (!container) return

    const rect = container.getBoundingClientRect()
    const newWidth = e.clientX - rect.left

    if (newWidth >= minNodePanelWidth && newWidth <= maxNodePanelWidth) {
      setNodePanelWidth(newWidth)
    }
  }

  const handleResizeMouseUp = () => {
    setIsResizing(false)
  }

  // Add global mouse event listeners for resizing
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMouseMove)
      document.addEventListener('mouseup', handleResizeMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleResizeMouseMove)
      document.removeEventListener('mouseup', handleResizeMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleResizeMouseMove)
      document.removeEventListener('mouseup', handleResizeMouseUp)
    }
  }, [isResizing])

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
                    <h1 className="text-lg font-semibold">Edit Workflow</h1>
                    <div className="flex items-center gap-2">
                      <Input
                        value={workflowName}
                        onChange={(e) => setWorkflowName(e.target.value)}
                        className="w-64"
                        placeholder="Enter workflow name"
                      />
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full border">Edit Mode</span>
                    </div>
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
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/workflow/builder/view/${workflowId}`}>
                    View Mode
                  </Link>
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
                    Edit workflow configuration and node connections
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

              <div className="resizable-container relative flex gap-6 h-[700px]">
                {/* Node Palette */}
                <Card className="flex-shrink-0" style={{ width: nodePanelWidth }}>
                  <CardHeader>
                    <CardTitle className="text-base">Node Types</CardTitle>
                    <CardDescription className="text-sm">
                      Drag to canvas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Search and Category Filter */}
                    <div className="space-y-2">
                      <Input
                        placeholder="Search nodes..."
                        value={nodeSearchQuery}
                        onChange={(e) => setNodeSearchQuery(e.target.value)}
                        className="text-sm"
                      />
                      <div className="flex flex-wrap gap-1">
                        {nodeCategories.map((category) => (
                          <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "outline"}
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <category.icon className="h-3 w-3 mr-1" />
                            {category.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {filteredNodeTypes.length === 0 ? (
                        <div className="text-center py-4 text-sm text-muted-foreground">
                          No nodes found
                        </div>
                      ) : (
                        filteredNodeTypes.map((nodeType) => (
                          <div
                            key={nodeType.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, nodeType.id)}
                            className={`p-2 rounded-md border-2 border-dashed cursor-move hover:border-solid hover:shadow-sm transition-all ${nodeType.color}`}
                          >
                            <div className="flex items-center gap-2">
                              <nodeType.icon className="h-3 w-3" />
                              <div className="flex-1">
                                <div className="font-medium text-xs">{nodeType.name}</div>
                                <div className="text-xs opacity-75 leading-tight">{nodeType.description}</div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Resize Handle */}
                <div
                  className="w-1 bg-gray-300 cursor-col-resize hover:bg-gray-400 transition-colors relative group"
                  onMouseDown={handleResizeMouseDown}
                  style={{
                    cursor: isResizing ? 'col-resize' : 'col-resize',
                  }}
                >
                  <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-200 transition-colors" />
                  {isResizing && (
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-full" />
                  )}
                </div>

                {/* Workflow Canvas */}
                <Card className="flex-1 min-w-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Workflow Canvas</CardTitle>
                    <CardDescription>
                      Drop nodes here and connect them to create your workflow
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="workflow-canvas relative min-h-[600px] w-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={handleCanvasMouseUp}
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
                          onMouseDown={(e) => handleConnectionMouseDown(e, node.id)}
                          onMouseUp={(e) => handleConnectionMouseUp(e, node.id)}
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
                            {isEditMode && (
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
                            {isEditMode && (
                              <Button variant="outline" size="sm" className="h-5 text-xs px-2">
                                Configure
                              </Button>
                            )}
                          </div>

                          {/* Connection points */}
                          {isEditMode && (
                            <>
                              {/* Input connection point (left) */}
                              <div
                                className="absolute w-3 h-3 rounded-full bg-blue-500 border-2 border-white -left-2 top-1/2 transform -translate-y-1/2 cursor-crosshair hover:bg-blue-600 transition-colors"
                                onMouseDown={(e) => {
                                  e.stopPropagation()
                                  handleConnectionMouseDown(e, node.id)
                                }}
                              />
                              {/* Output connection point (right) */}
                              <div
                                className="absolute w-3 h-3 rounded-full bg-blue-500 border-2 border-white -right-2 top-1/2 transform -translate-y-1/2 cursor-crosshair hover:bg-blue-600 transition-colors"
                                onMouseUp={(e) => {
                                  e.stopPropagation()
                                  handleConnectionMouseUp(e, node.id)
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
                              {isEditMode && (
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

                      {nodes.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                          <div className="text-center">
                            <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">Start Building Your Workflow</p>
                            <p className="text-sm">
                              Drag nodes from the left panel to get started
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
