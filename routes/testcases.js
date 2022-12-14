const express = require('express');
const router = express.Router();

module.exports = (app, db) => {
  router.post('/', async (req, res) => {
    let { inputArgs } = req.body;
    inputArgs = inputArgs.slice(1, -1);
    inputArgs = inputArgs.split(',');
    inputArgs = inputArgs.map((elem) => elem.trim());

    const instance = {
      inputArgs,
      expectedOutput: req.body.expectedOutput,
      problemId: req.body.problemId
    };

    try {
      await db.Testcase.create(instance);
      res.redirect('/admins/testcases');
    } catch (err) {
      res.send(err);
    }
  });

  router.delete('/:_id', async (req, res) => {
    try {
      await db.Testcase.deleteOne({ _id: req.params._id });
      res.redirect('/admins/testcases');
    } catch (err) {
      res.send(err);
    }
  });

  app.use('/testcases', router);
};
