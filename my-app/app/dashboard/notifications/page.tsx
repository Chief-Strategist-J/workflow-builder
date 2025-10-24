"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Settings as SettingsIcon,
  BarChart3,
  FileText,
  Users,
  Calendar,
  Home,
  AlertCircle,
  CheckCircle,
  Info,
  X,
  Filter,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
    isActive: true,
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

interface Notification {
  id: number
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Project Milestone Reached",
    message: "E-commerce Website project has reached 75% completion",
    type: "success",
    timestamp: "2 hours ago",
    read: false,
    priority: "high"
  },
  {
    id: 2,
    title: "New Team Member Joined",
    message: "Sarah Wilson has joined the Mobile App Redesign project",
    type: "info",
    timestamp: "4 hours ago",
    read: false,
    priority: "medium"
  },
  {
    id: 3,
    title: "API Key Expiring Soon",
    message: "Production API key will expire in 3 days",
    type: "warning",
    timestamp: "1 day ago",
    read: true,
    priority: "high"
  },
  {
    id: 4,
    title: "Weekly Report Ready",
    message: "Your weekly activity report is now available",
    type: "info",
    timestamp: "2 days ago",
    read: true,
    priority: "low"
  },
  {
    id: 5,
    title: "Security Alert",
    message: "Unusual login activity detected from San Francisco, CA",
    type: "error",
    timestamp: "3 days ago",
    read: true,
    priority: "high"
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <X className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "default"
      case "warning":
        return "outline"
      case "error":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "outline"
      default:
        return "secondary"
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType = filterType === "all" || notification.type === filterType
    const matchesStatus = filterStatus === "all" ||
      (filterStatus === "unread" && !notification.read) ||
      (filterStatus === "read" && notification.read)
    return matchesType && matchesStatus
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
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
                  <h1 className="text-lg font-semibold">Notifications</h1>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>

                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    Mark All Read ({unreadCount})
                  </Button>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 space-y-6 p-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
              <p className="text-muted-foreground">
                Stay updated with your project activity and security alerts
              </p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>

              <div className="ml-auto">
                <Badge variant="secondary">
                  {filteredNotifications.length} notifications
                </Badge>
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <Card className="p-12 text-center">
                  <CardContent>
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
                    <p className="text-muted-foreground">
                      {filterType !== "all" || filterStatus !== "all"
                        ? "Try adjusting your filters"
                        : "You're all caught up! No new notifications."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredNotifications.map((notification) => (
                  <Card key={notification.id} className={`hover:shadow-md transition-shadow ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {getTypeIcon(notification.type)}
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{notification.title}</h4>
                              <Badge variant={getPriorityColor(notification.priority) as any} className="text-xs">
                                {notification.priority}
                              </Badge>
                              <Badge variant={getTypeColor(notification.type) as any} className="text-xs">
                                {notification.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                            <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as Read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified about updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Project Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified about project milestones and updates
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Security Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Notifications about security events and login activity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
