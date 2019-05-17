const jsonPath = './selectList.json';
delete require.cache[require.resolve(jsonPath)];
const existKeysJson = require(jsonPath);

const existKeys = existKeysJson.result || {};

const generateRandom = function(len = 5) {
    const source = [];
    while(len > 0) {
        const randomId = `${Math.random()}`.slice(-5);
        source.push({
            id: `${randomId}`,
            name: `下拉选项_${randomId}`
        });
        len--;
    }
    return source;
};

module.exports = function(params) {
    const { keys } = params;
    const keyList = keys.split(',');

    const result = Object.create(null);

    keyList.forEach((item) => {
        result[item] = existKeys[item] || generateRandom();
    });

    return {
        code: 200,
        result
    };
};
