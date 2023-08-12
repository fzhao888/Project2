const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class RecipeIngredient extends Model {}

/**
 * Schema for recipe_ingredient:
 * id (Primary) - int
 * recipe_id references recipe(id) - int
 * ingredient_id references ingredient(id) - int
 *
 *  
 * recipe_ingredient showcases many to many relationship between recipe and ingredient
 */
RecipeIngredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "recipe",
        key: "id",
      },
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "ingredient",
        key: "id"
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "recipe_ingredient",
  }
);

module.exports = RecipeIngredient;