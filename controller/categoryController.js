const categoriesModel = require('../model/categoryModel');
const productsModel = require('../model/productsModel');

const categoryController = async (req, res) => {
    try {
        const { categoryInput } = req.body;
        const category = await new categoriesModel({ name: categoryInput }).save();
        res.status(200).send({ success: true, message: "Category has been successfully created" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Internal server error while creating category" });
    }
}
const getCategoriesController = async (req, res) => {
    try {
        const categories = await categoriesModel.find({});
        res.status(200).send({ success: true, message: "Categories has been received", categories });
    } catch (error) {
        res.status(500).send({ success: false, message: "Internal server error while fetching categories" });
    }
}
const getSingleCategoryController = async (req, res) => {
    try {
        const category = await categoriesModel.findById(req.params.id);
        res.status(200).send({ success: true, message: "Category has been received", category });
    } catch (error) {
        res.status(500).send({ success: false, message: "Internal server error while fetching category" });
    }
}

const updateCategoryController = async (req, res) => {
    try {
        const { editCategory, cid } = req.body;
        const category = await categoriesModel.findByIdAndUpdate(cid, { name: editCategory });
        res.status(200).send({ success: true, message: "Category has been successfully updated" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Internal server error while updating category" });
    }
}

const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.body;
        const products = await productsModel.deleteMany({cid: id});
        const category = await categoriesModel.findByIdAndDelete(id);
        res.status(200).send({ success: true, message: "Category has been successfully deleted" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Internal server error while deleting category" });
    }
}

module.exports = { categoryController, getCategoriesController, updateCategoryController, getSingleCategoryController, deleteCategoryController };