/* eslint-disable import/no-dynamic-require */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
const express = require('express');
const router = express.Router();

module.exports = (app, db) => {
  router.get('/problems', async (req, res) => {
    const problems = await db.Problem.find({});
    res.render('./admins/problems', { problems });
  });

  router.get('/testcases', async (req, res) => {
    const testcases = await db.Testcase.find({}).populate('problemId');
    const problems = await db.Problem.find({});

    res.render('./admins/testcases', { testcases, problems });
  });

  app.use('/admins', router);
};
