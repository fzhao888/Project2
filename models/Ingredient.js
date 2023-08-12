const { Model, DataTypes } = require("sequelize"); 
const sequelize = require("../config/connection");

class Ingredient extends Model {}

/**
 * Schema for Ingredient Table
 * id (primary)
 * name - string 
 * quantity - string  
 * unit -  string
 * 
 */

Ingredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "ingredient",
    }
);

module.exports = Ingredient;