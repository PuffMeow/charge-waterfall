import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2' //ts解析
import { terser } from "rollup-plugin-terser" //代码压缩
import { babel } from '@rollup/plugin-babel'
import pkg from './package.json'


export default {
  input: 'src/index.ts',
  output: {
    name: "bundle",
    file: pkg.broswer,
    format: 'umd'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    terser(),
    babel({
      babelHelpers: 'runtime',
      extensions: ['.js', '.ts', '.tsx'],
      exclude: 'node_modules/**',
      presets: [
        [
          "@babel/env",
          {
            "modules": false,
            "useBuiltIns": "usage",
            "corejs": {
              "version": 3, // 使用core-js@3
              "proposals": true,
            },
            "loose": true
          },
        ]
      ],
      plugins: [
        "@babel/plugin-external-helpers",
        [
          "@babel/plugin-transform-runtime",
          {
            "useESModules": true
          }
        ]
      ]
    })
  ]
}