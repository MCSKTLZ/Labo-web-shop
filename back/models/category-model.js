const categoryModel = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
        name : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })

    return Category
}

module.exports = categoryModel