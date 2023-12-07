const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const establishConnection = require("./db");
const app = express();
const productsRoutes = require("./routes/productsRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const mailRoute = require('./routes/mailRoute')
const path = require('path');

dotenv.config();
const PORT = process.env.PORT || 8000;

establishConnection();

//pre-defined middlewares
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productsRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/mail", mailRoute);
app.use(express.static(path.join(__dirname, './client/build')));

app.use('*', function(req, res){
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})

app.listen(PORT, () => {
  console.log("Server is listening");
});
