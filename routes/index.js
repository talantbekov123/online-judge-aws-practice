/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
const express = require('express');
const router = express.Router();
const { generateFile } = require('../helpers/generateFile');

module.exports = (app, db) => {
  router.post('/run', async (req, res) => {
    const { language = 'js', code, problemId = null } = req.body;
    const testcases = await db.Testcase.find({ problemId });

    console.log(testcases);
    if (code === undefined) {
      return res
        .status(400)
        .json({ success: false, error: 'Empty code body!' });
    }

    // need to generate a file with content from the request
    try {
      const filepath = await generateFile(language, code, 'someName');
      const testCaseResult = [];
      for await (const testcase of testcases) {
        const fn = require(`../source_codes/${filepath}`);
        const responce = fn(...testcase.inputArgs);

        if (responce === testcase.expectedOutput) {
          testcase.verdict = 1;
        } else {
          testcase.verdict = 0;
        }

        testCaseResult.push(testcase);
      }

      await db.Submission.create({
        testCaseResult,
        problemId,
        codeFilepath: filepath
      });
      res.json({ testCaseResult });
    } catch (err) {
      res.status(500).send({ responce: err });
    }
  });

  app.use('/', router);
};
