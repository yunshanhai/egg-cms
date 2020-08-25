module.exports = app => {
    app.once('server', server => {
        // websocket
    });
    app.on('error', (err, ctx) => {
        // report error
    });
    app.on('request', ctx => {
        // log receive request
    });
    app.on('response', ctx => {
        // ctx.starttime is set by framework
        const used = Date.now() - ctx.starttime;
        // log total cost
    });

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
          await app.redis.set(key, value, 'PX', maxAge);
        },
     
        async destroy(key) {
          await app.redis.del(key);
        },
    };
}