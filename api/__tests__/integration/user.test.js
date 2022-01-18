const request = require('supertest');

const factory = require('../factories');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const faker = require('faker');

describe('Users', () => {
	beforeEach(async () => {
		await truncate();
	});

	it('should list all users', async () => {
		await factory.create('User');

		const response = await request(app).get('/users');

		expect(response.status).toBe(200);
		expect(response.body.length).toBeGreaterThan(0);
	});

	it('should create a new user sending all data', async () => {
		let name = faker.name.findName();
		let email = faker.internet.email();
		let password = faker.internet.password();

		const response = await request(app).post('/users').send({
			name: name,
			email: email,
			password: password
		});

		expect(response.status).toBe(201);
		expect(response.body.name).not.toBe(null);
		expect(response.body.name).toBe(name);
		expect(response.body.email).toBe(email);
	});

	it('should not create a new user not sending name data', async () => {
		const response = await request(app).post('/users').send({
			name: '',
			email: faker.internet.email(),
			password: faker.internet.password()
		});

		expect(response.status).toBe(401);
	});

	it('should not create a new user not sending email data', async () => {
		const response = await request(app).post('/users').send({
			name: faker.name.findName(),
			email: '',
			password: faker.internet.password()
		});

		expect(response.status).toBe(401);
	});

	it('should not create a new user not sending password data', async () => {
		const response = await request(app).post('/users').send({
			name: faker.name.findName(),
			email: faker.internet.email(),
			password: ''
		});

		expect(response.status).toBe(401);
	});

	it('should not create a new user with a email already exists on database', async () => {
		const user = await factory.create('User');

		const response = await request(app).post('/users').send({
			name: user.name,
			email: user.email,
			password: user.password
		});

		expect(response.status).toBe(401);
	});

});
