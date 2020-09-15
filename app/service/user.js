const crypto = require('crypto');
const Service = require("egg").Service;

class UserService extends Service {
    async find(uid) {
        const user = await this.app.mysql.get('egg_users', {id: uid});
        return { user };
    }

    async findByMobile(mobile) {
        const user = await this.app.mysql.get('egg_users', {mobile});
        return user;
    }

    async create(options) {
        const result = await this.app.mysql.insert('egg_users', options)
        console.log(result)
        return result
    }

    async updateToken(token, expire) {
        
    }

    // 生成密码
    createPassword(password, salt) {
        return crypto.createHmac('sha1', salt).update(password).digest().toString('base64');
    }
}

module.exports = UserService;