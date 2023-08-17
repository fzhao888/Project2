const router = require("express").Router();
const { User, Recipe, Ingredient } = require("../../models");
const withAuth = require("../../utils/auth");
const fetch = require("node-fetch");

//  GET  api/recipes
router.get("/", withAuth, async (req, res) => {
  res.render("recipe", {
    logged_in: req.session.logged_in,
  });
});

// POST route for api/recipes
router.post("/", withAuth, async (req, res) => {
  // get ingredients id using user id
  const userData = await User.findOne({
    where: {
      id: req.session.user_id,
    },
    include: [
      {
        model: Ingredient,
      },
    ],
  });

  const userIngredient = userData.get({ plain: true });
  const ingredientJSON = userIngredient.ingredients;

  // gets ingredients name
  let ingredients = "";
  // preps ingredients names as a query parameter
  for (let i = 0; i < ingredientJSON.length - 1; i++) {
    ingredients += `${ingredientJSON[i].name}%2C`;
  }

  ingredients += `${ingredientJSON[ingredientJSON.length - 1].name}`;

  const appID = 'dd1ea4e2';
  const appKey = '5a310e71d76223de342321873bdac305';
  
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredients}&app_id=${appID}&app_key=%20${appKey}%09`;

  // stores recipe label, recipe image, and recipe url
  let recipes = [];

  // fetches recipe info from edamam api
  try {
    const response = await fetch(url);
    const result = await response.text();
    const json = await JSON.parse(result);
    const recipeData = await Recipe.findAll({
      where: {
        user_id: req.session.user_id
      }
    });

    const recipes = recipeData.map(recipe => recipe.get({ plain: true }));
    const urls = [];

    for (let i = 0; i < recipes.length; i++) {
      urls.push(recipes[i].URL);
    }

   await json.hits.forEach((data) => {
    if(urls.includes(data.recipe.url)) {
      return;
    }
      // adds recipes into recipe model
        const newRecipe = Recipe.create(
          {
            name: data.recipe.label,
            URL: data.recipe.url,
            image: data.recipe.image,
            user_id: req.session.user_id
          }
        );
        recipes.push(newRecipe);
       
    });
  } catch (err) {
    res.status(500).json(err);
  }

  res.status(200).json(recipes);
});

module.exports = router;
