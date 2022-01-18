const { User } = require('../models');
class UserController {

	async findAll(req, res) {
		const users = await User.findAll();

		return res.status(200).json(users);
	}

	async create(req, res) {
		const { name, email, password } = req.body;

		if (!password) {
			return res.status(401).json({ message: 'Missing password to create User' });
		}

		if (!name) {
			return res.status(401).json({ message: 'Missing name to create User' });
		}

		if (!email) {
			return res.status(401).json({ message: 'Missing email to create User' });
		}

		let user = await User.findOne({ where: { email: email } });

		if (user) {
			return res.status(401).json({ message: 'User already exists' });
		}

		user = await User.create({
			name,
			email,
			password
		});

		return res.status(201).json(user);
	}
}

module.exports = new UserController();
