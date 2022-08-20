/* eslint-disable import/no-dynamic-require */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
const express = require('express');
const router = express.Router();

module.exports = (app) => {
	router.get('/', async (req, res) => {
		res.send('OK');
	});

	app.use('/problems', router);
};
