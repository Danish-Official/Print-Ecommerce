const Mongoose = require("mongoose");

const ProductsSchema = new Mongoose.Schema(
  {
    photo: {
      data: Buffer,
      contentType: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    cid: {
      type: Mongoose.ObjectId,
      ref: "categories",
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    discountedPrice: {
      type: Number,
      default: null
    },
    featured: {
      type: Boolean,
      default: false
    },
    mostLoved: {
      type: Boolean,
      default: false
    },
    sale: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("products", ProductsSchema);
