const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  username: 'test',
  email: 'test@test.com',
  password: '123456',
};

const agent = request.agent(app);

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

  it('#GET /restaurants/:id should return a restaurant with reviews', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');
    expect(res.body).toMatchInlineSnapshot;
  });

    

  afterAll(() => {
    pool.end();
  });
});
