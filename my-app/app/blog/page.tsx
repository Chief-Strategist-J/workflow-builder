"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Tag,
  Search,
  BookOpen,
} from "lucide-react"
import { Input } from "@/components/ui/input"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Remote Team Collaboration",
    excerpt: "Discover how remote teams are evolving and the tools that are making collaboration more effective than ever before.",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Remote Work",
    image: "/placeholder-blog.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "10 Project Management Best Practices for 2024",
    excerpt: "Learn the essential project management techniques that successful teams use to deliver projects on time and under budget.",
    author: "Michael Rodriguez",
    date: "2024-01-12",
    readTime: "8 min read",
    category: "Project Management",
    image: "/placeholder-blog.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Data-Driven Decision Making: A Complete Guide",
    excerpt: "How to leverage analytics and insights to make better business decisions and drive team performance.",
    author: "Alex Johnson",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Analytics",
    image: "/placeholder-blog.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Building High-Performance Teams in Tech",
    excerpt: "Strategies for recruiting, developing, and retaining top talent in the competitive tech industry.",
    author: "Emma Davis",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "Team Building",
    image: "/placeholder-blog.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Security Best Practices for Modern Teams",
    excerpt: "Essential security measures every team should implement to protect their data and workflows.",
    author: "David Kim",
    date: "2024-01-05",
    readTime: "4 min read",
    category: "Security",
    image: "/placeholder-blog.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "Agile vs Waterfall: Choosing the Right Methodology",
    excerpt: "A comprehensive comparison of project management methodologies to help you choose the best approach for your team.",
    author: "Lisa Garcia",
    date: "2024-01-03",
    readTime: "10 min read",
    category: "Methodology",
    image: "/placeholder-blog.jpg",
    featured: false,
  },
]

const categories = ["All", "Project Management", "Remote Work", "Analytics", "Team Building", "Security", "Methodology"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Insights, best practices, and industry trends to help you build better teams and achieve your goals.
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <Card key={post.id} className="border-0 shadow-xl mb-12 overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow" onClick={() => window.location.href = `/blog/${post.id}`}>
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 bg-muted relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white" />
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">Featured</Badge>
                  <Badge variant="outline">{post.category}</Badge>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Button size="lg" asChild>
                  <Link href={`/blog/${post.id}`}>
                    Read Article
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Blog Posts Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Latest Articles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => window.location.href = `/blog/${post.id}`}>
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="outline" className="bg-white/90">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Button variant="ghost" size="sm" className="w-full" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read More
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Stay Updated with Our Latest Insights
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Get weekly articles, tips, and industry insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
