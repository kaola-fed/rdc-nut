const fs = require('fs-extra');
const path = require('path');
const stripJsonComments = require('strip-json-comments');
const log = console.log;

const asyncMockPath = path.resolve(__dirname, 'src', '__mock__', 'async_mock');

const getMockData = (requestPath, method, params) => {
    const mockPath = path.join(asyncMockPath, method, requestPath.replace('/api/', '/'));
    const jsonPath = `${mockPath}.json`;
    const jsPath = `${mockPath}.js`;
    const jsExists = fs.existsSync(jsPath);
    const jsonExists = fs.existsSync(jsonPath);
    const isExists = jsExists || jsonExists;
    if (!isExists) {
        log(`${mockPath}.js{on} doesn't exists.`);
        return {
            code: 200,
            message: `${mockPath}.js{on} doesn't exists.`,
            result: {}
        };
    }

    jsExists ? delete require.cache[require.resolve(jsPath)] : delete require.cache[require.resolve(jsonPath)];
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
    app.all('/api/*', async (req, res) => {
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
