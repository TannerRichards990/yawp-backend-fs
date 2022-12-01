const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  username: 'test',
  email: 'test@test.com',
  password: '123456',
};


const registerAndLogin = async () => {
  const agent = request.agent(app);
  const user = await UserService.create(mockUser);
  await agent
    .post('/api/v1/users/sessions')
    .send({ email: mockUser.email, password: mockUser.password });
  return [agent, user];
};

describe('backend-express-template-routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('#GET /restaurants should return a list of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
    });
  });

  it.skip('#GET /restaurants/:id should return a restaurant with reviews', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');
    expect(res.body).toMatchInlineSnapshot;
  });

  it.skip('#POST /api/v1/restaurants/1 should post a new review', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent
      .post('/api/v1/restaurants/1/reviews')
      .send({ stars: 5, detail: 'testing if it was good' });
    expect(res.body).toEqual(
      {
        'detail': 'testing if it was good',
        'id': expect.any(String),
        'restaurant_id': '1',
        'stars': 5,
        'user_id': '4',
      }
    );
  });

  afterAll(() => {
    pool.end();
  });
});

