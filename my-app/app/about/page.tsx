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
import {
  ArrowLeft,
  Users,
  Target,
  Award,
  Heart,
  Shield,
  Zap,
  BarChart3,
} from "lucide-react"

const values = [
  {
    icon: Users,
    title: "Collaboration First",
    description: "We believe in the power of teamwork and collaborative problem-solving to achieve extraordinary results.",
  },
  {
    icon: Target,
    title: "Results Driven",
    description: "Every feature we build is designed to help you achieve measurable outcomes and business success.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, from code quality to customer service.",
  },
  {
    icon: Heart,
    title: "User-Centric",
    description: "Your success is our success. We put users at the center of every decision we make.",
  },
]

const stats = [
  { number: "10,000+", label: "Active Teams" },
  { number: "99.9%", label: "Uptime" },
  { number: "24/7", label: "Support" },
  { number: "50+", label: "Countries" },
]

export default function AboutPage() {
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
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              About Dashboard Pro
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're on a mission to empower teams worldwide with the tools they need to collaborate effectively,
              track progress transparently, and achieve extraordinary results together.
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                Founded in 2020, Dashboard Pro emerged from a simple observation: teams were struggling
                with scattered tools, poor visibility, and inefficient workflows. We set out to create
                a unified platform that brings everything together.
              </p>
              <p>
                Today, we're proud to serve over 10,000 teams across 50+ countries, from startups to
                Fortune 500 companies. Our platform has become the central nervous system for modern
                teams, enabling them to work smarter, faster, and more collaboratively than ever before.
              </p>
              <p>
                We're not just building software – we're building the future of work. Every feature,
                every update, and every improvement is driven by our commitment to helping teams
                achieve their full potential.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              To democratize project management and team collaboration by providing intuitive,
              powerful tools that scale with your team's needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                  <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">Empower Teams</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Give every team member the visibility and tools they need to contribute effectively
                  and make informed decisions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <BarChart3 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">Drive Results</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Provide actionable insights and analytics that help teams track progress,
                  identify bottlenecks, and optimize performance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                  <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-xl">Ensure Security</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Maintain the highest security standards to protect your data and ensure
                  your team's information remains private and secure.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="border-0 shadow-lg text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're a diverse team of engineers, designers, and product managers passionate
              about building tools that make a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "CEO & Co-Founder",
                bio: "Former engineering lead at major tech companies, passionate about building products that teams love.",
                image: "/placeholder-avatar.jpg",
              },
              {
                name: "Sarah Chen",
                role: "CTO & Co-Founder",
                bio: "Full-stack engineer with 10+ years experience building scalable platforms for enterprise teams.",
                image: "/placeholder-avatar.jpg",
              },
              {
                name: "Michael Rodriguez",
                role: "Head of Product",
                bio: "Product leader focused on user experience and driving product-market fit for B2B solutions.",
                image: "/placeholder-avatar.jpg",
              },
            ].map((member) => (
              <Card key={member.name} className="border-0 shadow-lg text-center">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-muted mb-4" />
                  <CardTitle className="text-lg mb-2">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium mb-4">
                    {member.role}
                  </CardDescription>
                  <CardDescription className="text-sm">
                    {member.bio}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to join thousands of successful teams?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your free trial today and experience the difference Dashboard Pro can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
