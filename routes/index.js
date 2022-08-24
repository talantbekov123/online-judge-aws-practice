/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
const express = require('express');
const router = express.Router();
const { generateFile } = require('../helpers/generateFile');

module.exports = (app, db) => {
  router.post('/run', async (req, res) => {
    const {
      language = 'js', code, problemId = null, input
    } = req.body;

    const filepath = await generateFile(language, code, 'someName');
    const fn = require(`../source_codes/${filepath}`);

    const testcases = await db.Testcase.find({ problemId });
    const problem = await db.Problem.find({ _id: problemId });
    if (code === undefined) {
      return res
        .status(400)
        .json({ success: false, error: 'Empty code body!' });
    }
    // need to generate a file with content from the request
    try {
      const testCaseResult = [];
      let countAcceptedTestcases = 0;
      for await (const testcase of testcases) {
        const responce = fn(...testcase.inputArgs);
        testcase.output = responce;

        if (responce === testcase.expectedOutput) {
          countAcceptedTestcases += 1;
          testcase.verdict = 1;
        } else {
          testcase.verdict = 2;
        }

        testCaseResult.push(testcase);
      }

      const verdict = (testcases.length === countAcceptedTestcases) ? 1 : 2;
      await db.Submission.create({
        testCaseResult,
        problemId,
        codeFilepath: filepath,
        verdict
      });

      if (verdict === 1 && problem.verdict !== 1) {
        await db.Problem.findOneAndUpdate({ _id: problemId }, { verdict: 1 });
      } else {
        await db.Problem.findOneAndUpdate({ _id: problemId }, { verdict });
      }
      res.status(200).json({ output: fn(...input), verdict });
    } catch (err) {
      res.status(500).send({ responce: err });
    }
  });

  app.use('/', router);
};
