import { z } from 'zod'

// Base schemas for common types
export const uuidSchema = z.string().uuid()
export const timestampSchema = z.date()

// Workflow schemas
export const workflowConfigSchema = z.record(z.string(), z.any()) // Flexible config object
export const workflowNodeTypeSchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string(),
  color: z.string(),
  description: z.string().optional(),
})

export const workflowNodeSchema = z.object({
  id: uuidSchema,
  x: z.number(),
  y: z.number(),
  type: workflowNodeTypeSchema,
  selected: z.boolean().default(false),
  config: workflowConfigSchema.default({}),
})

export const workflowConnectionSchema = z.object({
  id: uuidSchema,
  from: uuidSchema,
  to: uuidSchema,
  fromX: z.number(),
  fromY: z.number(),
  toX: z.number(),
  toY: z.number(),
})

export const workflowSchema = z.object({
  id: uuidSchema,
  name: z.string().min(1, 'Workflow name is required'),
  description: z.string().optional(),
  nodes: z.array(workflowNodeSchema),
  connections: z.array(workflowConnectionSchema),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
})

// API input/output schemas
export const createWorkflowInputSchema = z.object({
  name: z.string().min(1, 'Workflow name is required'),
  description: z.string().optional(),
})

export const updateWorkflowInputSchema = z.object({
  id: uuidSchema,
  name: z.string().min(1).optional(),
  description: z.string().optional(),
})

export const deleteWorkflowInputSchema = z.object({
  id: uuidSchema,
})

export const executeWorkflowInputSchema = z.object({
  id: uuidSchema,
})

export const getWorkflowsOutputSchema = z.array(workflowSchema)
export const getWorkflowOutputSchema = workflowSchema

// Error schemas for consistent error responses
export const errorResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.any().optional(),
})

// Export types for use in API procedures
export type Workflow = z.infer<typeof workflowSchema>
export type WorkflowNode = z.infer<typeof workflowNodeSchema>
export type WorkflowConnection = z.infer<typeof workflowConnectionSchema>
export type CreateWorkflowInput = z.infer<typeof createWorkflowInputSchema>
export type UpdateWorkflowInput = z.infer<typeof updateWorkflowInputSchema>
export type DeleteWorkflowInput = z.infer<typeof deleteWorkflowInputSchema>
export type ExecuteWorkflowInput = z.infer<typeof executeWorkflowInputSchema>
