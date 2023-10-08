const request = require('supertest');
const app = require('../../src/app'); // Import your Express app

describe('Test 404 Handler', () => {
  it('should return a 404 status', async () => {
    const response = await request(app).get('/not-found');

    expect(response.status).toBe(404);
  });

  it('should return a "Not Found" message', async () => {
    const response = await request(app).get('/not-found');

    expect(response.text).toBe('{\"status\":\"error\",\"error\":{\"message\":\"not found\",\"code\":404}}');
  });
});
