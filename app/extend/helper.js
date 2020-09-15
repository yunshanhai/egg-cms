const only = require('only')
const crypto = require('crypto');
const md5 = require('md5');

module.exports = {
    formatUser(user) {
        return only(user, ['mobile', 'token', 'last_login_at'])
    },
    // 生成登录token
    createToken() {
        let str = (new Date().getTime) + crypto.randomBytes(4).toString('hex')
        return md5(str)
    },
    /**
     * 根据明文密码和salt生成密码串 
     * @param {String} password 
     * @param {String} salt 
     */
    createPassword(password, salt) {
        return crypto.createHmac('sha1', salt).update(password).digest().toString('base64');
    }
}