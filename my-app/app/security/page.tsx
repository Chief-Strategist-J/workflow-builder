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
  Shield,
  Lock,
  Eye,
  Server,
  Database,
  Key,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data is encrypted in transit and at rest using industry-standard AES-256 encryption.",
  },
  {
    icon: Key,
    title: "Multi-Factor Authentication",
    description: "Add an extra layer of security to your account with 2FA and biometric authentication.",
  },
  {
    icon: Eye,
    title: "Privacy by Design",
    description: "We collect only the data necessary to provide our services and give you full control over it.",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "Our platform runs on SOC 2 compliant infrastructure with 99.9% uptime guarantee.",
  },
  {
    icon: Database,
    title: "Data Residency",
    description: "Choose where your data is stored with our global data center network.",
  },
  {
    icon: Shield,
    title: "Compliance Ready",
    description: "GDPR, CCPA, HIPAA compliant with enterprise-grade security controls.",
  },
]

const complianceStandards = [
  {
    name: "SOC 2 Type II",
    description: "Service Organization Control 2 certification for security and availability.",
    status: "Certified",
  },
  {
    name: "ISO 27001",
    description: "International standard for information security management systems.",
    status: "Certified",
  },
  {
    name: "GDPR",
    description: "General Data Protection Regulation compliance for EU data subjects.",
    status: "Compliant",
  },
  {
    name: "CCPA",
    description: "California Consumer Privacy Act compliance for California residents.",
    status: "Compliant",
  },
  {
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act compliance.",
    status: "Ready",
  },
]

const securityMeasures = [
  "Regular security audits and penetration testing",
  "24/7 security monitoring and incident response",
  "Employee security training and background checks",
  "Secure development lifecycle (SDLC) practices",
  "Vulnerability management and patch management",
  "Network segmentation and access controls",
  "Data backup and disaster recovery",
  "Third-party security assessments",
]

export default function SecurityPage() {
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
              <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Security & Trust
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Your data security is our top priority. We implement industry-leading security measures
              to protect your information and ensure your peace of mind.
            </p>
          </div>
        </div>

        {/* Security Score */}
        <div className="mb-16">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <div className="text-6xl font-bold mb-2">A+</div>
                <div className="text-lg opacity-90">Security Rating</div>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div>
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-sm opacity-90">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-90">Monitoring</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">&lt;1hr</div>
                  <div className="text-sm opacity-90">Response Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Security Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive security measures designed to protect your data and ensure business continuity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Compliance & Certifications
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We maintain the highest industry standards and comply with global data protection regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceStandards.map((standard) => (
              <Card key={standard.name} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {standard.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {standard.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {standard.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Practices */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Security Practices
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our comprehensive approach to security includes multiple layers of protection and best practices.
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Infrastructure Security
                  </h3>
                  <ul className="space-y-3">
                    {securityMeasures.map((measure, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{measure}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Security Incident Response
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">1</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Detection</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">24/7 monitoring identifies threats</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">2</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Assessment</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Security team evaluates impact</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">3</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Response</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Immediate action to contain threats</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">4</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Recovery</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Systems restored and lessons learned</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vulnerability Disclosure */}
        <div className="mb-16">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Responsible Disclosure</CardTitle>
              <CardDescription>
                We value the security research community and encourage responsible disclosure of vulnerabilities.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">30 Days</div>
                  <div className="text-gray-600 dark:text-gray-400">Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">$5,000</div>
                  <div className="text-gray-600 dark:text-gray-400">Max Bounty</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-gray-600 dark:text-gray-400">Support</div>
                </div>
              </div>
              <Button size="lg">
                Report a Vulnerability
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Security */}
        <div className="text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <CardContent className="p-8">
              <AlertTriangle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                Questions About Security?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Our security team is here to help. Contact us for detailed security documentation or compliance questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Contact Security Team
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                  Download Security Whitepaper
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
