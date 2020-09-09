const { Router } = require('express');
const bodyParser =require('body-parser');
const menu =require('../menu');

const routes = app => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	const router = Router();
	app.post('/', (req, res) => {
		menu(req).run(req.body, ussdResult => {
			res.send(ussdResult);
		});
	});

	return router;
};

module.exports = routes;
