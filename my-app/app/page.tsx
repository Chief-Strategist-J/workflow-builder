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
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Zap,
} from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Get detailed analytics and insights to track your progress and make data-driven decisions.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work seamlessly with your team members, share projects, and communicate effectively.",
  },
  {
    icon: FileText,
    title: "Project Management",
    description: "Organize, track, and manage all your projects in one centralized dashboard.",
  },
  {
    icon: TrendingUp,
    title: "Performance Tracking",
    description: "Monitor performance metrics and identify areas for improvement and growth.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "Lightning-fast performance with 99.9% uptime guarantee for your peace of mind.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Enterprise-grade security with end-to-end encryption and privacy protection.",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    content: "This platform has transformed how our team collaborates. The analytics feature alone saved us hours of manual reporting.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Team Lead",
    company: "StartupXYZ",
    content: "Incredible user experience and powerful features. It's exactly what we needed to scale our operations.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "CEO",
    company: "GrowthCo",
    content: "The insights we've gained from the analytics have helped us increase our efficiency by 40%. Highly recommended!",
    rating: 5,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BarChart3 className="h-4 w-4" />
            </div>
            <span className="font-bold text-xl">Dashboard Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Manage Your Projects with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The all-in-one platform for project management, team collaboration, and data-driven insights.
              Streamline your workflow and boost productivity today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>

          <div className="pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Trusted by 10,000+ teams worldwide
            </p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="text-2xl font-bold">TechCorp</div>
              <div className="text-2xl font-bold">StartupXYZ</div>
              <div className="text-2xl font-bold">GrowthCo</div>
              <div className="text-2xl font-bold">InnovateLabs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful features designed to help teams collaborate, track progress, and achieve their goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What our customers say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join thousands of satisfied teams who trust our platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base italic">
                  "{testimonial.content}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join thousands of teams already using our platform to streamline their projects and boost productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400 pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <span className="font-bold text-xl">Dashboard Pro</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                The all-in-one platform for modern teams and businesses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><Link href="/dashboard" className="hover:text-gray-900 dark:hover:text-white">Dashboard</Link></li>
                <li><Link href="/dashboard/projects" className="hover:text-gray-900 dark:hover:text-white">Projects</Link></li>
                <li><Link href="/dashboard/analytics" className="hover:text-gray-900 dark:hover:text-white">Analytics</Link></li>
                <li><Link href="/dashboard/team" className="hover:text-gray-900 dark:hover:text-white">Team</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><Link href="/about" className="hover:text-gray-900 dark:hover:text-white">About</Link></li>
                <li><Link href="/blog" className="hover:text-gray-900 dark:hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-gray-900 dark:hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900 dark:hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-gray-900 dark:hover:text-white">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-gray-900 dark:hover:text-white">Security</Link></li>
                <li><Link href="/cookies" className="hover:text-gray-900 dark:hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 Dashboard Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
