const express = require("express");
const {
  getProductsController,
  getProductPhotoController,
  createProductController,
  groupByCategories,
  getSingleProduct,
  updateProductController,
  getProductsByCategory,
  deleteProductController,
  relatedProductsController,
} = require("../controller/productsController");
const router = express.Router();
const formidable = require("express-formidable");
const { requireSignIn, isAdmin } = require("../helpers/authHelper");

router.get("/get-products/:sortBy", getProductsController);
router.get("/getproductphoto/:id", getProductPhotoController);
router.get("/get-grouped-products", groupByCategories);
router.get("/get-related-products/:cid/:pid", relatedProductsController);
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);
router.get("/get-singleProduct/:pid", getSingleProduct);
router.get("/get-products-by-category/:cid/:sortBy", getProductsByCategory);

module.exports = router;
