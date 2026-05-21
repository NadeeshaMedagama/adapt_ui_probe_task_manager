const request = require('supertest')
const { app } = require('../src/app')

describe('task routes', () => {
  it('creates a task when authorized', async () => {
    const response = await request(app)
      .post('/tasks')
      .set('Authorization', 'Bearer demo-token')
      .send({ title: 'First task' })

    expect(response.status).toBe(201)
    expect(response.body.task.title).toBe('First task')
  })
})

