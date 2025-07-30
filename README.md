<h1 align="center">✨开箱即用的小程序快速开发模板</h1>
<p align="center">基于Weapp-vite的微信小程序版本的封装,能够开箱即用的支持 ts / postcss / sass / less / tailwindcss 等等，还能使用众多 vite 插件</p>

## 快速使用

```shell
# 临时方案，后续添加 cli 脚手架
npx degit xkfe/template-vite-wechat 项目名称

pnpm install # yarn|npm install
```

## 使用方式

### 开发

- `pnpm dev`

- `pnpm dev --open` 可以打包并直接启动微信开发者工具

### 构建

`pnpm build`

### 打开微信开发者工具

`pnpm open`

### 生成组件/页面
```shell
pnpm g 组件名
pnpm g 页面名 -p
pnpm g 页面名 -p -n=自定义名称
```

## ⚠️关于分包
`weapp-vite` 的分包机制还不够完整。例如 **`src/subpackages/exam_utils`** 下的 `lib` 和 `utils` 在 `src/subpackages/pages/encrypt` 内使用，最终会打包进 `src/subpackages/pages/encrypt` 下的 `encrypt.js` 内，可一旦在该分包内另一个 page 页面引用，就会出现在主包。

默认期望的行为应该是这样的，假如一个代码，只被这个分包里面使用，那么他的产物应该在分包里面，

假如这个代码，除了在分包里面使用，还在其他分包，或者主包中使用，那么他的产物才应该在主包里面
