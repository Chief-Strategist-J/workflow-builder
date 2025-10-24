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
  MapPin,
  Clock,
  Users,
  Heart,
  Target,
  Award,
  Briefcase,
} from "lucide-react"

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, mental health support, and wellness programs.",
  },
  {
    icon: Target,
    title: "Professional Growth",
    description: "Learning budget, conference attendance, and career development opportunities.",
  },
  {
    icon: Award,
    title: "Competitive Compensation",
    description: "Market-leading salaries, equity packages, and performance bonuses.",
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    description: "Flexible hours, unlimited PTO, and remote-first culture.",
  },
]

const openPositions = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build beautiful, responsive user interfaces using React and TypeScript.",
    requirements: ["5+ years React experience", "TypeScript expertise", "UI/UX design skills", "Remote work experience"],
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Drive product strategy and work closely with engineering and design teams.",
    requirements: ["3+ years PM experience", "B2B SaaS background", "Data-driven mindset", "Leadership experience"],
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Create intuitive and delightful user experiences for our platform.",
    requirements: ["4+ years UX design", "Figma expertise", "User research skills", "Portfolio required"],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build and maintain scalable infrastructure and deployment pipelines.",
    requirements: ["3+ years DevOps experience", "AWS/GCP expertise", "Kubernetes knowledge", "CI/CD experience"],
  },
  {
    id: 5,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "New York, NY",
    type: "Full-time",
    description: "Help our customers achieve success and drive product adoption.",
    requirements: ["2+ years CSM experience", "SaaS background", "Customer-focused mindset", "Communication skills"],
  },
]

const values = [
  "Innovation - We encourage creative thinking and bold ideas",
  "Collaboration - We work together as one team towards common goals",
  "Transparency - We communicate openly and honestly",
  "Excellence - We maintain high standards in everything we do",
  "Impact - We focus on work that makes a meaningful difference",
]

export default function CareersPage() {
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
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <Briefcase className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're building the future of team collaboration and project management.
              Help us empower teams worldwide to achieve extraordinary results.
            </p>
          </div>
        </div>

        {/* Hero Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Team Members</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">15</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Remote First</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Glassdoor Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We offer competitive benefits and a culture that supports your professional growth and personal well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-0 shadow-lg text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Culture Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Culture
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We believe in creating an environment where everyone can do their best work and grow professionally.
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    What We Value
                  </h3>
                  <ul className="space-y-4">
                    {values.map((value) => (
                      <li key={value} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
                  <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Remote-First Culture
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    We embrace remote work and asynchronous communication. Our team spans multiple time zones,
                    and we design our processes to support flexible work arrangements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join our growing team and help us build the future of team collaboration.
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position) => (
              <Card key={position.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {position.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {position.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="secondary">{position.department}</Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {position.location}
                            </Badge>
                            <Badge variant="outline">{position.type}</Badge>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              Requirements:
                            </h4>
                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              {position.requirements.map((req, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="h-1 w-1 rounded-full bg-gray-400" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <Button size="lg">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Don't see a role that fits?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                We're always looking for talented people to join our team. Send us your resume and let us know how you'd like to contribute.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Send Us Your Resume
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  View All Openings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
