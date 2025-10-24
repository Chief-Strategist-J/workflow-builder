"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
  FileText,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Edit,
  Archive,
  Trash2,
  Bell,
  User,
  Settings as SettingsIcon,
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
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

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
    isActive: true,
  },
  {
    title: "Team",
    url: "/dashboard/team",
    icon: Users,
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

const projects: Project[] = [
  {
    id: 1,
    name: "E-commerce Website",
    description: "Modern online store with React and Node.js",
    status: "In Progress",
    progress: 75,
    dueDate: "Dec 15, 2024",
    team: ["John Doe", "Jane Smith", "Mike Johnson"],
    budget: "$15,000",
  },
  {
    id: 2,
    name: "Mobile App Redesign",
    description: "Complete UI/UX overhaul for iOS and Android",
    status: "Review",
    progress: 90,
    dueDate: "Dec 10, 2024",
    team: ["Sarah Wilson", "Alex Brown"],
    budget: "$8,500",
  },
  {
    id: 3,
    name: "Brand Identity",
    description: "Logo design and brand guidelines",
    status: "Completed",
    progress: 100,
    dueDate: "Nov 30, 2024",
    team: ["Emma Davis", "Chris Miller"],
    budget: "$3,200",
  },
  {
    id: 4,
    name: "Marketing Campaign",
    description: "Q4 digital marketing strategy and execution",
    status: "Planning",
    progress: 25,
    dueDate: "Jan 15, 2025",
    team: ["Lisa Garcia", "Tom Anderson", "Rachel Lee"],
    budget: "$12,000",
  },
  {
    id: 5,
    name: "API Integration",
    description: "Third-party service integrations",
    status: "In Progress",
    progress: 45,
    dueDate: "Dec 20, 2024",
    team: ["David Kim", "Anna White"],
    budget: "$6,500",
  },
]

interface Project {
  id: number
  name: string
  description: string
  status: string
  progress: number
  dueDate: string
  team: string[]
  budget: string
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "In Progress":
      return <Clock className="h-4 w-4 text-blue-500" />
    case "Review":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />
    case "Planning":
      return <Calendar className="h-4 w-4 text-gray-500" />
    default:
      return <XCircle className="h-4 w-4 text-red-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "default"
    case "In Progress":
      return "secondary"
    case "Review":
      return "outline"
    case "Planning":
      return "destructive"
    default:
      return "outline"
  }
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [projectsData, setProjectsData] = useState<Project[]>(projects)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editProjectData, setEditProjectData] = useState({
    name: "",
    description: "",
    status: "",
    progress: 0,
    dueDate: "",
    team: [] as string[],
    budget: ""
  })

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
    setIsViewModalOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setSelectedProject(project)
    const teamMembers = project.team.length > 0 ? [...project.team] : [""]
    setEditProjectData({
      name: project.name,
      description: project.description,
      status: project.status,
      progress: project.progress,
      dueDate: project.dueDate,
      team: teamMembers,
      budget: project.budget
    })
    setIsEditModalOpen(true)
  }

  const handleArchiveProject = (projectId: number) => {
    setProjectsData(prev =>
      prev.map(project =>
        project.id === projectId ? { ...project, status: "Archived" } : project
      )
    )
    console.log("Project archived:", projectId)
  }

  const handleDeleteProject = (projectId: number) => {
    setProjectsData(prev => prev.filter(project => project.id !== projectId))
    console.log("Project deleted:", projectId)
  }

  const submitEditProject = () => {
    if (selectedProject && editProjectData.name) {
      // Filter out empty team members
      const filteredTeam = editProjectData.team.filter(member => member.trim() !== "")

      setProjectsData(prev =>
        prev.map(project =>
          project.id === selectedProject.id
            ? {
                ...project,
                name: editProjectData.name,
                description: editProjectData.description,
                status: editProjectData.status,
                progress: editProjectData.progress,
                dueDate: editProjectData.dueDate,
                team: filteredTeam,
                budget: editProjectData.budget
              }
            : project
        )
      )
      console.log("Project updated:", selectedProject.id, editProjectData)
      alert(`Project "${editProjectData.name}" updated successfully!`)
      setIsEditModalOpen(false)
      setSelectedProject(null)
    }
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
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 space-y-6 p-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
              <p className="text-muted-foreground">
                Manage and track your projects
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(project)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditProject(project)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleArchiveProject(project.id)}>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Project</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{project.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center space-x-2">
                      {getStatusIcon(project.status)}
                      <Badge variant={getStatusColor(project.status) as any}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Due Date</p>
                        <p className="font-medium">{project.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-medium">{project.budget}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-muted-foreground text-sm mb-2">Team</p>
                      <div className="flex flex-wrap gap-1">
                        {project.team.map((member, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {member}
                          </Badge>
                        ))}
                        {project.team.length === 0 && (
                          <span className="text-muted-foreground text-xs">No team members assigned</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <Card className="p-12 text-center">
                <CardContent>
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "Get started by creating your first project"}
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                </CardContent>
              </Card>
            )}
          </main>
        </div>

        {/* View Details Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedProject?.name}</DialogTitle>
              <DialogDescription>Project Details</DialogDescription>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(selectedProject.status)}
                      <Badge variant={getStatusColor(selectedProject.status) as any}>
                        {selectedProject.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Progress</Label>
                    <p className="text-lg font-semibold mt-1">{selectedProject.progress}%</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedProject.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Due Date</Label>
                    <p className="text-sm mt-1">{selectedProject.dueDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Budget</Label>
                    <p className="text-sm mt-1">{selectedProject.budget}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Team Members</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.team.map((member, index) => (
                      <Badge key={index} variant="outline">
                        {member}
                      </Badge>
                    ))}
                    {selectedProject.team.length === 0 && (
                      <span className="text-muted-foreground text-sm">No team members assigned</span>
                    )}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setIsViewModalOpen(false)
                handleEditProject(selectedProject!)
              }}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Project Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription>Update project information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Project Name</Label>
                <Input
                  id="edit-name"
                  value={editProjectData.name}
                  onChange={(e) => setEditProjectData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter project name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  rows={3}
                  value={editProjectData.description}
                  onChange={(e) => setEditProjectData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter project description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editProjectData.status}
                  onValueChange={(value: string) => setEditProjectData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-progress">Progress (%)</Label>
                  <Input
                    id="edit-progress"
                    type="number"
                    min="0"
                    max="100"
                    value={editProjectData.progress}
                    onChange={(e) => setEditProjectData(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-budget">Budget</Label>
                  <Input
                    id="edit-budget"
                    value={editProjectData.budget}
                    onChange={(e) => setEditProjectData(prev => ({ ...prev, budget: e.target.value }))}
                    placeholder="$0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-due-date">Due Date</Label>
                <Input
                  id="edit-due-date"
                  type="date"
                  value={editProjectData.dueDate}
                  onChange={(e) => setEditProjectData(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Team Members</Label>
                <div className="space-y-2">
                  {editProjectData.team.map((member, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={member}
                        onChange={(e) => {
                          const newTeam = [...editProjectData.team]
                          newTeam[index] = e.target.value
                          setEditProjectData(prev => ({ ...prev, team: newTeam }))
                        }}
                        onBlur={() => {
                          // Remove empty team members when input loses focus
                          const filteredTeam = editProjectData.team.filter(member => member.trim() !== "")
                          if (filteredTeam.length !== editProjectData.team.length) {
                            setEditProjectData(prev => ({ ...prev, team: filteredTeam }))
                          }
                        }}
                        placeholder="Enter team member name"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newTeam = editProjectData.team.filter((_, i) => i !== index)
                          setEditProjectData(prev => ({ ...prev, team: newTeam }))
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Only add if the last team member field is not empty
                      const lastMember = editProjectData.team[editProjectData.team.length - 1]
                      if (lastMember && lastMember.trim() !== "") {
                        setEditProjectData(prev => ({
                          ...prev,
                          team: [...prev.team, ""]
                        }))
                      }
                    }}
                    className="w-full"
                    disabled={editProjectData.team.length > 0 && editProjectData.team[editProjectData.team.length - 1].trim() === ""}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Team Member
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitEditProject}>
                <Edit className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  )
}
