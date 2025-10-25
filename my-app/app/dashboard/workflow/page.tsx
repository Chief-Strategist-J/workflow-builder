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
  Edit,
  Eye,
  Search,
  MoreHorizontal,
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
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

interface Workflow {
  id: string
  name: string
  description: string
  status: "active" | "inactive" | "draft"
  nodes: number
  connections: number
  lastRun?: string
  createdAt: string
  updatedAt: string
}

export default function WorkflowPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: "1",
      name: "User Registration Flow",
      description: "Automated workflow for new user onboarding",
      status: "active",
      nodes: 5,
      connections: 4,
      lastRun: "2 hours ago",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
    },
    {
      id: "2",
      name: "Email Marketing Campaign",
      description: "Send automated emails based on user actions",
      status: "active",
      nodes: 8,
      connections: 6,
      lastRun: "1 day ago",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
    },
    {
      id: "3",
      name: "Data Backup Process",
      description: "Automated daily database backup workflow",
      status: "inactive",
      nodes: 3,
      connections: 2,
      lastRun: "3 days ago",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-12",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newWorkflowName, setNewWorkflowName] = useState("")
  const [newWorkflowDescription, setNewWorkflowDescription] = useState("")

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateWorkflow = () => {
    if (newWorkflowName.trim()) {
      const newWorkflow: Workflow = {
        id: Date.now().toString(),
        name: newWorkflowName,
        description: newWorkflowDescription,
        status: "draft",
        nodes: 0,
        connections: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      }

      setWorkflows(prev => [...prev, newWorkflow])
      setNewWorkflowName("")
      setNewWorkflowDescription("")
      setIsCreateDialogOpen(false)
    }
  }

  const handleDeleteWorkflow = (workflowId: string) => {
    if (confirm("Are you sure you want to delete this workflow?")) {
      setWorkflows(prev => prev.filter(w => w.id !== workflowId))
    }
  }

  const handleToggleStatus = (workflowId: string) => {
    setWorkflows(prev => prev.map(workflow =>
      workflow.id === workflowId
        ? { ...workflow, status: workflow.status === "active" ? "inactive" : "active" }
        : workflow
    ))
  }

  const handleDuplicateWorkflow = (workflow: Workflow) => {
    const duplicatedWorkflow: Workflow = {
      ...workflow,
      id: Date.now().toString(),
      name: `${workflow.name} (Copy)`,
      status: "draft",
      lastRun: undefined,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    }
    setWorkflows(prev => [...prev, duplicatedWorkflow])
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
                  <h1 className="text-lg font-semibold">Workflow Management</h1>
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search workflows..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Workflow
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Workflow</DialogTitle>
                    <DialogDescription>
                      Create a new automated workflow to streamline your processes.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="workflow-name">Workflow Name</Label>
                      <Input
                        id="workflow-name"
                        value={newWorkflowName}
                        onChange={(e) => setNewWorkflowName(e.target.value)}
                        placeholder="Enter workflow name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workflow-description">Description</Label>
                      <Textarea
                        id="workflow-description"
                        value={newWorkflowDescription}
                        onChange={(e) => setNewWorkflowDescription(e.target.value)}
                        placeholder="Describe what this workflow does"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateWorkflow} disabled={!newWorkflowName.trim()}>
                      Create Workflow
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Workflow Management</h2>
                  <p className="text-muted-foreground">
                    Create and manage automated workflows for your business processes
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {filteredWorkflows.length} workflows
                  </span>
                </div>
              </div>

              {filteredWorkflows.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <GitBranch className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No workflows yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first automated workflow to get started
                  </p>
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Workflow
                  </Button>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {filteredWorkflows.map((workflow) => (
                    <Card key={workflow.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg">{workflow.name}</CardTitle>
                              <Badge
                                variant={workflow.status === "active" ? "default" : workflow.status === "inactive" ? "secondary" : "outline"}
                              >
                                {workflow.status}
                              </Badge>
                            </div>
                            <CardDescription>{workflow.description}</CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/workflow/builder/${workflow.id}`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/workflow/builder/${workflow.id}?view=true`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicateWorkflow(workflow)}>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleToggleStatus(workflow.id)}
                                className={workflow.status === "active" ? "text-orange-600" : "text-green-600"}
                              >
                                {workflow.status === "active" ? (
                                  <>
                                    <Square className="mr-2 h-4 w-4" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <Play className="mr-2 h-4 w-4" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteWorkflow(workflow.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Nodes</div>
                            <div className="font-medium">{workflow.nodes}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Connections</div>
                            <div className="font-medium">{workflow.connections}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Last Run</div>
                            <div className="font-medium">
                              {workflow.lastRun || "Never"}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Updated</div>
                            <div className="font-medium">{workflow.updatedAt}</div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/workflow/builder/${workflow.id}`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/workflow/builder/${workflow.id}?view=true`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Link>
                          </Button>
                          <Button
                            variant={workflow.status === "active" ? "destructive" : "default"}
                            size="sm"
                            onClick={() => handleToggleStatus(workflow.id)}
                          >
                            {workflow.status === "active" ? (
                              <>
                                <Square className="h-4 w-4 mr-2" />
                                Stop
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Start
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
