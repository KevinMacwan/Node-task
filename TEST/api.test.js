
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');
const mongoDbUrl = 'mongodb+srv://admin:admin@devconnector.tais8.mongodb.net/movie?retryWrites=true&w=majority';
const { deleteMovieBytitle } = require('../controllers/movieController')


let token = '';
let titles = []
jest.mock('../middleware/auth', () => jest.fn((req, res, next) => {
  req.user = {
    "userId": 123,
    "name": "Basic Thomas",
    "role": "basic",
    "iat": 1606221838,
    "exp": 1606223638,
    "iss": "https://www.netguru.com/",
    "sub": "123"

  }
  next()
}));
describe('api tests for Premiumusers', () => {
  jest.setTimeout(30000);
  beforeAll(async () => {
    try {
      await mongoose.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    } catch (e) {
      console.log(e);
    }
  });

  beforeEach(async () => {
  });

  afterAll(async () => {
    await deleteMovieBytitle({ titles })
    await mongoose.connection.close();
  });

  it('should create and retun movies data authenticated user', async () => {
    const response = await request(app)
      .post('/movies')
      .auth(token, { type: 'bearer' })
      .set({
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }).send({ title: 'race' });
    titles.push('Race')

    expect(response.status).toBe(200);
  });

  it('should get movie for an authenticated user', async () => {
    const response = await request(app)
      .get('/movies')
      .auth(token, { type: 'bearer' })
      .set({
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    expect(response.body.movieData.length).toBeGreaterThan(0);
    expect(response.status).toBe(200);
  });
});