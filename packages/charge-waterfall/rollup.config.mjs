import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";
import json from '@rollup/plugin-json';
import { readFileSync } from 'fs';
import path from "path";

const pkg = JSON.parse(readFileSync(path.resolve('./package.json'), 'utf8'));

export default {
  input: "./src/index.ts",
  output: [
    {
      name: "bundle.js",
      file: pkg.main,
      format: "umd",
    },
    {
      name: "es",
      file: pkg.module,
      format: "esm",
    },
    {
      name: "dts",
      file: pkg.types,
      format: "esm",
    },
  ],
  plugins: [
    commonjs(),
    json(),
    nodeResolve(),
    esbuild({
      minify: process.env.NODE_ENV === "production",
      target: "es2015",
    }),
    dts(),
    babel({
      babelHelpers: "runtime",
      extensions: [".js", ".ts", ".tsx"],
      exclude: "node_modules/**",
      plugins: [
        "@babel/plugin-external-helpers",
        [
          "@babel/plugin-transform-runtime",
          {
            useESModules: true,
          },
        ],
      ],
    }),
  ],
};
