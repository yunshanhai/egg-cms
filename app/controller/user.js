const BaseController = require('../core/base_controller')

class UserController extends BaseController {
    async info() {
        const ctx = this.ctx;
        const userId = ctx.query.id;
        const user = await ctx.service.user.find(userId);
        console.log(user)
        ctx.body = user;
    }

    // 注册
    async regist() {
        const ctx = this.ctx
        
    }

    // 验证码校验
}

module.exports = UserController