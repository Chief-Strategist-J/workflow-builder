"use client"

import { useState } from "react"
import Link from "next/link"
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  ArrowLeft,
  Users,
  UserPlus,
  Mail,
  Copy,
  CheckCircle,
  X,
  MoreVertical,
  Edit,
  Trash2,
  MessageSquare,
  Send,
  User,
} from "lucide-react"

interface TeamMember {
  id: string
  email: string
  name: string
  role: string
  status: "active" | "pending" | "inactive"
  avatar?: string
  joinDate: string
  lastActive: string
}

const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    email: "john@example.com",
    name: "John Doe",
    role: "admin",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2 minutes ago"
  },
  {
    id: "2",
    email: "jane@example.com",
    name: "Jane Smith",
    role: "manager",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "1 hour ago"
  },
  {
    id: "3",
    email: "mike@example.com",
    name: "Mike Johnson",
    role: "developer",
    status: "active",
    joinDate: "2024-01-08",
    lastActive: "5 hours ago"
  },
  {
    id: "4",
    email: "sarah@example.com",
    name: "Sarah Wilson",
    role: "developer",
    status: "pending",
    joinDate: "2024-01-20",
    lastActive: "Never"
  },
]

export default function InviteTeamPage() {
  const [inviteData, setInviteData] = useState({
    emails: "",
    role: "developer",
    message: "Welcome to the team! I'm excited to work with you on our upcoming projects.",
  })
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers)
  const [copied, setCopied] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [emailData, setEmailData] = useState({ subject: "", message: "" })
  const [messageData, setMessageData] = useState({ subject: "", message: "" })
  const [editData, setEditData] = useState({ name: "", role: "", status: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sending invitations:", inviteData)
    alert("Invitations sent successfully!")
    setInviteData({
      emails: "",
      role: "developer",
      message: "Welcome to the team! I'm excited to work with you on our upcoming projects.",
    })
  }

  const copyInviteLink = async () => {
    const inviteLink = `${window.location.origin}/signup?invite=team-${Date.now()}`
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
      status: member.status
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
        member.id === memberId ? { ...member, status: newStatus as "active" | "pending" | "inactive" } : member
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

  const submitEdit = () => {
    if (selectedMember && editData.name) {
      setTeamMembers(prev =>
        prev.map(member =>
          member.id === selectedMember.id
            ? {
                ...member,
                name: editData.name,
                role: editData.role,
                status: editData.status as "active" | "pending" | "inactive"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="text-center space-y-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <UserPlus className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Team Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your team members, roles, and permissions
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Invitation Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Send Invitations</CardTitle>
                <CardDescription>
                  Invite new team members via email or share an invite link
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="emails">Email Addresses *</Label>
                    <Textarea
                      id="emails"
                      rows={3}
                      placeholder="Enter email addresses (one per line or comma-separated)"
                      value={inviteData.emails}
                      onChange={(e) => setInviteData(prev => ({ ...prev, emails: e.target.value }))}
                      required
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Separate multiple emails with commas or new lines
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={inviteData.role} onValueChange={(value: string) => setInviteData(prev => ({ ...prev, role: value }))}>
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
                    <Label htmlFor="message">Welcome Message</Label>
                    <Textarea
                      id="message"
                      rows={3}
                      placeholder="Add a personal message to your invitation"
                      value={inviteData.message}
                      onChange={(e) => setInviteData(prev => ({ ...prev, message: e.target.value }))}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Invitations
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                      Or share an invite link
                    </span>
                  </div>
                </div>

                {/* Invite Link */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={`${window.location.origin}/signup?invite=team-${Date.now()}`}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button type="button" onClick={copyInviteLink} variant="outline">
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Anyone with this link can join your team with the selected role
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Management */}
          <div className="space-y-6">
            {/* Team Stats */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Team Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Members</span>
                  <span className="font-semibold">{teamMembers.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Active</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {teamMembers.filter(m => m.status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Pending</span>
                  <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                    {teamMembers.filter(m => m.status === 'pending').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Admins</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {teamMembers.filter(m => m.role === 'admin').length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Current Team Members */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage existing team members and their permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                          <Badge
                            variant={member.status === 'active' ? 'default' : member.status === 'pending' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {member.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{member.email}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <Badge variant="outline" className="text-xs capitalize">
                            {member.role}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Joined {new Date(member.joinDate).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Last active: {member.lastActive}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSendEmail(member)}
                        title="Send Email"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSendMessage(member)}
                        title="Send Message"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
                              <DropdownMenuItem onClick={() => handleChangeStatus(member.id, 'active')}>
                                Active
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleChangeStatus(member.id, 'inactive')}>
                                Inactive
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove Member
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
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
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
          <DialogContent>
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
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
    </div>
  )
}
