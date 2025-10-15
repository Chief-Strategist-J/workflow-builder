import { trpcServer } from '@/lib/trpc'
import { TRPCError } from '@trpc/server'
import type { Context } from '../trpc'

// Middleware for logging requests
export const loggingMiddleware = trpcServer.middleware(async ({ path, type, next }) => {
  const start = Date.now()

  console.log(`[${new Date().toISOString()}] ${type.toUpperCase()} ${path}`)

  const result = await next()

  const duration = Date.now() - start
  console.log(`[${new Date().toISOString()}] ${type.toUpperCase()} ${path} completed in ${duration}ms`)

  return result
})

// Middleware for error handling
export const errorHandlerMiddleware = trpcServer.middleware(async ({ next }) => {
  try {
    return await next()
  } catch (error) {
    console.error('API Error:', error)

    // Handle known errors
    if (error instanceof TRPCError) {
      throw error
    }

    // Handle validation errors
    if ((error as any)?.name === 'ZodError') {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Validation error',
        cause: error,
      })
    }

    // Handle unexpected errors
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
      cause: error,
    })
  }
})

// Middleware for authentication (placeholder for future implementation)
export const authMiddleware = trpcServer.middleware(async ({
  ctx,
  next
}: {
  ctx: Context,
  next: any
}) => {
  // TODO: Implement proper authentication
  // const user = await getCurrentUser(ctx)
  // if (!user) {
  //   throw new TRPCError({
  //     code: 'UNAUTHORIZED',
  //     message: 'Authentication required',
  //   })
  // }

  return next({
    ctx: {
      // user,
      ...ctx,
    },
  })
})
