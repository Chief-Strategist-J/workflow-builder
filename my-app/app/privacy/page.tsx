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
import { ArrowLeft, Shield, Eye } from "lucide-react"

export default function PrivacyPage() {
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
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Privacy Policy
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
                  1. Introduction
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We respect your privacy and are committed to protecting your personal information.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you use our platform.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. Information We Collect
                </h2>
                <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name, email address, phone number</li>
                    <li>Profile information and preferences</li>
                    <li>Account credentials and security information</li>
                    <li>Billing and payment information</li>
                  </ul>

                  <h3 className="text-lg font-semibold">Usage Information:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address and location data</li>
                    <li>Device and browser information</li>
                    <li>Usage patterns and feature interactions</li>
                    <li>Performance and error logs</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Process transactions and manage accounts</li>
                  <li>Send technical notices and support messages</li>
                  <li>Improve our platform and develop new features</li>
                  <li>Generate analytics and performance reports</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Information Sharing
                </h2>
                <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third
                    parties without your consent, except in the following cases:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>With service providers who assist us in operating our platform</li>
                    <li>When required by law or to protect our rights</li>
                    <li>In connection with a business transfer or acquisition</li>
                    <li>With your explicit consent</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Data Security
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We implement appropriate security measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction. These measures
                  include encryption, secure servers, access controls, and regular security audits.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Your Rights and Choices
                </h2>
                <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
                  <p>You have the following rights regarding your personal information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                    <li><strong>Portability:</strong> Receive your data in a structured format</li>
                    <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                    <li><strong>Restriction:</strong> Limit how we process your information</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Cookies and Tracking
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your experience:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Essential cookies for platform functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Preference cookies to remember your settings</li>
                  <li>Marketing cookies for targeted advertisements</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                  You can control cookie settings through your browser preferences or our cookie
                  management tools.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Data Retention
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We retain your personal information only as long as necessary to provide our
                  services and fulfill the purposes outlined in this policy, unless a longer
                  retention period is required by law.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. International Data Transfers
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Your information may be transferred to and processed in countries other than
                  your country of residence. We ensure appropriate safeguards are in place to
                  protect your data during international transfers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10. Children's Privacy
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not
                  knowingly collect personal information from children under 13. If we become
                  aware that we have collected such information, we will take steps to delete it.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11. Third-Party Services
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our platform may contain links to third-party websites or services. We are not
                  responsible for the privacy practices of these third parties. We encourage you
                  to review their privacy policies before providing any personal information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  12. Changes to This Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any
                  material changes by posting the new policy on this page and updating the "Last
                  updated" date. Your continued use of our services after such changes constitutes
                  acceptance of the updated policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  13. Contact Us
                </h2>
                <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
                  <p>
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <ul className="list-none space-y-1">
                    <li>Email: <a href="mailto:privacy@example.com" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">privacy@example.com</a></li>
                    <li>Address: 123 Privacy Street, Data City, DC 12345</li>
                    <li>Phone: +1 (555) 123-4567</li>
                  </ul>
                </div>
              </div>

              <div className="border-t pt-8 mt-8">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  By using our platform, you acknowledge that you have read, understood, and agree
                  to the collection and use of information in accordance with this Privacy Policy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
