const fs = require('fs')
const path = require('path')
const readline = require('readline')
const resolve = (_path) => path.resolve(__dirname, _path)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('请输入一个新的发布版本号：\n', (version) => {
  // TODO:版本号比较算法

  const pkgPath = resolve('../package.json')
  const pkg = fs.readFileSync(pkgPath, 'utf-8')
  const pkgJson = JSON.parse(pkg)
  pkgJson.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkgJson))

  fs.copyFile(resolve('../README.md'), resolve('../dist/README.md'), (err) => {
    if (err) {
      console.log('README.md文件复制失败', err)
      return
    }

    console.log('README.md文件复制成功')
  })

  fs.copyFile(resolve('../package.json'), resolve('../dist/package.json'), (err) => {
    if (err) {
      console.log('package.json文件复制失败', err)
      return
    }

    console.log('package.json文件复制成功')
  })
  rl.close()
})