// eslint-disable-next-line import/no-unresolved,@typescript-eslint/no-var-requires
const variables = require('../rdc.variables');

if (variables.babel) {
    const babel = variables.babel || {};
    const presets = babel.presets || [];
    const plugins = babel.plugins || [];

    module.exports = {
        presets,
        plugins,
    };
} else {
    module.exports = {};
}



