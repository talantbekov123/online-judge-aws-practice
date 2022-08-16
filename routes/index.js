/* eslint-disable prefer-destructuring */
const express = require("express");
const router = express.Router();
const { generateFile } = require("../helpers/generateFile");
const { execute } = require("../helpers/execute");

module.exports = (app) => {
  router.get("/problems", async (req, res) => {
    res.render("problems");
  });

  router.get("/problems/:dasdsa", async (req, res) => {
    res.render("single-problem");
  });

  router.post("/run", async (req, res) => {
    const { language = "js", code } = req.body;

    console.log(language, "Length:", code.length);

    if (code === undefined) {
      return res
        .status(400)
        .json({ success: false, error: "Empty code body!" });
    }
    // need to generate a file with content from the request
    const filepath = await generateFile(language, code);
    const output = await execute(filepath);
    console.log('=====================')
    console.log(output);
    console.log('=====================')

    res.status(201).json("OK");
  });

  app.use("/", router);
};
