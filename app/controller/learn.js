// 引入Controller的两种方式
const { Controller } = require('egg')
// const Controller = require('egg').Controller

class LearnController extends Controller {
    // Controller基类有这些属性：
    // ctx - 当前请求的 Context 实例。
    // app - 应用的 Application 实例。
    // config - 应用的配置。
    // service - 应用所有的 service。
    // logger - 为当前 controller 封装的 logger 对象。
    async index() {
        const ctx = this.ctx;
        // console.log(ctx.query)
        // console.log(ctx.queries)
        // console.log(ctx.params) // param用来接收路由中定义的参数 /user/:id
        console.log('当前环境变量', this.app.config.env)
        this.ctx.body = 'learn index'
    }

    async session() {

    }

    async redis() {
        const {ctx, app} = this;
        // await app.redis.set('time', new Date().getTime())
        await app.redis.set('tt', 'test', 'PX', 36000);
        ctx.body = await app.redis.get('time');
    }
}

module.exports = LearnController