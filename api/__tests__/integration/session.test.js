const request = require('supertest');

const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Session', () => {

	beforeEach(async () => {
		await truncate();
	});

	it('should to authenticate with valid password', async () => {
		const user = await factory.create('User');

		const response = await request(app)
			.post('/sessions')
			.send({
				email: user.email,
				password: user.password
			});

		expect(response.status).toBe(200);

	});


	it('should not to authenticate with no valid password', async () => {
		const user = await factory.create('User');

		const response = await request(app)
			.post('/sessions')
			.send({
				email: user.email,
				password: 'invalidPassword123'
			});

		expect(response.status).toBe(401);

	});

	it('should not to authenticate with unregistered email', async () => {
		const user = await factory.create('User');

		const response = await request(app)
			.post('/sessions')
			.send({
				email: 'invalid_email@email.com',
				password: user.password
			});

		expect(response.status).toBe(401);

	});

	it('should return a JWT token when authenticated', async () => {
		const user = await factory.create('User');

		const response = await request(app)
			.post('/sessions')
			.send({
				email: user.email,
				password: user.password
			});

		expect(response.body).toHaveProperty('token');

	});

	it('should be able to access private routes when authenticated', async () => {
		const user = await factory.create('User');

		let response = await request(app)
			.post('/sessions')
			.send({
				email: user.email,
				password: user.password
			});

		expect(response.status).toBe(200);
		response = {};

		response = await request(app)
			.get('/dashboard')
			.set('Authorization', `Bearer ${user.generateToken()}`);

		expect(response.status).toBe(200);
	});

	it('should not be able to access private routes without JWT token', async () => {
		const response = await request(app)
			.get('/dashboard');

		expect(response.status).toBe(401);
	});

	it('should not be able to access private routes with invalid JWT token', async () => {
		const user = await factory.create('User');

		let response = await request(app)
			.post('/sessions')
			.send({
				email: user.email,
				password: user.password
			});

		expect(response.status).toBe(200);

		response = {};

		response = await request(app)
			.get('/dashboard')
			.set('Authorization', 'Bearer Invalid_JWT_token');

		expect(response.status).toBe(401);
	});

});
