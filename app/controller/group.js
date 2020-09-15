const BaseController = require('../core/base_controller');

class GroupController extends BaseController {
    async index() {
        const ctx = this.ctx
        let groups = await ctx.model.Group.findAll();
        this.success(groups)
    }

    async show() {
        const ctx = this.ctx
        const Group = ctx.model.Group
        let group = await Group.findByPk(ctx.params.id)
        this.success(group)
    }

    async create() {
        const rule = {
            name: { type: 'string', min:1, max: 16},
            permissions: { type: 'array', itemType: 'string'}
        }
        this.ctx.validate(rule)

        if (await this.ctx.model.Group.findOne({where: { name: this.ctx.request.body.name}})) {
            throw {
                message: 'group 已存在'
            }
        }

        const result = await this.ctx.model.Group.create({
            name: this.ctx.request.body.name,
            permissions: this.ctx.request.body.permissions
        })
        this.success(result)
    }

    async update() {
        const rule = {
            name: { type: 'string', min:1, max: 16},
            permissions: { type: 'array', itemType: 'string'}
        }
        this.ctx.validate(rule)

        let result = await this.ctx.model.Group.update({
            name: this.ctx.request.body.name,
            permissions: this.ctx.request.body.permissions
        }, {
            where: { id: this.ctx.params.id}
        })

        if (result[0] === 1) {
            this.success()
        } else {
            throw {
                message: 'not found'
            }
        }
    }

    async destroy() {
        let result = await this.ctx.model.Group.destroy({where: {
            id: this.ctx.params.id
        }})
        this.success(result)
    }
}

module.exports = GroupController