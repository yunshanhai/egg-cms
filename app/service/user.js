const UserController = require("../controller/user");

const Service = require("egg").Service;

class UserService extends Service {
    async find(uid) {
        const user = await this.app.mysql.get('dxd_users', {id: uid});
        return { user };
    }
}

module.exports = UserService;