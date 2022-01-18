const { User } = require('../models');

class SessionController {

	async login(req, res) {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(401).json({ message: 'unregistered email' });
		}

		if (!(await user.checkPassword(password))) {
			return res.status(401).json({ message: 'Incorrect Password' });
		}

		return res.status(200).json({
			user,
			token: user.generateToken()
		});

	}
}

module.exports = new SessionController();
