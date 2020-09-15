'use strict';

module.exports = app => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;
    const prefix = app.config.sequelize.tableNamePrefix

    const Group = app.model.define('group', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(16),
        permissions: { 
            type: TEXT,
            get() {
                return JSON.parse(this.getDataValue('permissions'))
            },
            set(val) {
                if (typeof val === 'object') {
                    this.setDataValue('permissions', JSON.stringify(val));
                }
            }
        },
    }, {
        tableName: prefix + 'groups',
        timestamps: false
    })

    return Group;
}