const router = require('express').Router();
const { Ingredient } = require('../../models');
const withAuth = require('../../utils/auth');

// POST for ingredients using withAuth middleware
router.post('/', withAuth, async(req,res) => {
    try{
        const newIngredient = await Ingredient.create({
        ...req.body,
        user_id: req.session.user_id
        

        });
    } catch(err) {
        res.status(400).json(err);
    }
});
