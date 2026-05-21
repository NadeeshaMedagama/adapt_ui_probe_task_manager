const request = require('supertest')
const { app } = require('../src/app')

describe('auth routes', () => {
  it('registers a user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Jane Doe', email: 'jane@example.com' })

    expect(response.status).toBe(201)
    expect(response.body.user.email).toBe('jane@example.com')
  })

  it('logs in a user', async () => {
    await request(app)
      .post('/auth/register')
      .send({ name: 'John Doe', email: 'john@example.com' })

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'john@example.com' })

    expect(response.status).toBe(200)
    expect(response.body.token).toBe('demo-token')
  })
})

