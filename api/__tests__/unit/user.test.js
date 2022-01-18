const bcrypt = require('bcryptjs');

const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('User', () => {
	beforeEach(async () => {
		await truncate();
	});


	it('should encrypt the user password', async() =>{
		const user = await User.create({
			name: 'Carlos',
			email: 'carlos@email.com',
			password: '123132'
		});

		expect(await bcrypt.compare(user.password, user.password_hash)).toBe(true);
	});
});
