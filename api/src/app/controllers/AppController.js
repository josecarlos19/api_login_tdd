class AppController {
	async root(req, res){
		res.status(200).send();
	}
}

module.exports = new AppController();
