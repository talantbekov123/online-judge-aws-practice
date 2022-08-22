const express = require('express');
const router = express.Router();

module.exports = (app, db) => {
  router.get('/:_id', async (req, res) => {
    const submission = await db.Submission.findOne({ _id: req.params._id }).populate('problemId');
    res.render('single-submission', { submission });
  });

  app.use('/submissions', router);
};
