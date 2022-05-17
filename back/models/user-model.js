const userModel = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })

    return User
}

module.exports = userModel