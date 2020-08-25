const BaseController = require('../core/base_controller')

class CaptchaController extends BaseController {
    async create() {
        const ctx = this.ctx;
        let captcha = await this.service.captcha.create(); // 服务里面的方法
        ctx.response.type = 'image/svg+xml';  // 知道你个返回的类型
        ctx.body = captcha.data; // 返回一张图片
    }

    async verify() {
        const ctx = this.ctx
        if (await this.service.captcha.verify(ctx.request.body.text)) {
            this.success('验证成功')
        } else {
            this.failed('验证失败')
        }
    }
}

module.exports = CaptchaController