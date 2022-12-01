const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');



describe('delete tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  

  it('admin can delete a review they posted', async () => {
    const agent = request.agent(app);
    await UserService.create({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin',
      password: 'password',
    });
    await agent.post ('/api/v1/users/sessions').send({
      email: 'admin',
      password: 'password',
    });
    const res = await agent.delete('/api/v1/reviews/1');
    expect(res.status).toBe(204);

    const getRes = await agent.get('/api/v1/reviews/1');
    expect(getRes.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});


