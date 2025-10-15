import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { appRouter, createContext } from './api'

// Create server
const server = createHTTPServer({
  router: appRouter,
  createContext,
})

// Start server (example for development)
if (process.env.NODE_ENV === 'development') {
  server.listen(3001)
  console.log('🚀 tRPC server running on http://localhost:3001')
}
