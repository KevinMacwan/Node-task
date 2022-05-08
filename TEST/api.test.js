
const mongoose = require('mongoose');
const axios = require('axios');
const request = require('supertest');
const app = require('../server');
const mongoDbUrl = 'mongodb+srv://admin:admin@devconnector.tais8.mongodb.net/movie?retryWrites=true&w=majority';
const {deleteMovieBytitle} = require('../controllers/movieController')

const PREMIUM_USER = {
  username: 'premium-jim',
  password: 'GBLtTyq3E_UNjFnpo9m6'
};


let token = '';
let titles=[]
describe('api tests for Premiumusers', () => {
    jest.setTimeout(30000);
  beforeAll(async () => {
    try {
      await mongoose.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      const authInfo = await axios.post('http://localhost:3000/auth', PREMIUM_USER);
      token = authInfo.data.token;
    } catch (e) {
      console.log(e);
    }
  });

  beforeEach(async () => {
  });

  afterAll(async () => {
    await deleteMovieBytitle({titles})
    await mongoose.connection.close();
  });

  it('should create and retun movies data authenticated user', async () => {
    const response = await request(app)
      .post('/movies')
      .auth(token, { type: 'bearer' })
      .set({
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }).send({title:'race'});
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