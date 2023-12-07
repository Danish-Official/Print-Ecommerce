const express = require('express');
const {categoryController, getCategoriesController, updateCategoryController, deleteCategoryController, getSingleCategoryController} = require('../controller/categoryController');
const { requireSignIn, isAdmin } = require('../helpers/authHelper');
const router = express.Router();

router.post('/create-category', requireSignIn, isAdmin, categoryController);
router.post('/update-category', requireSignIn, isAdmin, updateCategoryController);
router.post('/delete-category', requireSignIn, isAdmin, deleteCategoryController);
router.get('/get-categories', getCategoriesController);
router.get('/get-singlecategory/:id', getSingleCategoryController);

module.exports = router