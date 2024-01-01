import React, { useState } from "react";
import "../../../Styles/createProduct.css";
import useCategories from "../../../hooks/useCategories";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [name, setName] = useState();
  const [cid, setCid] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [sale, setSale] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [mostLoved, setMostLoved] = useState(false);
  const [featured, setFeatured] = useState(false);
  const navigate = useNavigate();
  const categories = useCategories();
  const [photo, setPhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const warning = "Please select photo of dimensions: 400 x 400";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          if (img.width === 400 && img.height === 400) {
            setImageUrl(e.target.result);
          }
          else{
            setImageUrl(null);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }
  const handleSale = (e) => {
    if (e.target.checked) {
      setSale(true);
    } else {
      setSale(false);
    }
  };
  const handleMostLoved = (e) => {
    if (e.target.checked) {
      setMostLoved(true);
    } else {
      setMostLoved(false);
    }
  };
  const handleFeautred = (e) => {
    if (e.target.checked) {
      setFeatured(true);
    } else {
      setFeatured(false);
    }
  };
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    console.log("hello");
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("cid", cid);
      productData.append("sale", sale);
      productData.append("discountedPrice", discountedPrice);
      productData.append("mostLoved", mostLoved);
      productData.append("featured", featured);
      const response = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      alert(response.data.message);
      navigate("/admin-account/admin-products");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="createProduct">
      <form onSubmit={handleCreateProduct}>
        <h2>Create Product</h2>
        <select
          name=""
          id=""
          value={cid}
          onChange={(e) => setCid(e.target.value)}
        >
          <option value="" style={{ display: "none" }}>
            Select a category
          </option>
          {categories.map((category, index) => (
            <option value={category._id} key={index}>
              {category.name}
            </option>
          ))}
        </select>
        {imageUrl ? (
          <img src={imageUrl} alt="Selected" style={{ width: '200px', height: '200px', margin: 'auto' }} />
        ) : (
          <h4 className="imgWarning">{warning}</h4>
        )}
        <input
          type="file"
          name=""
          id="upload-photo"
          style={{ display: "none" }}
          required
          onChange={handleFileChange}
        />
        <label htmlFor="upload-photo" className="upload-photo">
          Upload photo
        </label>
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          name=""
          id=""
          placeholder="Enter price"
          required
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          name=""
          id=""
          placeholder="Enter quantity"
          required
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <div className="onSale">
          <input
            type="checkbox"
            name=""
            id="sale"
            onChange={(e) => handleSale(e)}
          />
          <label htmlFor="sale">Keep this product on sale</label>
        </div>
        {sale && (
          <input
            type="text"
            placeholder="Enter discounted price"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
          />
        )}
        <div className="mostLoved">
          <input
            type="checkbox"
            name=""
            id="loved"
            onChange={(e) => handleMostLoved(e)}
          />
          <label htmlFor="loved">
            Keep this product in most loved products
          </label>
        </div>
        <div className="featured">
          <input
            type="checkbox"
            name=""
            id="featured"
            onChange={(e) => handleFeautred(e)}
          />
          <label htmlFor="featured">
            Keep this product in featured products
          </label>
        </div>
        <button className="createProduct-btn" type="submit">
          Create product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
