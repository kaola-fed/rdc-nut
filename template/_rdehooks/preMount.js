/* eslint-disable @typescript-eslint/no-var-requires */
const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');

module.exports = () => {
    // 获取 git version
    const gitVersionPath = path.resolve(process.cwd(), 'app', '.gitversion');
    try {
        const gitVersion = childProcess.execSync('git rev-parse --short=7 HEAD', { encoding: 'utf8' }).trim();
        fs.writeFileSync(gitVersionPath, gitVersion, {
            encoding: 'utf-8'
        });
    } catch (err) {
        console.error(err);
    }
};
