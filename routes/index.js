/* eslint-disable import/no-dynamic-require */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
const express = require('express');
const router = express.Router();
const { generateFile } = require('../helpers/generateFile');

module.exports = (app) => {
	router.get('/problems', async (req, res) => {
		res.render('problems');
	});

	router.get('/problems/:dasdsa', async (req, res) => {
		res.render('single-problem');
	});

	router.post('/run', async (req, res) => {
		console.log('xxxxx');
		console.log(req.body);
		const { language = 'js', code } = req.body;
		console.log(code);

		if (code === undefined) {
			return res
				.status(400)
				.json({ success: false, error: 'Empty code body!' });
		}
		// need to generate a file with content from the request
		try {
			const filepath = await generateFile(language, code, 'someName');
			const fn = require(`../source_codes/${filepath}`);
			res.status(200).send(fn());
		} catch (err) {
			console.log(err);
			res.status(201).json({ message: err.stderr });
		}
	});

	app.use('/', router);
};
