# egg框架官方文档
https://eggjs.org/zh-cn/intro/quickstart.html

## 初始化项目
```
$ mkdir egg-edu-net
$ cd egg-edu-net
$ npm init
$ npm i egg --save
$ npm i egg-bin --save-dev
```

## 添加npm scripts 到package.json
```
{
  "name": "egg-example",
  "scripts": {
    "dev": "egg-bin dev"
  }
}
```

## 启动 
npm run dev
* 本地启动应用进行开发活动，当我们修改代码并保存后，应用会自动重启实时生效。

## 接口

* 用户注册
* 用户登录
* 找回密码
