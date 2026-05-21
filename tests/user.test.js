const request = require('supertest')
const { app } = require('../src/app')

describe('user routes', () => {
  it('lists users when authorized', async () => {
    await request(app)
      .post('/auth/register')
      .send({ name: 'User One', email: 'user1@example.com' })

    const response = await request(app)
      .get('/users')
      .set('Authorization', 'Bearer demo-token')

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.users)).toBe(true)
  })
})

