import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2"; //ts解析
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser"; //代码压缩

export default {
  input: "src/index.ts",
  output: [
    {
      name: "bundle.js",
      file: "dist/index.js",
      format: "umd",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "es",
    },
    {
      file: "dist/index.d.ts",
      format: "es",
    },
  ],
  plugins: [nodeResolve(), commonjs(), typescript(), terser(), babel()],
};
