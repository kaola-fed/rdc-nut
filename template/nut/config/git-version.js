/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

module.exports = (env) => {
    const gitVersionPath = path.resolve(__dirname, '../../../', 'app', '.gitversion');

    let gitVersion = '';
    try {
        if (fs.existsSync(gitVersionPath)) {
            gitVersion = fs.readFileSync(gitVersionPath, {
                encoding: 'utf-8'
            });

            fs.unlinkSync(gitVersionPath);

            return `${env}-${gitVersion}`;
        }

        return '';
    } catch (err) {
        console.error(err);
    }
};
