/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');
const stripJsonComments = require('strip-json-comments');

// eslint-disable-next-line no-console
const log = console.log;

const mockConfig = require('./mock.config');

const { asyncMockPath, proxyRegExp } = mockConfig;

const getMockData = (requestPath, method, params) => {
    const mockPath = path.join(asyncMockPath, method, requestPath);
    const jsonPath = `${mockPath}.json`;
    const jsPath = `${mockPath}.js`;
    const jsExists = fs.existsSync(jsPath);
    const jsonExists = fs.existsSync(jsonPath);
    const isExists = jsExists || jsonExists;
    if (!isExists) {
        log(`${mockPath}.js{on} doesn't exists.`);
        // 路径转换
        const trueMockPath = jsonPath.replace('/.integrate/src', '/app');
        fs.ensureFileSync(trueMockPath);
        const emptyData = {
            code: 200,
            message: null,
            result: {}
        };
        fs.writeJsonSync(trueMockPath, emptyData);
        return emptyData;
    }

    jsExists ? delete require.cache[require.resolve(jsPath)] : delete require.cache[require.resolve(jsonPath)];
    // eslint-disable-next-line import/no-dynamic-require
    return jsExists ? require(jsPath)(params) : require(jsonPath);
};

const parsePostData = req => new Promise((resolve, reject) => {
    try {
        let postData = '';
        req.addListener('data', (data) => {
            postData = postData + data;
        });
        req.addListener('end', () => {
            try {
                resolve(JSON.parse(postData || '{}'));
            } catch (err) {
                resolve(postData);
            }
        });
    } catch (err) {
        reject(err);
    }
});

module.exports = function mock(app) {
    app.all(proxyRegExp, async (req, res) => {
        const requestPath = req.path;
        const method = req.method.toLowerCase();
        let params = req.query;
        if (method === 'post') {
            params = await parsePostData(req);
        }
        const data = getMockData(requestPath, method, params);
        if (data) {
            res.status(200).json(typeof data === 'string' ? JSON.parse(stripJsonComments(data)) : data);
        } else {
            log('The json file seems empty.');
            res.status(404).json({
                code: 404,
                msg: '接口数据未定义'
            });
        }
    });
}
