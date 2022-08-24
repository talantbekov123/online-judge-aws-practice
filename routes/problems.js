const express = require('express');
const router = express.Router();

module.exports = (app, db) => {
  router.post('/', async (req, res) => {
    const instance = {
      title: req.body.title,
      description: req.body.description,
      difficulty: req.body.difficulty
    };

    try {
      await db.Problem.create(instance);
      res.redirect('/admins/problems');
    } catch (err) {
      res.send(err);
    }
  });

  router.delete('/:_id', async (req, res) => {
    try {
      await db.Problem.deleteOne({ _id: req.params._id });
      res.redirect('/admins/problems');
    } catch (err) {
      res.send(err);
    }
  });

  router.get('/', async (req, res) => {
    const problems = await db.Problem.find({});

    res.render('problems', { problems });
  });

  router.get('/:_id', async (req, res) => {
    const problem = await db.Problem.findOne({ _id: req.params._id });
    const testcases = await db.Testcase.find({ problemId: req.params._id });
    const submissions = await db.Submission.find({ problemId: req.params._id });

    res.render('single-problem', { problem, testcases, submissions });
  });

  app.use('/problems', router);
};
