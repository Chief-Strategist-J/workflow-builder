"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  BarChart3,
  FileText,
  MoreHorizontal,
  UserPlus,
  MessageCircle,
  Edit,
  Trash2,
  Send,
  User,
  X,
  Bell,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  status: "online" | "away" | "offline"
  projects: number
  joinDate: string
  location: string
  phone: string
  skills: string[]
}

const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    avatar: "/placeholder-avatar.jpg",
    status: "online",
    projects: 8,
    joinDate: "Jan 2024",
    location: "New York, NY",
    phone: "+1 (555) 123-4567",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "manager",
    avatar: "/placeholder-avatar.jpg",
    status: "away",
    projects: 5,
    joinDate: "Feb 2024",
    location: "San Francisco, CA",
    phone: "+1 (555) 234-5678",
    skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "developer",
    avatar: "/placeholder-avatar.jpg",
    status: "offline",
    projects: 6,
    joinDate: "Mar 2024",
    location: "Austin, TX",
    phone: "+1 (555) 345-6789",
    skills: ["React", "Vue.js", "CSS", "JavaScript"],
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "developer",
    avatar: "/placeholder-avatar.jpg",
    status: "online",
    projects: 7,
    joinDate: "Jan 2024",
    location: "Seattle, WA",
    phone: "+1 (555) 456-7890",
    skills: ["Node.js", "Python", "PostgreSQL", "Docker"],
  },
]

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-500"
    case "away":
      return "bg-yellow-500"
    case "offline":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editData, setEditData] = useState({
    name: "",
    role: "",
    status: "",
    location: "",
    phone: "",
    skills: [] as string[]
  })
  const [newSkill, setNewSkill] = useState("")
  const [emailData, setEmailData] = useState({ subject: "", message: "" })
  const [messageData, setMessageData] = useState({ subject: "", message: "" })

  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendEmail = (member: TeamMember) => {
    setSelectedMember(member)
    setEmailData({ subject: "", message: "" })
    setIsEmailModalOpen(true)
  }

  const handleSendMessage = (member: TeamMember) => {
    setSelectedMember(member)
    setMessageData({ subject: "", message: "" })
    setIsMessageModalOpen(true)
  }

  const handleEditProfile = (member: TeamMember) => {
    setSelectedMember(member)
    setEditData({
      name: member.name,
      role: member.role,
      status: member.status,
      location: member.location,
      phone: member.phone,
      skills: member.skills
    })
    setIsEditModalOpen(true)
  }

  const handleChangeRole = (memberId: string, newRole: string) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    )
    console.log("Role changed for member:", memberId, "to:", newRole)
  }

  const handleChangeStatus = (memberId: string, newStatus: string) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === memberId ? { ...member, status: newStatus as "online" | "away" | "offline" } : member
      )
    )
    console.log("Status changed for member:", memberId, "to:", newStatus)
  }

  const handleRemoveMember = (memberId: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId))
    console.log("Member removed:", memberId)
  }

  const submitEmail = () => {
    if (selectedMember && emailData.subject && emailData.message) {
      console.log("Sending email to:", selectedMember.email, emailData)
      alert(`Email sent to ${selectedMember.name}!`)
      setIsEmailModalOpen(false)
      setEmailData({ subject: "", message: "" })
    }
  }

  const submitMessage = () => {
    if (selectedMember && messageData.subject && messageData.message) {
      console.log("Sending message to:", selectedMember.email, messageData)
      alert(`Message sent to ${selectedMember.name}!`)
      setIsMessageModalOpen(false)
      setMessageData({ subject: "", message: "" })
    }
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      setEditData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const submitEdit = () => {
    if (selectedMember && editData.name) {
      setTeamMembers(prev =>
        prev.map(member =>
          member.id === selectedMember.id
            ? {
                ...member,
                name: editData.name,
                role: editData.role,
                status: editData.status as "online" | "away" | "offline",
                location: editData.location,
                phone: editData.phone,
                skills: editData.skills
              }
            : member
        )
      )
      console.log("Profile updated for:", selectedMember.email, editData)
      alert(`Profile updated for ${editData.name}!`)
      setIsEditModalOpen(false)
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
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-6">
              <SidebarTrigger />

              <div className="flex-1">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search team members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" asChild>
                  <Link href="/dashboard/invite-team">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Member
                  </Link>
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 space-y-6 p-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Team</h2>
              <p className="text-muted-foreground">
                Manage your team members and their roles
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          <CardDescription>{member.role}</CardDescription>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleSendEmail(member)}>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendMessage(member)}>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditProfile(member)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                          </DropdownMenuItem>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Users className="mr-2 h-4 w-4" />
                                Change Role
                              </DropdownMenuItem>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" align="start">
                              <DropdownMenuItem onClick={() => handleChangeRole(member.id, 'admin')}>
                                Administrator
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleChangeRole(member.id, 'manager')}>
                                Project Manager
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleChangeRole(member.id, 'developer')}>
                                Developer
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleChangeRole(member.id, 'viewer')}>
                                Viewer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <User className="mr-2 h-4 w-4" />
                                Change Status
                              </DropdownMenuItem>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" align="start">
                              <DropdownMenuItem onClick={() => handleChangeStatus(member.id, 'online')}>
                                Online
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleChangeStatus(member.id, 'away')}>
                                Away
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleChangeStatus(member.id, 'offline')}>
                                Offline
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove from Team
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove {member.name} from the team? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleRemoveMember(member.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{member.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{member.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Joined {member.joinDate}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Projects</span>
                        <Badge variant="secondary">{member.projects}</Badge>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Status</span>
                        <Badge variant="outline" className="capitalize">
                          {member.status}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <Card className="p-12 text-center">
                <CardContent>
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No team members found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery
                      ? "Try adjusting your search query"
                      : "Start by inviting your first team member"}
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/invite-team">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite Member
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </main>
        </div>

        {/* Email Modal */}
        <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Email to {selectedMember?.name}</DialogTitle>
              <DialogDescription>
                Compose an email to send to {selectedMember?.email}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-subject">Subject</Label>
                <Input
                  id="email-subject"
                  value={emailData.subject}
                  onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter email subject"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-body">Message</Label>
                <Textarea
                  id="email-body"
                  rows={6}
                  value={emailData.message}
                  onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter your message"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitEmail}>
                <Send className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Message Modal */}
        <Dialog open={isMessageModalOpen} onOpenChange={setIsMessageModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Message to {selectedMember?.name}</DialogTitle>
              <DialogDescription>
                Send an internal message to {selectedMember?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message-subject">Subject</Label>
                <Input
                  id="message-subject"
                  value={messageData.subject}
                  onChange={(e) => setMessageData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter message subject"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message-body">Message</Label>
                <Textarea
                  id="message-body"
                  rows={6}
                  value={messageData.message}
                  onChange={(e) => setMessageData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter your message"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsMessageModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitMessage}>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Profile Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile - {selectedMember?.name}</DialogTitle>
              <DialogDescription>
                Update the profile information for {selectedMember?.email}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select value={editData.role} onValueChange={(value: string) => setEditData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Project Manager</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={editData.status} onValueChange={(value: string) => setEditData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="away">Away</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={editData.location}
                  onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-skills">Skills</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="edit-skills"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Add a skill (e.g., React, Node.js)"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleAddSkill}
                      disabled={!newSkill.trim()}
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {editData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {editData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="pr-1">
                          {skill}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 ml-2 hover:bg-transparent"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitEdit}>
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
