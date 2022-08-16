const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "../source_outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const execute = async (filepath) => {
  const fileName = path.basename(filepath).split(".")[0];

  return new Promise((resolve, reject) => {
    exec(`node ./source_codes/${filepath} >> ./source_outputs/${fileName}.txt`, (error, stdout, stderr) => {
        console.log(error);
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
    });
  });
};

module.exports = {
  execute,
};
