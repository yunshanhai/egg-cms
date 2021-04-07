const BaseController = require('../../core/base_controller')
const crypto = require('crypto');
const moment = require('moment');

class AuthController extends BaseController {
    async login() {
        const { ctx, service } = this

        const {username, password} = ctx.request.body

        this.response({
            'id': 'aaaaaaaaaa',
            'name': 'kdkdkdidiii',
            'username': 'admin',
            'password': '',
            'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
            'status': 1,
            'telephone': '',
            'lastLoginIp': '27.154.74.117',
            'lastLoginTime': 1534837621348,
            'creatorId': 'admin',
            'createTime': 1497160610259,
            'deleted': 0,
            'roleId': 'admin',
            'lang': 'zh-CN',
            'token': '4291d7da9005377ec9aec4a71ea837f'
        })
    }

    async logout() {
        this.result({}, '[测试接口] 注销成功')
    }

    async register() {
        
    }
}

module.exports = AuthController
