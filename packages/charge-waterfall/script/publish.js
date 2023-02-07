const fs = require('fs')
const path = require('path')
const readline = require('readline')
const resolve = (_path) => path.resolve(__dirname, _path)
const pkgPath = resolve('../package.json')
const pkg = fs.readFileSync(pkgPath, 'utf-8')
const pkgJson = JSON.parse(pkg)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question(`当前版本号为：${pkgJson.version}\n
请输入一个新的发布版本号：\n`, (version) => {
  const res = compareVersion(version, pkgJson.version)
  if (res === -1 || res === 0) {
    console.log('输入的版本号小于或等于当前版本号，不合法，请重新输入')
    process.exit(1)
  }
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

function compareVersion(v1, v2) {
  const arr1 = v1.split('.'), arr2 = v2.split('.')
  let len = Math.max(arr1.length, arr2.length)

  while (arr1.length < len) {
    arr1.push('0')
  }
  while (arr2.length < len) {
    arr2.push('0')
  }

  for (let i = 0; i < len; i++) {
    let num1 = Number(arr1[i]), num2 = Number(arr2[i])
    if (num1 > num2) {
      return 1
    }
    if (num1 < num2) {
      return -1
    }
  }
  return 0
}