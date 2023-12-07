const Mongoose = require("mongoose");

const orderSchema = new Mongoose.Schema({
  buyer: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: 'hello'
  },
  status: {
    type: String,
    default: "Yet to dispatch",
    enum: ["Yet to dispatch", "Dispatched", "Out for delivery", "Arrived"],
  },
  products: [
    {
      type: Mongoose.Types.ObjectId, //.Types is additional here
      ref: "products",
    },
  ],
  payment: {},
}, {timestamps :true});

module.exports = Mongoose.model("Orders", orderSchema);
