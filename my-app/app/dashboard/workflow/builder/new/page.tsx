"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NewWorkflowPage() {
  const router = useRouter()

  useEffect(() => {
    // Generate a new workflow ID and redirect to the builder
    const newWorkflowId = Date.now().toString()
    router.push(`/dashboard/workflow/builder/${newWorkflowId}`)
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Creating new workflow...</p>
      </div>
    </div>
  )
}
