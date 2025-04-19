import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

export default {
  input: "./src/worker.js",
  output: {
    file: "dist/worker.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      browser: true,
      extensions: [".js", ".json"],
    }),
    commonjs(),
    json(),
    terser(),
  ],
  external: ["@cloudflare/workers-types"],
};
