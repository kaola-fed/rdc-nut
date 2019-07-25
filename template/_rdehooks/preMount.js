// eslint-disable-next-line import/no-unresolved
/* eslint-disable @typescript-eslint/no-var-requires */
const childProcess = require('child_process');
const path = require('path');

module.exports = async () => {
    try {
        const editorConfig = path.resolve(__dirname, '../.editorconfig');
        const dest = path.resolve(__dirname, '../../');

        childProcess.execSync(`cp ${editorConfig} ${dest}`);
    } catch (err) {
        console.error(err);
    }
};
