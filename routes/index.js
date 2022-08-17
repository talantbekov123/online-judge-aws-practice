/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
const express = require('express');
const router = express.Router();
const { generateFile } = require('../helpers/generateFile');
const { execute } = require('../helpers/execute');

module.exports = (app) => {
	router.get('/problems', async (req, res) => {
		res.render('problems');
	});

	router.get('/problems/:dasdsa', async (req, res) => {
		res.render('single-problem');
	});

	router.post('/run', async (req, res) => {
		const { language = 'js', code } = req.body;

		if (code === undefined) {
			return res
				.status(400)
				.json({ success: false, error: 'Empty code body!' });
		}
		// need to generate a file with content from the request
		const filepath = await generateFile(language, code);
		try {
			const output = await execute(filepath);
			res.status(201).json({ message: output });
		} catch (err) {
			res.status(201).json({ message: err.stderr });
		}
	});

	app.use('/', router);
};
