const BaseController = require('../core/base_controller');
const crypto = require('crypto');
const moment = require('moment')

class UserController extends BaseController {
    async info() {
        const ctx = this.ctx;
        const userId = ctx.query.id;
        // const user = await ctx.service.user.find(userId);
        const user = await ctx.model.User.findByPk(parseInt(userId))
        console.log(user)
        ctx.body = user;
    }

    // 登录
    async login() {
        const { ctx, service } = this

        const rule = {
            mobile: { type: 'string' },
            // captcha: { type: 'string' },
            password: { type: 'string', min: 6, max: 20 }
        };
        ctx.validate(rule)

        const {mobile, password} = ctx.request.body
        // let user = await service.user.findByMobile(mobile);
        let user = await ctx.model.User.findByMobile(mobile);
        if (!user) {
            throw { message: '用户不存在'};
        }

        if(ctx.helper.createPassword(password, user.salt) !== user.password) {
            throw { message: '密码错误'};
        }

        // 生成登录token
        user.update({
            token: ctx.helper.createToken(),
            last_login_at: new Date()
        })
        console.log(new Date());

        console.log(user.dataValues)
        
        this.success(ctx.helper.formatUser(user));
    }

    // 注册
    async regist() {
        const { ctx, service } = this

        const rule = {
            mobile: { type: 'string' },
            captcha: { type: 'string' },
            password: { type: 'string', min: 6, max: 20 }
        };
        ctx.validate(rule) // will throw if invalid
        // const errors = app.validator.validate(rule, ctx.request.body);

        let salt = crypto.randomBytes(4).toString('hex');
        let password = ctx.service.user.createPassword(ctx.request.body.password, salt);
        let user = {
            mobile: ctx.request.body.mobile,
            salt,
            password,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        let result2 = await service.user.create(user)
        // {
        //     "fieldCount": 0,
        //     "affectedRows": 1,
        //     "insertId": 2,
        //     "serverStatus": 2,
        //     "warningCount": 0,
        //     "message": "",
        //     "protocol41": true,
        //     "changedRows": 0
        // }

        this.success(result2)
    }

    // 检查用户名、手机号等是否存在
    async check() {
        if (this.ctx.query.mobile) {
            const user = await this.ctx.service.user.findByMobile(this.ctx.query.mobile)
            this.success(!!user)
        } else {
            throw { message: 'not exist'};
        }
    }

    // 验证码校验
}

module.exports = UserController