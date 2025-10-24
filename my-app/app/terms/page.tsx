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
import { ArrowLeft, FileText, Scale } from "lucide-react"

export default function TermsPage() {
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
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: October 24, 2024
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="prose prose-gray dark:prose-invert max-w-none p-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  By accessing and using this platform, you accept and agree to be bound by the terms
                  and provision of this agreement. If you do not agree to abide by the above,
                  please do not use this service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. Description of Service
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Our platform provides project management, team collaboration, and analytics tools
                  to help businesses and teams work more effectively together.
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Project planning and tracking</li>
                  <li>Team collaboration features</li>
                  <li>Analytics and reporting</li>
                  <li>User management and permissions</li>
                  <li>API access for integrations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. User Accounts
                </h2>
                <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
                  <p>
                    To use our services, you must create an account. You are responsible for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Providing accurate and complete information</li>
                    <li>Maintaining the confidentiality of your password</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized use</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Acceptable Use
                </h2>
                <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
                  <p>You agree not to use the service to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Transmit harmful or malicious content</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt the service</li>
                    <li>Share account credentials with others</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Data and Privacy
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We are committed to protecting your privacy and data. Our collection and use of
                  personal information is governed by our Privacy Policy. You retain ownership of
                  your data, and we will never sell or share your personal information without
                  your consent, except as required by law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Intellectual Property
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  The service and its original content, features, and functionality are and will
                  remain the exclusive property of our company and its licensors. The service is
                  protected by copyright, trademark, and other laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Termination
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We may terminate or suspend your account and bar access to the service immediately,
                  without prior notice or liability, under our sole discretion, for any reason
                  whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Limitation of Liability
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  In no event shall our company, nor its directors, employees, partners, agents,
                  suppliers, or affiliates, be liable for any indirect, incidental, special,
                  consequential, or punitive damages, including without limitation, loss of profits,
                  data, use, goodwill, or other intangible losses.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. Changes to Terms
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms
                  at any time. If a revision is material, we will try to provide at least 30 days
                  notice prior to any new terms taking effect.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10. Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at{" "}
                  <a
                    href="mailto:legal@example.com"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    legal@example.com
                  </a>
                </p>
              </div>

              <div className="border-t pt-8 mt-8">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  By using our service, you acknowledge that you have read, understood, and agree
                  to be bound by these Terms of Service.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
