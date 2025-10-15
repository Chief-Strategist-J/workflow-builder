import { describe, it, expect, beforeEach } from 'vitest'
import { appRouter } from '../../../lib/trpc/routers'

describe('tRPC API Tests', () => {
  let caller: ReturnType<typeof appRouter.createCaller>

  beforeEach(() => {
    caller = appRouter.createCaller({})
  })

  describe('Workflow Management', () => {
    it('should list workflows (initially empty)', async () => {
      const result = await caller.workflows.list()
      expect(result).toEqual([])
    })

    it('should create a new workflow', async () => {
      const workflowData = {
        name: 'Test Workflow',
        description: 'A test workflow'
      }

      const result = await caller.workflows.create(workflowData)

      expect(result).toMatchObject({
        name: workflowData.name,
        description: workflowData.description,
        nodes: [],
        connections: []
      })
      expect(result.id).toBeDefined()
      expect(result.createdAt).toBeInstanceOf(Date)
      expect(result.updatedAt).toBeInstanceOf(Date)
    })

    it('should get a workflow by ID', async () => {
      // Create a workflow first
      const created = await caller.workflows.create({
        name: 'Test Workflow',
        description: 'Test description'
      })

      // Get it back
      const result = await caller.workflows.get({ id: created.id })

      expect(result).toEqual(created)
    })

    it('should update a workflow', async () => {
      // Create a workflow first
      const created = await caller.workflows.create({
        name: 'Original Name',
        description: 'Original description'
      })

      // Update it
      const updated = await caller.workflows.update({
        id: created.id,
        name: 'Updated Name',
        description: 'Updated description'
      })

      expect(updated.name).toBe('Updated Name')
      expect(updated.description).toBe('Updated description')
      expect(updated.updatedAt.getTime()).toBeGreaterThan(created.updatedAt.getTime())
    })

    it('should delete a workflow', async () => {
      // Create a workflow first
      const created = await caller.workflows.create({
        name: 'To Delete',
        description: 'Will be deleted'
      })

      // Delete it
      const result = await caller.workflows.delete({ id: created.id })
      expect(result).toEqual({ success: true })

      // Verify it's gone
      await expect(caller.workflows.get({ id: created.id })).rejects.toThrow('Workflow not found')
    })

    it('should execute a workflow', async () => {
      // Create a workflow first
      const created = await caller.workflows.create({
        name: 'Executable Workflow'
      })

      // Execute it
      const result = await caller.workflows.execute({ id: created.id })

      expect(result).toMatchObject({
        executionId: expect.any(String),
        status: 'running',
        startedAt: expect.any(Date)
      })
    })

    it('should handle workflow not found errors', async () => {
      const fakeId = 'non-existent-id'

      await expect(caller.workflows.get({ id: fakeId })).rejects.toThrow('Workflow not found')
      await expect(caller.workflows.update({ id: fakeId, name: 'test' })).rejects.toThrow('Workflow not found')
      await expect(caller.workflows.delete({ id: fakeId })).rejects.toThrow('Workflow not found')
      await expect(caller.workflows.execute({ id: fakeId })).rejects.toThrow('Workflow not found')
    })
  })

  describe('Health Check', () => {
    it('should return health status', async () => {
      const result = await caller.health.check()

      expect(result).toEqual({
        status: 'ok',
        timestamp: expect.any(Date)
      })
    })
  })
})
