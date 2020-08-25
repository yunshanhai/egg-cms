module.exports = {
  keys: 'dxd-edu',
  security: {
    // egg-security
    csrf: false
  },
  view: {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks',
    }
  },
  mysql: {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'wordpress',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  },
  redis: {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0,
    }
  },
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  middleware: ['gzip','errorHandler'],
  // 配置 gzip 中间件的配置
  gzip: {
    threshold: 1024 // 小于 1k 的响应体不压缩
  },
  // 只对 /api 前缀的 url 路径生效
  errorHandler: {
    match: '/api',
  },
}