const path = require('path');

const proxyPrefix = [
    ///#proxy///
    '///{prefix}///',
    ////proxy///
];

const proxyRegExp = new RegExp(proxyPrefix.join('|'));

module.exports = {
    proxyRegExp,
    asyncMockPath: path.resolve(__dirname, 'src', '__mock__')
};
