import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { redirect } from "next/navigation"

export default function Home() {
  // For now, redirect to signin page
  // In a real app, you'd check authentication state here
  redirect("/signin")

  // This won't be reached due to redirect, but keeping for reference
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>
            Choose how you'd like to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/signup">Create Account</Link>
          </Button>
          <Button variant="ghost" asChild className="w-full">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
