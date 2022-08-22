/* eslint-disable import/no-dynamic-require */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
const express = require('express');
const router = express.Router();

module.exports = (app) => {
  router.get('/problems', async (req, res) => {
    res.render('./admins/problems');
  });

  router.get('/testcases', async (req, res) => {
    res.render('./admins/testcases');
  });

  app.use('/admins', router);
};
