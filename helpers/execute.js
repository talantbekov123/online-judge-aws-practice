/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-unused-expressions */
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '../source_outputs');

if (!fs.existsSync(outputPath)) {
	fs.mkdirSync(outputPath, { recursive: true });
}

const execute = async (filepath) => {
	const fileName = path.basename(filepath).split('.')[0];

	return new Promise((resolve, reject) => {
		exec(
			`node ./source_codes/${filepath} >> ./source_outputs/${fileName}.txt`,
			async (error, stdout, stderr) => {
				error && reject({ error, stderr });
				stderr && reject(stderr);
				await fs.readFile(
					`./source_outputs/${fileName}.txt`,
					'utf8',
					(err, data) => {
						const output = data.split('\n');
						// trim output
						output.pop();
						const lastLine = output.pop();
						resolve(lastLine);
					}
				);
			}
		);
	});
};

module.exports = {
	execute
};
