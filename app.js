/* 在框架运行时，会在 Application 实例上触发一些事件，应用开发者或者插件开发者可以监听这些事件做一些操作。作为应用开发者，我们一般会在启动自定义脚本中进行监听。 */
// module.exports = (app) => {};

// app.js
class AppBootHook {
  constructor(app) {
    this.app = app;

    // server: 该事件一个 worker 进程只会触发一次，在 HTTP 服务完成启动后，会将 HTTP server 通过这个事件暴露出来给开发者
    app.once("server", (server) => {
      // websocket
    });

    // error: 运行时有任何的异常被 onerror 插件捕获后，都会触发 error 事件，将错误对象和关联的上下文（如果有）暴露给开发者，可以进行自定义的日志记录上报等处理。
    app.on("error", (err, ctx) => {
      // report error
    });

    // request 和 response: 应用收到请求和响应请求时，分别会触发 request 和 response 事件，并将当前请求上下文暴露出来，开发者可以监听这两个事件来进行日志记录。
    app.on("request", (ctx) => {
      // log receive request
    });
    app.on("response", (ctx) => {
      // ctx.starttime is set by framework
      const used = Date.now() - ctx.starttime;
      // log total cost
    });

    // app.willReady(async () => {
    //   console.log('-----------willReady')
    // })

    // https://eggjs.org/zh-cn/core/cookie-and-session.html
    app.sessionStore = {
      async get(key) {
        const res = await app.redis.get(key);
        if (!res) return null;
        return JSON.parse(res);
      },

      async set(key, value, maxAge) {
        // maxAge not present means session cookies
        // we can't exactly know the maxAge and just set an appropriate value like one day
        if (!maxAge) maxAge = 24 * 60 * 60 * 1000;
        value = JSON.stringify(value);
        await app.redis.set(key, value, "PX", maxAge);
      },

      async destroy(key) {
        await app.redis.del(key);
      },
    };
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

    // 例如：参数中的密码是加密的，在此处进行解密
    // 例如：插入一个中间件到框架的 coreMiddleware 之间
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务

    // 例如：创建自定义应用的示例
    // 例如：加载自定义的目录
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用

    // 例如：从数据库加载数据到内存缓存
  }

  async didReady() {
    // 应用已经启动完毕
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例

    // this.app.server.on("timeout", (socket) => {
    //   // handle socket timeout
    // });
  }
}

module.exports = AppBootHook;
