/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');
const stripJsonComments = require('strip-json-comments');
const variables = require('../../../.cache/rdc.variables.js');


// eslint-disable-next-line no-console
const log = console.log;
const { join, resolve } = path;

const asyncMockPath = resolve(__dirname, '../../src', '__mock__');

const getMockData = (requestPath, method, params) => {
    const mockPath = join(asyncMockPath, method, requestPath);
    const jsonPath = `${mockPath}.json`;
    const jsPath = `${mockPath}.js`;
    const jsExists = fs.existsSync(jsPath);
    const jsonExists = fs.existsSync(jsonPath);

    if (
        !jsExists && !jsonExists
    ) {
        log(`${mockPath}.js{on} doesn't exists.`);

        // 如果文件不存在， 添加默认文件到app/__mock__下
        const appMockPath = jsonPath.replace('/.integrate/src', '/app');
        fs.ensureFileSync(appMockPath);

        const json = {
            code: 200,
            message: null,
            result: {}
        };

        fs.writeJsonSync(appMockPath, json);
        return json;
    }

    jsExists ?
        delete require.cache[require.resolve(jsPath)] :
        delete require.cache[require.resolve(jsonPath)];

    // eslint-disable-next-line import/no-dynamic-require
    return jsExists ? require(jsPath)(params) : require(jsonPath);
};

const parsePostParams = req => new Promise((resolve, reject) => {
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

const mockRequestHandler = async (req, res) => {
    const requestPath = req.path;
    const method = req.method.toLowerCase();
    let params = req.query;

    if (method === 'post') {
        params = await parsePostParams(req);
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
};

if (variables.proxy) {
    const rules = variables.proxy.rules || [];
    let prefixes = [];

    rules.forEach(rule => {
        const { prefix = '' } = rule;
        prefixes = prefixes.concat(prefix);
    });

    // const regexp = new RegExp(`^(${prefixes.join('|')})`);

    module.exports = function mock(app) {
        app.all(prefixes, mockRequestHandler);
    };
}

