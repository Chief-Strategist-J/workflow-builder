import { router, publicProcedure } from '../index'
import { workflowRouter } from './workflow'

// Combine all routers
export const appRouter = router({
  workflows: workflowRouter,

  // Health check endpoint
  health: router({
    check: publicProcedure
      .query(() => ({ status: 'ok', timestamp: new Date() }))
  })
})

export type AppRouter = typeof appRouter
