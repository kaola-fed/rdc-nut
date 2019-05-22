const path = require('path');

module.exports = {
    proxyRegExp: /^\/api|sc-workdesk/,
    asyncMockPath: path.resolve(__dirname, 'src', '__mock__', 'async_mock')
};
