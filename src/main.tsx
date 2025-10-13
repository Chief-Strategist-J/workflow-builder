import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles/global.css'

console.log('🚀 Starting React Flow application...')

const rootElement = document.getElementById('root')
console.log('Root element found:', !!rootElement)

if (!rootElement) {
  throw new Error('Root element not found')
}

console.log('Creating React root...')
const root = createRoot(rootElement)

console.log('Rendering React app...')
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

console.log('✅ React app rendered successfully!')