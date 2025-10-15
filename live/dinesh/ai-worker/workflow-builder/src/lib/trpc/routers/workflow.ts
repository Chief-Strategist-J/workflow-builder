import { router, protectedProcedure, publicProcedure } from '../index'
import {
  createWorkflowInputSchema,
  updateWorkflowInputSchema,
  deleteWorkflowInputSchema,
  executeWorkflowInputSchema,
  getWorkflowsOutputSchema,
  getWorkflowOutputSchema,
  type CreateWorkflowInput,
  type UpdateWorkflowInput,
  type DeleteWorkflowInput,
  type ExecuteWorkflowInput,
} from '../../validation/schemas'
import { z } from 'zod'

// In-memory storage (replace with database in production)
const workflows = new Map<string, any>()

// Workflow procedures
export const workflowRouter = router({
  // Get all workflows
  list: publicProcedure
    .output(getWorkflowsOutputSchema)
    .query(() => {
      return Array.from(workflows.values())
    }),

  // Get single workflow
  get: publicProcedure
    .input(deleteWorkflowInputSchema)
    .output(getWorkflowOutputSchema)
    .query(({ input }: { input: DeleteWorkflowInput }) => {
      const workflow = workflows.get(input.id)
      if (!workflow) {
        throw new Error('Workflow not found')
      }
      return workflow
    }),

  // Create workflow
  create: protectedProcedure
    .input(createWorkflowInputSchema)
    .output(getWorkflowOutputSchema)
    .mutation(({ input }: { input: CreateWorkflowInput }) => {
      const workflow = {
        id: crypto.randomUUID(),
        ...input,
        nodes: [],
        connections: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      workflows.set(workflow.id, workflow)
      return workflow
    }),

  // Update workflow
  update: protectedProcedure
    .input(updateWorkflowInputSchema)
    .output(getWorkflowOutputSchema)
    .mutation(({ input }: { input: UpdateWorkflowInput }) => {
      const workflow = workflows.get(input.id)
      if (!workflow) {
        throw new Error('Workflow not found')
      }

      const updatedWorkflow = {
        ...workflow,
        ...input,
        updatedAt: new Date(),
      }
      workflows.set(input.id, updatedWorkflow)
      return updatedWorkflow
    }),

  // Delete workflow
  delete: protectedProcedure
    .input(deleteWorkflowInputSchema)
    .output(deleteWorkflowInputSchema)
    .mutation(({ input }: { input: DeleteWorkflowInput }) => {
      if (!workflows.has(input.id)) {
        throw new Error('Workflow not found')
      }
      workflows.delete(input.id)
      return input
    }),

  // Execute workflow
  execute: protectedProcedure
    .input(executeWorkflowInputSchema)
    .output(z.object({
      executionId: z.string(),
      status: z.string(),
      startedAt: z.date(),
    }))
    .mutation(({ input }: { input: ExecuteWorkflowInput }) => {
      const workflow = workflows.get(input.id)
      if (!workflow) {
        throw new Error('Workflow not found')
      }

      // Simulate workflow execution
      return {
        executionId: crypto.randomUUID(),
        status: 'running',
        startedAt: new Date(),
      }
    }),
})
