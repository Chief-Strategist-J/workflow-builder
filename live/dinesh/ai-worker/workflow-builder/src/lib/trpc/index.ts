import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { z } from 'zod'

// Define the context type
export interface Context {
  // Add your context here (user, database connection, etc.)
  // user?: User | null
  // db?: DatabaseConnection
}

// Initialize tRPC with transformer, error formatting, and context type
export const trpcServer = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof z.ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

// Export reusable router and procedure helpers
export const router = trpcServer.router
export const publicProcedure = trpcServer.procedure
export const protectedProcedure = trpcServer.procedure

// Middleware for request context (you can add user, database, etc.)
export const createContext = async (): Promise<Context> => {
  return {
    // Add your context here (user, database connection, etc.)
    // user: await getCurrentUser(),
    // db: await getDatabaseConnection(),
  }
}
