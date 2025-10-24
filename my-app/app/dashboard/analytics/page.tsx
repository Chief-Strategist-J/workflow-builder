"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpIcon,
  ArrowDownIcon,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Calendar,
  Filter,
  UserCheck,
  Settings,
  LogOut,
  Bell,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Badge } from "@/components/ui/badge"

const navigation = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: TrendingUp,
    isActive: true,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: Activity,
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
    icon: Settings,
  },
]

const metrics = [
  {
    title: "Total Revenue",
    value: "$54,239",
    change: "+12.5%",
    trend: "up",
    period: "vs last month",
  },
  {
    title: "Active Users",
    value: "3,847",
    change: "+8.2%",
    trend: "up",
    period: "vs last month",
  },
  {
    title: "Conversion Rate",
    value: "4.3%",
    change: "-2.1%",
    trend: "down",
    period: "vs last month",
  },
  {
    title: "Avg. Session",
    value: "5m 32s",
    change: "+15.3%",
    trend: "up",
    period: "vs last month",
  },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  const handleLogout = () => {
    // Clear authentication token
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    window.location.href = '/signin'
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
                <h1 className="text-lg font-semibold">Analytics</h1>
              </div>

              <div className="flex items-center gap-2">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">7 days</SelectItem>
                    <SelectItem value="30d">30 days</SelectItem>
                    <SelectItem value="90d">90 days</SelectItem>
                    <SelectItem value="1y">1 year</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>

                <Button variant="outline" size="icon" asChild>
                  <Link href="/dashboard/notifications">
                    <Bell className="h-4 w-4" />
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <div className="h-8 w-8 rounded-full bg-muted" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">John Doe</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          john@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="flex-1 space-y-6 p-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Analytics Overview</h2>
              <p className="text-muted-foreground">
                Track your performance and growth metrics
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric) => (
                <Card key={metric.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {metric.title}
                    </CardTitle>
                    {metric.trend === "up" ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-600" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span
                        className={
                          metric.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {metric.change}
                      </span>
                      <span className="text-muted-foreground">
                        {metric.period}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>
                    Monthly revenue over the past year
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "Jan", value: 4200 },
                      { month: "Feb", value: 3800 },
                      { month: "Mar", value: 5100 },
                      { month: "Apr", value: 4900 },
                      { month: "May", value: 6200 },
                      { month: "Jun", value: 5800 },
                    ].map((item) => (
                      <div key={item.month} className="flex items-center space-x-4">
                        <div className="w-12 text-sm font-medium">
                          {item.month}
                        </div>
                        <div className="flex-1">
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${(item.value / 6200) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-20 text-sm text-right">
                          ${item.value.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>
                    New user registrations over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "Jan", value: 120 },
                      { month: "Feb", value: 98 },
                      { month: "Mar", value: 145 },
                      { month: "Apr", value: 167 },
                      { month: "May", value: 203 },
                      { month: "Jun", value: 189 },
                    ].map((item) => (
                      <div key={item.month} className="flex items-center space-x-4">
                        <div className="w-12 text-sm font-medium">
                          {item.month}
                        </div>
                        <div className="flex-1">
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all"
                              style={{ width: `${(item.value / 203) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-20 text-sm text-right">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Pages</CardTitle>
                <CardDescription>
                  Most visited pages in the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { page: "/dashboard", views: 12543, bounce: "23%" },
                    { page: "/projects", views: 8934, bounce: "31%" },
                    { page: "/signin", views: 6721, bounce: "67%" },
                    { page: "/signup", views: 5432, bounce: "45%" },
                    { page: "/about", views: 3210, bounce: "52%" },
                  ].map((item) => (
                    <div key={item.page} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {item.page}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.views.toLocaleString()} views
                        </p>
                      </div>
                      <Badge variant="outline">{item.bounce} bounce</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
