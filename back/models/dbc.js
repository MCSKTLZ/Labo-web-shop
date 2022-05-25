require("dotenv").config()
const { Sequelize, DataTypes } = require("sequelize")
const userModel = require("./user-model")
const orderModel = require("./order-model")
const productModel = require('./product-model')
const roleModel = require ("./role-model")
const addressModel = require ("./address-model")
const categoryModel = require ("./category-model")
const brandModel = require ("./brand-model")
const order_productModel = require ("./MTM-order_product")
const cartModel = require ("./cart-model")
const cart_productModel = require("./MTM-cart_product")

let dbConnector

module.exports = {
    
    connect : () => {
        if(!dbConnector)
        {
            const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { 
                host: process.env.DB_HOST,
                dialect: "mysql",
                timezone:"+02:00"
            })
            dbConnector = {
                Sequelize: Sequelize,
                sequelize: sequelize,
                User: userModel(sequelize, DataTypes),
                Role : roleModel(sequelize, DataTypes),
                Order: orderModel(sequelize, DataTypes),
                Product : productModel(sequelize, DataTypes),
                Address : addressModel(sequelize, DataTypes),
                Category : categoryModel(sequelize, DataTypes),
                Brand : brandModel(sequelize, DataTypes),
                Cart : cartModel(sequelize, DataTypes),
                Order_Product : order_productModel(sequelize, DataTypes),
                Cart_Product : cart_productModel(sequelize, DataTypes)
            }
            //Le user peut avoir plusieurs commande et la commande n'a qu'un seul user (One-to-many)
            dbConnector.User.hasMany(dbConnector.Order, {onDelete: 'cascade', hooks: true})
            dbConnector.Order.belongsTo(dbConnector.User, {
            allowNull: false
            })
            //Le user a 1 role et le role a plusieurs user (one-to-many)
            dbConnector.Role.hasMany(dbConnector.User)
            dbConnector.User.belongsTo(dbConnector.Role, {
            allowNull: false
            })
            //Le user a 1 adress et l'address a un seul user (one-to-one)
            dbConnector.Address.hasOne(dbConnector.User)
            dbConnector.User.belongsTo(dbConnector.Address)
            // L'order peut avoir plusieurs produits et inversement  (Many-to-many)
            dbConnector.Order.belongsToMany(dbConnector.Product, { through: dbConnector.Order_Product})
            dbConnector.Product.belongsToMany(dbConnector.Order, { through: dbConnector.Order_Product})
            // le cart a plusieurs produits et le produit a plusieurs cart
            dbConnector.Cart.belongsToMany(dbConnector.Product, { through: dbConnector.Cart_Product})
            dbConnector.Product.belongsToMany(dbConnector.Cart, { through: dbConnector.Cart_Product})
            // le cart a un user et l'user a un seul cart
            dbConnector.User.hasOne(dbConnector.Cart)
            dbConnector.Cart.belongsTo(dbConnector.User)
            // Le produit a une brand et la brand peut avoir plusieurs produits (one-to-many)
            dbConnector.Brand.hasMany(dbConnector.Product)
            dbConnector.Product.belongsTo(dbConnector.Brand, {
                allowNull: false
            })
            //le produit a une ou plusieurs category et inversement (many-to-many)
            dbConnector.Product.belongsToMany(dbConnector.Category, { through: "Category_Product" })
            dbConnector.Category.belongsToMany(dbConnector.Product, { through: "Category_Product" })

            //Crée les roles 
            if(!dbConnector.Role.findOne({where : {role : "user"}})) {
                dbConnector.Role.create({id : 2 , role : "user"})
                dbConnector.Role.create({id : 1 , role : "admin"})
            }
            
            //sync({force : true}) pour reinitiliser la db
            dbConnector.sequelize.sync()
            
        }
    },

    get : () => {
        if(!dbConnector)
            this.connect
        else
            return dbConnector
    }
}