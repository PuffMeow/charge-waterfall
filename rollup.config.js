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
      exclude: 'node_modules/**'
    })
  ]
}