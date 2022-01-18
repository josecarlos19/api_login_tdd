const routes = require('express').Router();
const authMiddleware = require('./app/middlewares/auth');

const AppController = require('../src/app/controllers/AppController');
const UserController = require('../src/app/controllers/UserController');
const SessionController = require('../src/app/controllers/SessionController');
const DashboardController = require('./app/controllers/DashboardController');

routes.get('/', AppController.root);

routes.get('/users', UserController.findAll);
routes.post('/users', UserController.create);

routes.post('/sessions', SessionController.login);

routes.use(authMiddleware);

routes.get('/dashboard', DashboardController.index);


module.exports = routes;
