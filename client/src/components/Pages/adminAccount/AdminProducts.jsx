import React, { useEffect, useState } from "react";
import "../../../Styles/adminProducts.css";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminProducts() {
  const [adminProducts, setAdminProudcts] = useState([]);

  const getAdminProducts = async () => {
    try {
      const response = await axios.get("/api/v1/auth/admin-products");
      if (response.data.success === true) {
        setAdminProudcts(response.data.adminProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAdminProducts();
  }, []);
  return (
    <div className="adminProducts">
      <h2>Admin Products</h2>
      <div className="adminProducts__container">
        {adminProducts.map((p, index) => (
          <Link to={`/admin-account/update-product/${p._id}`} key={index}>
            <div className="productCard">
              <div className="product-img">
                <img src={`/api/v1/product/getproductphoto/${p._id}`} alt="" />
              </div>
              <div className="productName">{p.name}</div>
              <div className="productDesc">{p.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
