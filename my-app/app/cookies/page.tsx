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
  Cookie,
  Settings,
  Eye,
  BarChart3,
  Target,
} from "lucide-react"

const cookieTypes = [
  {
    category: "Essential Cookies",
    icon: Settings,
    description: "Required for the website to function properly",
    examples: [
      "Authentication cookies",
      "Security cookies",
      "Session management",
      "Load balancing cookies"
    ],
    required: true,
  },
  {
    category: "Analytics Cookies",
    icon: BarChart3,
    description: "Help us understand how visitors interact with our website",
    examples: [
      "Google Analytics",
      "Website usage statistics",
      "User behavior tracking",
      "Performance monitoring"
    ],
    required: false,
  },
  {
    category: "Marketing Cookies",
    icon: Target,
    description: "Used to deliver relevant advertisements and track ad performance",
    examples: [
      "Social media pixels",
      "Retargeting cookies",
      "Conversion tracking",
      "Interest-based advertising"
    ],
    required: false,
  },
  {
    category: "Preference Cookies",
    icon: Eye,
    description: "Remember your settings and preferences",
    examples: [
      "Language preferences",
      "Theme settings",
      "Layout preferences",
      "Feature toggles"
    ],
    required: false,
  },
]

const cookieManagement = [
  {
    step: 1,
    title: "Browser Settings",
    description: "Most web browsers allow you to control cookies through their settings. You can usually find these in the 'Privacy' or 'Cookies' section of your browser preferences.",
  },
  {
    step: 2,
    title: "Cookie Consent Tool",
    description: "Use our cookie consent tool to manage your preferences. You can access this at any time through the cookie settings link at the bottom of our website.",
  },
  {
    step: 3,
    title: "Third-Party Tools",
    description: "Use browser extensions or third-party tools that block or manage cookies across websites.",
  },
]

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="text-center space-y-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
              <Cookie className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Cookie Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: October 24, 2024
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mb-8">
          <CardContent className="prose prose-gray dark:prose-invert max-w-none p-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  What Are Cookies?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Cookies are small text files that are stored on your computer or mobile device when you visit a website.
                  They help websites remember information about your visit, such as your preferred language, login status,
                  and other settings. This makes your browsing experience more convenient and personalized.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  How We Use Cookies
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  We use cookies to enhance your experience on our platform, provide essential functionality,
                  analyze website performance, and deliver relevant content. Here's a breakdown of the different
                  types of cookies we use:
                </p>

                <div className="space-y-6">
                  {cookieTypes.map((type) => (
                    <div key={type.category} className="border rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <type.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {type.category}
                            </h3>
                            {type.required && (
                              <span className="px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded">
                                Required
                              </span>
                            )}
                            {!type.required && (
                              <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded">
                                Optional
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {type.description}
                          </p>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <strong>Examples:</strong> {type.examples.join(", ")}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Managing Your Cookie Preferences
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  You have several options for managing cookies on our website:
                </p>

                <div className="space-y-4">
                  {cookieManagement.map((method) => (
                    <div key={method.step} className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {method.step}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {method.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Third-Party Cookies
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We may use third-party services that place cookies on your device. These include:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li><strong>Google Analytics:</strong> To understand website usage and improve our services</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing and login functionality</li>
                  <li><strong>Payment Processors:</strong> For secure payment processing</li>
                  <li><strong>Customer Support:</strong> For live chat and support ticket systems</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                  These third parties have their own privacy policies and cookie practices, which we encourage
                  you to review. We are not responsible for the privacy practices of third parties.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Cookie Retention
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Different types of cookies have different lifespans:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mt-4">
                  <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> Remain on your device for a set period (typically 30 days to 2 years)</li>
                  <li><strong>Essential Cookies:</strong> May be retained for the duration of your account</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Your Consent
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  By using our website, you consent to the use of cookies as described in this policy.
                  You can withdraw your consent at any time by managing your cookie preferences or by
                  contacting us. However, please note that disabling certain cookies may affect the
                  functionality of our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Updates to This Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices
                  or for legal reasons. We will notify you of any material changes by posting the updated
                  policy on our website and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Contact Us
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <ul className="list-none text-gray-600 dark:text-gray-400 space-y-1 mt-4">
                  <li>Email: <a href="mailto:privacy@dashboardpro.com" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">privacy@dashboardpro.com</a></li>
                  <li>Address: 123 Privacy Street, Data City, DC 12345</li>
                  <li>Phone: +1 (555) 123-4567</li>
                </ul>
              </div>

              <div className="border-t pt-8 mt-8">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  This Cookie Policy should be read together with our Privacy Policy and Terms of Service.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookie Settings CTA */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
          <CardContent className="p-8">
            <Cookie className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Manage Your Cookie Preferences
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Take control of your privacy settings and choose which cookies you want to allow.
            </p>
            <Button size="lg" variant="secondary">
              Open Cookie Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
