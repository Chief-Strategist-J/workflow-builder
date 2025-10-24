"use client"

import { useState } from "react"
import Link from "next/link"
import {
  User,
  Settings as SettingsIcon,
  BarChart3,
  FileText,
  Users,
  Calendar,
  Home,
  Bell,
  Camera,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Save,
  X,
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
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
    isActive: true,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: SettingsIcon,
  },
]

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Full-stack developer with 5+ years of experience in React, Next.js, and Node.js. Passionate about creating beautiful and functional user experiences.",
    location: "New York, NY",
    timezone: "EST",
    language: "en",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    company: "Tech Corp Inc.",
    position: "Senior Developer",
    department: "Engineering",
    manager: "Jane Smith",
    startDate: "2023-01-15",
    employeeId: "EMP001",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editProfile, setEditProfile] = useState(profile)

  const handleSave = () => {
    setProfile(editProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditProfile(profile)
    setIsEditing(false)
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
                  <h1 className="text-lg font-semibold">Profile</h1>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    "Edit Profile"
                  )}
                </Button>

                {isEditing && (
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 space-y-6 p-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
              <p className="text-muted-foreground">
                Manage your personal information and professional details
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Profile Picture & Basic Info */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="text-lg">JD</AvatarFallback>
                    </Avatar>

                    <Button variant="outline" className="w-full">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      JPG, GIF or PNG. Max size 2MB.
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Senior Developer</Badge>
                      <Badge variant="outline">Engineering</Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{profile.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Started {profile.startDate}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Information */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={isEditing ? editProfile.firstName : profile.firstName}
                        onChange={(e) => setEditProfile(prev => ({ ...prev, firstName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={isEditing ? editProfile.lastName : profile.lastName}
                        onChange={(e) => setEditProfile(prev => ({ ...prev, lastName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editProfile.email : profile.email}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={isEditing ? editProfile.phone : profile.phone}
                        onChange={(e) => setEditProfile(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={isEditing ? editProfile.location : profile.location}
                        onChange={(e) => setEditProfile(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={isEditing ? editProfile.bio : profile.bio}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={isEditing ? editProfile.timezone : profile.timezone}
                        onValueChange={(value) => setEditProfile(prev => ({ ...prev, timezone: value }))}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                          <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                          <SelectItem value="CST">Central Time (CST)</SelectItem>
                          <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={isEditing ? editProfile.language : profile.language}
                        onValueChange={(value) => setEditProfile(prev => ({ ...prev, language: value }))}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>
                  Your work details and professional profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={isEditing ? editProfile.company : profile.company}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, company: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={isEditing ? editProfile.position : profile.position}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, position: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={isEditing ? editProfile.department : profile.department}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, department: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      value={isEditing ? editProfile.employeeId : profile.employeeId}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, employeeId: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manager">Manager</Label>
                  <Input
                    id="manager"
                    value={isEditing ? editProfile.manager : profile.manager}
                    onChange={(e) => setEditProfile(prev => ({ ...prev, manager: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Online Presence */}
            <Card>
              <CardHeader>
                <CardTitle>Online Presence</CardTitle>
                <CardDescription>
                  Your social media and professional profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    value={isEditing ? editProfile.website : profile.website}
                    onChange={(e) => setEditProfile(prev => ({ ...prev, website: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={isEditing ? editProfile.linkedin : profile.linkedin}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, linkedin: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={isEditing ? editProfile.github : profile.github}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, github: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={isEditing ? editProfile.twitter : profile.twitter}
                    onChange={(e) => setEditProfile(prev => ({ ...prev, twitter: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>
                  Quick actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/settings">
                      <SettingsIcon className="h-4 w-4 mr-2" />
                      Account Settings
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/notifications">
                      <Bell className="h-4 w-4 mr-2" />
                      Notification Settings
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/team">
                      <Users className="h-4 w-4 mr-2" />
                      Team Management
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
