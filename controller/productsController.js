const ProductsModel = require("../model/productsModel");
const fs = require("fs");
const Mongoose = require("mongoose");

const createProductController = async (req, res) => {
  try {
    const {
      name,
      cid,
      description,
      price,
      quantity,
      sale,
      mostLoved,
      featured,
      discountedPrice,
    } = req.fields;
    const Product = new ProductsModel({
      name,
      cid,
      description,
      price,
      quantity,
      sale,
      discountedPrice,
      mostLoved,
      featured,
    });
    const { photo } = req.files;
    if (photo) {
      Product.photo.data = fs.readFileSync(photo.path);
      Product.photo.contentType = photo.type;
    }
    await Product.save();
    res.status(200).send({ message: "Product has been successfully created" });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong at server while creating product",
    });
    console.log(error);
  }
};
const updateProductController = async (req, res) => {
  try {
      const { name, cid, description, price, quantity, sale, mostLoved, featured, discountedPrice } = req.fields;
      const updateData = { name, cid, description, price, quantity, mostLoved, featured, sale, discountedPrice };

      // // Check if discountedPrice is provided and not null
      // if (discountedPrice !== undefined && discountedPrice !== null) {
      //     updateData.discountedPrice = discountedPrice;
      // }
      
      const Product = await ProductsModel.findByIdAndUpdate(req.params.id, updateData);
      const { photo } = req.files;
      if (photo) {
          Product.photo.data = fs.readFileSync(photo.path);
          Product.photo.contentType = photo.type;
      }
      await Product.save();
      res.status(200).send({ message: "Product has been successfully updated" });
  } catch (error) {
      res.status(500).send({ message: "Something went wrong at server while updating product", error: error.message });
      console.log(error);
  }
}

const deleteProductController = async(req, res) => {
  try {
    const Product = await ProductsModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({message: 'product deleted successfully'})
  } catch (error) {
    console.log(error);
  }
}

const getProductsController = async (req, res) => {
  try {
    let Products;
    if (req.params.sortBy === "latest") {
      Products = await ProductsModel.find({})
        .select("-photo")
        .sort({ createdAt: -1 });
    }
    // else if (req.params.sortBy === "popularity") {
    // } else if (req.params.sortBy === "average rating") {
    // }
    else if (req.params.sortBy === "price: low to high") {
      Products = await ProductsModel.aggregate([
        {
          $addFields: {
            effectivePrice: {
              $ifNull: ["$discountedPrice", "$price"],
            },
          },
        },
        {
          $lookup: {
            from: "categories", // Replace with the actual name of the category collection
            localField: "cid",
            foreignField: "_id",
            as: "cid",
          },
        },
        {
          $unwind: "$cid", // Unwind the "category" array created by $lookup
        },
        {
          $project: {
            photo: 0, // Exclude the "photo" field
          },
        },
        {
          $sort: {
            effectivePrice: 1,
          },
        },
      ]);
    } else if (req.params.sortBy === "price: high to low") {
      Products = await ProductsModel.aggregate([
        {
          $addFields: {
            effectivePrice: {
              $ifNull: ["$discountedPrice", "$price"],
            },
          },
        },
        {
          $lookup: {
            from: "categories", // Replace with the actual name of the category collection
            localField: "cid",
            foreignField: "_id",
            as: "cid",
          },
        },
        {
          $unwind: "$cid", // Unwind the "category" array created by $lookup
        },
        {
          $project: {
            photo: 0, // Exclude the "photo" field
          },
        },
        {
          $sort: {
            effectivePrice: -1,
          },
        },
      ]);
    } else {
      Products = await ProductsModel.find({}).select("-photo");
    }
    res.status(200).send({
      Products,
    });
  } catch (error) {
    console.log("Server error");
    res.status(500).send({
      error: error.message,
    });
  }
};

const getProductPhotoController = async (req, res) => {
  try {
    const product = await ProductsModel.findById(req.params.id).select("photo");
    res.set("Content-Type", product.photo.contentType);
    return res.status(200).send(product.photo.data);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const groupByCategories = async (req, res) => {
  try {
    const groupedProducts = await ProductsModel.aggregate([
      {
        $group: {
          _id: "$cid",
          categoryCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "cid",
        },
      },
      {
        $project: {
          _id: 0,
          categoryName: { $arrayElemAt: ["$cid.name", 0] },
          categoryCount: 1,
          cid: "$cid._id",
        },
      },
    ]);
    res.status(200).send({
      groupedProducts,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const getAdminProducts = async (req, res) => {
  try {
    const adminProducts = await ProductsModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Admin products fetched successfully",
      adminProducts,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Unable to fetch admin products" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await ProductsModel
      .findById(req.params.pid)
      .select("-photo")
      .populate("cid");
    return res.status(200).send({
      success: true,
      message: "Got single product successfully",
      product,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Could not got the product" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    let products;
    const categoryId = req.params.cid;
    if (req.params.sortBy === "latest") {
      products = await ProductsModel.find({ cid: categoryId })
        .select("-photo")
        .populate("cid")
        .sort({ createdAt: -1 });
    }
    // else if (req.params.sortBy === "popularity") {
    // } else if (req.params.sortBy === "average rating") {
    // }
    else if (req.params.sortBy === "price: low to high") {
      products = await ProductsModel.aggregate([
        {
          $match: {
            cid: new Mongoose.Types.ObjectId(categoryId)
          }
        },
        {
          $addFields: {
            effectivePrice: {
              $ifNull: ["$discountedPrice", "$price"],
            },
          },
        },
        {
          $lookup: {
            from: "categories", 
            localField: "cid",
            foreignField: "_id",
            as: "cid",
          },
        },
        {
          $unwind: "$cid", 
        },
        {
          $project: {
            photo: 0, 
          },
        },
        {
          $sort: {
            effectivePrice: 1,
          },
        }
      ]);
    } else if (req.params.sortBy === "price: high to low") {
      products = await ProductsModel.aggregate([
        {
          $match: {
            cid: new Mongoose.Types.ObjectId(categoryId)
          }
        },
        {
          $addFields: {
            effectivePrice: {
              $ifNull: ["$discountedPrice", "$price"],
            },
          },
        },
        {
          $lookup: {
            from: "categories", 
            localField: "cid",
            foreignField: "_id",
            as: "cid",
          },
        },
        {
          $unwind: "$cid", 
        },
        {
          $project: {
            photo: 0, 
          },
        },
        {
          $sort: {
            effectivePrice: -1,
          },
        },
      ]);
    } else {
      products = await ProductsModel
        .find({ cid: req.params.cid })
        .select("-photo")
        .populate("cid");
    }
    return res.status(200).send({
      success: true,
      message: "Got category products successfully",
      products,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Could not got the products" });
  }
};

const relatedProductsController = async(req, res) => {
  try {
    const products = await ProductsModel.find({
      $and: [
        {cid: req.params.cid},
        {_id: {$ne: req.params.pid}}
      ]
    }).limit(3).select('-photo');
    res.status(200).send({message: 'Related products fetched successfully', products});
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getProductsByCategory,
  updateProductController,
  getSingleProduct,
  getAdminProducts,
  getProductsController,
  getProductPhotoController,
  createProductController,
  groupByCategories,
  deleteProductController,
  relatedProductsController
};
