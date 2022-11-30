const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('delete tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const mockUser = {
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin',
    password: 'admin',
  };
  
  const registerAndLogin = async (userProps = {}) => {
    const password = userProps.password ?? mockUser.password;
  
    // Create an "agent" that gives us the ability
    // to store cookies between requests in a test
    const agent = request.agent(app);
  
    // Create a user to sign in with
    const user = await UserService.create({ ...mockUser, ...userProps });
  
    // ...then sign in
    const { email } = user;
    await agent.post('/api/v1/users/sessions').send({ email, password });
    return [agent, user];
  };

  it('admin can delete a review they posted', async () => {
    const [agent, user] = await registerAndLogin();
    
    await agent.post ('/api/v1/users/sessions').send({
      email: 'admin',
      password: 'admin',
    });
    const res = await agent.delete('/api/v1/reviews/1');
    expect(res.status).toBe(204);

    const getRes = await agent.get('/api/v1/reviews/1');
    expect(getRes.status).toBe(404);
  });
});
    
