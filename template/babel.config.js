// eslint-disable-next-line import/no-unresolved,@typescript-eslint/no-var-requires
const variables = require('../.cache/rdc.variables');

let presets = [];

let plugins = [
    'transform-vue-jsx'
];

if (variables.babel) {
    const babel = variables.babel || {};

    presets = presets.concat(babel.presets || []);
    plugins = plugins.concat(babel.plugins || []);
}

module.exports = {
    presets,
    plugins,
};

