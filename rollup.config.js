const babel = require('rollup-plugin-babel');
const eslint = require('rollup-plugin-eslint');

const { dependencies } = require('./package.json');

module.exports = {
  input: 'src/index.js',
  external: id => {
    if(/^\./.test(id)) return false;

    return !!dependencies[id.split('/')[0]];
  },
  sourcemap: true,
  output: {
    format: 'cjs',
    file: 'build/bundle.js'
  },
  plugins: [
    // гоним eslint
    eslint({  }),
    
    // обрабатываем JS
    babel({ runtimeHelpers: true }),
  ]
};