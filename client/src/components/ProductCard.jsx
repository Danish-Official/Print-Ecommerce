import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import "../Styles/productCard.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductCard = ({
  pid,
  cid,
  productName,
  price,
  sale,
  discountedPrice,
}) => {
  const params = useParams();
  const [category, setCategory] = useState({});
  const getCategory = async () => {
    try {
      const response = await axios.get(
        `/api/v1/category/get-singlecategory/${cid}`
      );
      setCategory(response.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, [cid]);

  return (
    <div className="card">
      <div className="card-content">
        {sale && <span className="saleBadge">Sale!</span>}
        <div className="card-img">
          <img src={`/api/v1/product/getproductphoto/${pid}`} alt="" />
        </div>
        <span className="category-span">{category.name}</span>
        <h2>{productName}</h2>
        <StarRating />
        <div className="realPrice">
          <span
            className="price"
            style={
              sale ? { color: "#a4acb4", textDecoration: "line-through" } : {}
            }
          >
            {price.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </span>
          <span className="discountedPrice">
            {discountedPrice &&
              discountedPrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
