import { appRouter } from './src/lib/trpc/routers/index.js';

async function runTest() {
  console.log('🧪 Running tRPC API Test...');

  const caller = appRouter.createCaller({});

  try {
    // Test 1: List workflows (should be empty initially)
    console.log('Testing workflows.list()...');
    const result = await caller.workflows.list();
    console.log('✅ workflows.list() result:', result);
    console.log('✅ workflows.list() test passed!');

    // Test 2: Create a workflow
    console.log('Testing workflows.create()...');
    const workflowData = {
      name: 'Test Workflow',
      description: 'A test workflow for API testing'
    };
    const created = await caller.workflows.create(workflowData);
    console.log('✅ workflows.create() result:', created);
    console.log('✅ workflows.create() test passed!');

    // Test 3: Get the workflow back
    console.log('Testing workflows.get()...');
    const retrieved = await caller.workflows.get({ id: created.id });
    console.log('✅ workflows.get() result:', retrieved);
    console.log('✅ workflows.get() test passed!');

    // Test 4: Update the workflow
    console.log('Testing workflows.update()...');
    const updated = await caller.workflows.update({
      id: created.id,
      name: 'Updated Test Workflow',
      description: 'Updated description'
    });
    console.log('✅ workflows.update() result:', updated);
    console.log('✅ workflows.update() test passed!');

    // Test 5: Health check
    console.log('Testing health.check()...');
    const health = await caller.health.check();
    console.log('✅ health.check() result:', health);
    console.log('✅ health.check() test passed!');

    console.log('🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

runTest();
