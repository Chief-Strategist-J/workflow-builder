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
  Eye,
  Grid3X3,
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

export default function WorkflowViewPage() {
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
  const [workflowName, setWorkflowName] = useState(
    currentWorkflow?.name || "My Workflow"
  )
  const [isViewMode] = useState(true)

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
                    <h1 className="text-lg font-semibold">View Workflow</h1>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full border">View Mode</span>
                      <Eye className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/workflow/builder/edit/${workflowId}`}>
                    Edit Workflow
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
                    View workflow configuration and node connections (read-only)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {nodes.length} nodes • {connections.length} connections
                  </span>
                </div>
              </div>

              <div className="resizable-container relative flex gap-6 h-[700px]">
                {/* Workflow Canvas - Full Width for View Mode */}
                <Card className="flex-1 min-w-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Workflow Canvas</CardTitle>
                    <CardDescription>
                      View workflow structure in read-only mode
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="workflow-canvas relative min-h-[600px] w-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle, #e5e7eb 1px, transparent 1px),
                          radial-gradient(circle, #e5e7eb 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 10px 10px',
                      }}
                    >
                      {/* Render workflow nodes - Read Only */}
                      {nodes.map((node) => (
                        <div
                          key={node.id}
                          className="absolute w-32 p-3 rounded-lg border-2 shadow-lg bg-white border-gray-300"
                          style={{
                            left: node.x,
                            top: node.y,
                            zIndex: 1,
                          }}
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
                          </div>
                          <div className="text-xs text-gray-600 mb-2 leading-tight">
                            {nodeTypes.find(n => n.id === node.type)?.description}
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Render connections - Read Only */}
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
                            </g>
                          )
                        })}
                      </svg>

                      {nodes.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                          <div className="text-center">
                            <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">No workflow nodes</p>
                            <p className="text-sm">
                              This workflow doesn't have any nodes yet
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
