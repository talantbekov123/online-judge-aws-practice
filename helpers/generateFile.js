const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, '../source_codes');

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content, functionName) => {
  const contentWithExportKeyword = `${content} const fn = ${functionName};module.exports = fn`;
  const jobId = uuid();
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCodes, filename);
  await fs.writeFileSync(filepath, contentWithExportKeyword);
  return filename;
};

module.exports = {
  generateFile
};
