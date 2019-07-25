/* eslint-disable @typescript-eslint/no-var-requires */
const childProcess = require('child_process');

module.exports = (env) => {
    try {
        const gitVersion = childProcess.execSync('cd ../../../ && git rev-parse --short=7 HEAD', { encoding: 'utf8' }).trim();
        return `${env}-${gitVersion}`;
    } catch (err) {
        console.error(err);
    }
};
