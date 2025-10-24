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
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Plus,
  Users,
  Calendar,
  DollarSign,
  Target,
  Clock,
  CheckCircle,
  X,
  User,
} from "lucide-react"

const projectTemplates = [
  {
    id: "website",
    name: "Website Development",
    description: "Build a modern, responsive website",
    icon: "🌐",
    duration: "2-4 weeks",
    budget: "$5,000 - $15,000",
  },
  {
    id: "mobile",
    name: "Mobile App",
    description: "Native or cross-platform mobile application",
    icon: "📱",
    duration: "6-12 weeks",
    budget: "$15,000 - $50,000",
  },
  {
    id: "branding",
    name: "Brand Identity",
    description: "Logo design and complete brand package",
    icon: "🎨",
    duration: "2-3 weeks",
    budget: "$2,000 - $8,000",
  },
  {
    id: "marketing",
    name: "Marketing Campaign",
    description: "Digital marketing strategy and execution",
    icon: "📢",
    duration: "1-3 months",
    budget: "$3,000 - $20,000",
  },
]

const availableTeamMembers = [
  {
    id: "1",
    name: "John Doe",
    role: "Project Manager",
    avatar: "/placeholder-avatar.jpg",
    email: "john@example.com",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "UI/UX Designer",
    avatar: "/placeholder-avatar.jpg",
    email: "jane@example.com",
    skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
  },
  {
    id: "3",
    name: "Mike Johnson",
    role: "Frontend Developer",
    avatar: "/placeholder-avatar.jpg",
    email: "mike@example.com",
    skills: ["React", "Vue.js", "CSS", "JavaScript"],
  },
  {
    id: "4",
    name: "Sarah Wilson",
    role: "Backend Developer",
    avatar: "/placeholder-avatar.jpg",
    email: "sarah@example.com",
    skills: ["Node.js", "Python", "PostgreSQL", "Docker"],
  },
  {
    id: "5",
    name: "Alex Brown",
    role: "DevOps Engineer",
    avatar: "/placeholder-avatar.jpg",
    email: "alex@example.com",
    skills: ["Kubernetes", "AWS", "Docker", "CI/CD"],
  },
  {
    id: "6",
    name: "Emma Davis",
    role: "QA Engineer",
    avatar: "/placeholder-avatar.jpg",
    email: "emma@example.com",
    skills: ["Selenium", "Jest", "Cypress", "Test Automation"],
  },
]

export default function CreateProjectPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    template: "",
    budget: "",
    deadline: "",
    priority: "medium",
    team: [] as string[],
  })

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.description) {
      alert("Please fill in all required fields")
      return
    }

    setIsCreating(true)

    // Simulate project creation
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log("Creating project:", formData)
    alert(`Project "${formData.name}" created successfully!`)

    // Reset form
    setFormData({
      name: "",
      description: "",
      template: "",
      budget: "",
      deadline: "",
      priority: "medium",
      team: [],
    })
    setIsCreating(false)
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = projectTemplates.find(t => t.id === templateId)
    if (template) {
      setFormData(prev => ({
        ...prev,
        name: template.name,
        description: template.description,
        budget: template.budget.split(' - ')[0].replace('$', '').replace(',', ''),
        template: templateId,
      }))
    }
  }

  const handleTeamMemberToggle = (memberId: string) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.includes(memberId)
        ? prev.team.filter(id => id !== memberId)
        : [...prev.team, memberId]
    }))
  }

  const handleSelectAllTeam = () => {
    setFormData(prev => ({
      ...prev,
      team: availableTeamMembers.map(member => member.id)
    }))
  }

  const handleClearTeam = () => {
    setFormData(prev => ({
      ...prev,
      team: []
    }))
  }

  const selectedTeamMembers = availableTeamMembers.filter(member =>
    formData.team.includes(member.id)
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="text-center space-y-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <Plus className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create New Project
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Start a new project and bring your ideas to life
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  Provide the basic information for your new project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter project name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      placeholder="Describe your project goals and requirements"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-5k">Under $5,000</SelectItem>
                          <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                          <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                          <SelectItem value="over-50k">Over $50,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Target Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    />
                  </div>

                  {/* Team Assignment */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Team Members</Label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleSelectAllTeam}
                        >
                          Select All
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleClearTeam}
                        >
                          Clear All
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {selectedTeamMembers.map((member) => (
                        <Badge key={member.id} variant="secondary" className="justify-center py-2">
                          <User className="h-3 w-3 mr-1" />
                          {member.name}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 ml-1"
                            onClick={() => handleTeamMemberToggle(member.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>

                    <Dialog open={isTeamModalOpen} onOpenChange={setIsTeamModalOpen}>
                      <DialogTrigger asChild>
                        <Button type="button" variant="outline" className="w-full">
                          <Users className="mr-2 h-4 w-4" />
                          {selectedTeamMembers.length > 0
                            ? `Manage Team (${selectedTeamMembers.length} selected)`
                            : "Assign Team Members"
                          }
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Assign Team Members</DialogTitle>
                          <DialogDescription>
                            Select team members to work on this project
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {availableTeamMembers.map((member) => (
                            <div key={member.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                              <Checkbox
                                id={member.id}
                                checked={formData.team.includes(member.id)}
                                onCheckedChange={() => handleTeamMemberToggle(member.id)}
                              />
                              <div className="flex-1">
                                <label htmlFor={member.id} className="text-sm font-medium cursor-pointer">
                                  {member.name}
                                </label>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{member.role}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {member.skills.slice(0, 2).map((skill) => (
                                    <Badge key={skill} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsTeamModalOpen(false)}>
                            Done
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isCreating}>
                    {isCreating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Creating Project...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Project
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Project Templates */}
          <div>
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Project Templates</CardTitle>
                <CardDescription>
                  Start with a proven template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {projectTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.template === template.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{template.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {template.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {template.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {template.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {template.budget}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Project Tips */}
            <Card className="border-0 shadow-xl mt-6">
              <CardHeader>
                <CardTitle>💡 Tips for Success</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Clear Objectives</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Define specific, measurable goals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Realistic Timeline</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Set achievable deadlines</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Team Communication</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Keep everyone aligned</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Summary */}
            {formData.name && (
              <Card className="border-0 shadow-xl mt-6">
                <CardHeader>
                  <CardTitle>Project Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Name:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  {formData.description && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Description:</span>
                      <span className="font-medium text-sm">{formData.description}</span>
                    </div>
                  )}
                  {formData.budget && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Budget:</span>
                      <Badge variant="outline">${formData.budget.replace('k', '000')}</Badge>
                    </div>
                  )}
                  {formData.priority && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Priority:</span>
                      <Badge variant={formData.priority === 'urgent' ? 'destructive' : 'default'}>
                        {formData.priority}
                      </Badge>
                    </div>
                  )}
                  {formData.deadline && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Deadline:</span>
                      <span className="font-medium">{new Date(formData.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                  {selectedTeamMembers.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Team:</span>
                      <span className="font-medium">{selectedTeamMembers.length} members</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
