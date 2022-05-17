const roleModel = (sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
        role : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })

    return Role
}

module.exports = roleModel