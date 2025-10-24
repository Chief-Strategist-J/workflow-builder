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
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: SettingsIcon,
    isActive: true,
  },
]

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Project manager with 5+ years of experience in web development and team leadership.",
    location: "New York, NY",
    timezone: "EST",
    language: "en",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    projectUpdates: true,
    teamActivity: true,
    marketingEmails: false,
    weeklyReports: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "team",
    activityStatus: true,
    dataSharing: false,
    analyticsTracking: true,
  })

  // Modal states
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [isTwoFactorOpen, setIsTwoFactorOpen] = useState(false)
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)

  // Form states
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [twoFactorData, setTwoFactorData] = useState({
    phoneNumber: "",
    verificationCode: "",
  })

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production API", key: "sk_prod_1234567890abcdef", created: "2024-01-15", lastUsed: "2024-01-20" },
    { id: 2, name: "Development API", key: "sk_dev_0987654321fedcba", created: "2024-01-10", lastUsed: "2024-01-18" },
  ])

  const [newApiKeyName, setNewApiKeyName] = useState("")
  const [copiedKeyId, setCopiedKeyId] = useState<number | null>(null)

  const handleCopyApiKey = async (key: string, keyId: number) => {
    try {
      await navigator.clipboard.writeText(key)
      setCopiedKeyId(keyId)
      setTimeout(() => setCopiedKeyId(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleChangePassword = () => {
    if (changePasswordData.newPassword === changePasswordData.confirmPassword) {
      // Simulate password change
      alert("Password changed successfully!")
      setChangePasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setIsChangePasswordOpen(false)
    } else {
      alert("New password and confirm password don't match!")
    }
  }

  const handleEnableTwoFactor = () => {
    if (twoFactorData.phoneNumber && twoFactorData.verificationCode) {
      alert("Two-factor authentication enabled successfully!")
      setTwoFactorData({ phoneNumber: "", verificationCode: "" })
      setIsTwoFactorOpen(false)
    } else {
      alert("Please enter both phone number and verification code!")
    }
  }

  const handleCreateApiKey = () => {
    if (newApiKeyName.trim()) {
      const newKey = {
        id: apiKeys.length + 1,
        name: newApiKeyName,
        key: `sk_${Math.random().toString(36).substring(2, 15)}`,
        created: new Date().toISOString().split('T')[0],
        lastUsed: "Never"
      }
      setApiKeys([...apiKeys, newKey])
      setNewApiKeyName("")
    }
  }

  const handleDeleteApiKey = (keyId: number) => {
    setApiKeys(apiKeys.filter(key => key.id !== keyId))
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you absolutely sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deletion initiated. You will receive a confirmation email.")
      setIsDeleteAccountOpen(false)
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
                <h1 className="text-lg font-semibold">Settings</h1>
              </div>
            </div>
          </header>

          <main className="flex-1 space-y-6 p-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
              <p className="text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal information and profile details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button variant="outline">Change Avatar</Button>
                        <p className="text-sm text-muted-foreground">
                          JPG, GIF or PNG. 1MB max.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) =>
                            setProfile({ ...profile, firstName: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) =>
                            setProfile({ ...profile, lastName: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) =>
                            setProfile({ ...profile, phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) =>
                            setProfile({ ...profile, location: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={profile.bio}
                        onChange={(e) =>
                          setProfile({ ...profile, bio: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select value={profile.timezone}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EST">Eastern Time</SelectItem>
                            <SelectItem value="PST">Pacific Time</SelectItem>
                            <SelectItem value="CST">Central Time</SelectItem>
                            <SelectItem value="MST">Mountain Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select value={profile.language}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose how you want to be notified about updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            emailNotifications: checked,
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications in your browser
                        </p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            pushNotifications: checked,
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Project Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about project milestones and updates
                        </p>
                      </div>
                      <Switch
                        checked={notifications.projectUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            projectUpdates: checked,
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Team Activity</Label>
                        <p className="text-sm text-muted-foreground">
                          Notifications about team member activities
                        </p>
                      </div>
                      <Switch
                        checked={notifications.teamActivity}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            teamActivity: checked,
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive promotional emails and newsletters
                        </p>
                      </div>
                      <Switch
                        checked={notifications.marketingEmails}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            marketingEmails: checked,
                          })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Weekly summary of your activity and progress
                        </p>
                      </div>
                      <Switch
                        checked={notifications.weeklyReports}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            weeklyReports: checked,
                          })
                        }
                      />
                    </div>

                    <Button>Save Preferences</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription>
                      Control your privacy and data sharing preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Profile Visibility</Label>
                      <Select value={privacy.profileVisibility}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="team">Team Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Who can see your profile information
                      </p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Activity Status</Label>
                        <p className="text-sm text-muted-foreground">
                          Show when you're online and active
                        </p>
                      </div>
                      <Switch
                        checked={privacy.activityStatus}
                        onCheckedChange={(checked) =>
                          setPrivacy({ ...privacy, activityStatus: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Data Sharing</Label>
                        <p className="text-sm text-muted-foreground">
                          Share anonymous usage data to improve our service
                        </p>
                      </div>
                      <Switch
                        checked={privacy.dataSharing}
                        onCheckedChange={(checked) =>
                          setPrivacy({ ...privacy, dataSharing: checked })
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Analytics Tracking</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow analytics tracking for personalized experience
                        </p>
                      </div>
                      <Switch
                        checked={privacy.analyticsTracking}
                        onCheckedChange={(checked) =>
                          setPrivacy({ ...privacy, analyticsTracking: checked })
                        }
                      />
                    </div>

                    <Button>Save Privacy Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      Account Security
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and authentication
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Button variant="outline" onClick={() => setIsChangePasswordOpen(true)}>
                        Change Password
                      </Button>
                      <Button variant="outline" onClick={() => setIsTwoFactorOpen(true)}>
                        Enable Two-Factor Authentication
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Manage API Keys</h3>
                        <p className="text-sm text-muted-foreground">
                          Create and manage API keys for your applications
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <Input
                          value={newApiKeyName}
                          onChange={(e) => setNewApiKeyName(e.target.value)}
                          placeholder="Enter API key name"
                          className="flex-1"
                        />
                        <Button onClick={handleCreateApiKey} disabled={!newApiKeyName.trim()}>
                          Create API Key
                        </Button>
                      </div>

                      <Card>
                        <CardContent className="p-0">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>API Key</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Last Used</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {apiKeys.map((apiKey) => (
                                <TableRow key={apiKey.id}>
                                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono text-sm">{apiKey.key}</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleCopyApiKey(apiKey.key, apiKey.id)}
                                        className="h-8 w-8 p-0"
                                      >
                                        {copiedKeyId === apiKey.id ? (
                                          <Check className="h-4 w-4 text-green-600" />
                                        ) : (
                                          <Copy className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </TableCell>
                                  <TableCell>{apiKey.created}</TableCell>
                                  <TableCell>{apiKey.lastUsed}</TableCell>
                                  <TableCell>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDeleteApiKey(apiKey.id)}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      Delete
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium text-red-600">Danger Zone</h4>
                      <Button variant="destructive" className="w-full" onClick={() => setIsDeleteAccountOpen(true)}>
                        Delete Account
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>

        {/* Change Password Modal */}
        <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Enter your current password and choose a new one
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={changePasswordData.currentPassword}
                  onChange={(e) => setChangePasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={changePasswordData.newPassword}
                  onChange={(e) => setChangePasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={changePasswordData.confirmPassword}
                  onChange={(e) => setChangePasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleChangePassword}>
                Change Password
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Two-Factor Authentication Modal */}
        <Dialog open={isTwoFactorOpen} onOpenChange={setIsTwoFactorOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
              <DialogDescription>
                Add an extra layer of security to your account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input
                  id="phone-number"
                  value={twoFactorData.phoneNumber}
                  onChange={(e) => setTwoFactorData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="verification-code">Verification Code</Label>
                <Input
                  id="verification-code"
                  value={twoFactorData.verificationCode}
                  onChange={(e) => setTwoFactorData(prev => ({ ...prev, verificationCode: e.target.value }))}
                  placeholder="Enter verification code"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                We'll send a verification code to your phone number
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTwoFactorOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEnableTwoFactor}>
                Enable 2FA
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Account Modal */}
        <Dialog open={isDeleteAccountOpen} onOpenChange={setIsDeleteAccountOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-red-600">Delete Account</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>Warning:</strong> This will delete:
                </p>
                <ul className="text-sm text-red-700 mt-2 list-disc list-inside">
                  <li>All your projects and data</li>
                  <li>Your team memberships</li>
                  <li>All API keys and integrations</li>
                  <li>Your account information</li>
                </ul>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-delete">Type "DELETE" to confirm</Label>
                <Input
                  id="confirm-delete"
                  placeholder="Type DELETE to confirm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteAccountOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  )
}
