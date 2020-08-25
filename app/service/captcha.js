const Service = require('egg').Service;
const SvgCaptcha = require('svg-captcha');

class CaptchaService extends Service {
    async create() {
        const captcha = SvgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 100,
            height: 40,
            bacground: '#cc9966'
        });
        this.ctx.session.code = captcha.text;
        return captcha;
    }

    async verify(text) {
        console.log(this.ctx.session.code, text)
        return this.ctx.session.code === text
    }
}

module.exports = CaptchaService