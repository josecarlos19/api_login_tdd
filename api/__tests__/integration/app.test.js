const request = require('supertest');

const app = require('../../src/app');

describe('Application connection', () => {

	it('should reach the root', async () => {
		const response = await request(app).get('/');

		expect(response.status).toBe(200);
	});

});

