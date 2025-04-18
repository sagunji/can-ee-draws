const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const terser = require("@rollup/plugin-terser");

module.exports = {
  input: "server.js",
  output: {
    file: "dist/worker.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      preferBuiltins: false,
      browser: true,
    }),
    commonjs({
      ignoreDynamicRequires: true,
      transformMixedEsModules: true,
    }),
    json(),
    terser(),
  ],
  external: [],
};
