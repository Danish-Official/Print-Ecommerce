import React, { useContext, useEffect, useState } from "react";
import "../../../Styles/createProduct.css";
import useCategories from "../../../hooks/useCategories";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { cartModalContext } from "../../../context/cartContext";

const UpdateProduct = () => {
  const [name, setName] = useState();
  const [cid, setCid] = useState();
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [sale, setSale] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState();
  const [mostLoved, setMostLoved] = useState(false);
  const [featured, setFeatured] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { cartItems, setCartItems } = useContext(cartModalContext);
  const [prevPhoto, setPrevPhoto] = useState(null);

  const categories = useCategories();
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
  const deleteProduct = async (e) => {
    try {
      const response = await axios.delete(
        `/api/v1/product/delete-product/${params.pid}`
      );
      if (response.status === 200) {
        alert("Product deleted successfully");
        const newCartItems = cartItems.filter((item)=> item._id !== params.pid);
        setCartItems(newCartItems);
        navigate("/admin-account/admin-products");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("cid", cid);
      productData.append("mostLoved", mostLoved);
      productData.append("featured", featured);
      
      if(sale && (discountedPrice !== null && discountedPrice !== undefined && discountedPrice !== '')){
        productData.append("sale", sale);
        productData.append("discountedPrice", discountedPrice);
      }
      else{
        productData.append("sale", false);
        productData.append("discountedPrice", '');
      }

      const response = await axios.put(
        `/api/v1/product/update-product/${params.pid}`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type explicitly
          },
        }
      );
      alert(response.data.message);
      navigate("/admin-account/admin-products");
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleProduct = async () => {
    try {
      const response = await axios.get(
        `/api/v1/product/get-singleProduct/${params.pid}`
      );
      const {
        name,
        description,
        cid,
        quantity,
        price,
        sale,
        discountedPrice,
        mostLoved,
        featured,
      } = response.data.product;
      setName(name);
      setCid(cid._id);
      setPhoto(photo);
      setDescription(description);
      setPrice(price);
      setQuantity(quantity);
      setSale(sale);
      setDiscountedPrice(discountedPrice);
      setMostLoved(mostLoved);
      setFeatured(featured);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    setImageUrl(`/api/v1/product/getproductphoto/${params.pid}`);
  }, []);

  return (
    <div className="createProduct">
      <form onSubmit={handleUpdateProduct}>
        <h2>Update Product</h2>
        <select
          name="cid"
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
          id="uploaded-photo"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="uploaded-photo" className="upload-photo">
          Upload photo
        </label>
        <input
          type="text"
          name="name"
          id=""
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          name="description"
          id=""
          placeholder="Enter description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          name="price"
          id=""
          placeholder="Enter price"
          required
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          name="quantity"
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
            name="sale"
            id="update-sale"
            checked={sale}
            onChange={(e) => handleSale(e)}
          />
          <label htmlFor="update-sale">Keep this product on sale</label>
        </div>
        {sale && (
          <input
            type="text"
            placeholder="Enter discounted price"
            value={discountedPrice}
            name="discountedPrice"
            onChange={(e) => setDiscountedPrice(e.target.value)}
          />
        )}
        <div className="mostLoved">
          <input
            type="checkbox"
            name="mostLoved"
            id="mostloved"
            checked={mostLoved}
            onChange={(e) => handleMostLoved(e)}
          />
          <label htmlFor="mostloved">
            Keep this product in most loved products
          </label>
        </div>
        <div className="featured">
          <input
            type="checkbox"
            name="featured"
            id="featuredProducts"
            checked={featured}
            onChange={(e) => handleFeautred(e)}
          />
          <label htmlFor="featuredProducts">
            Keep this product in featured products
          </label>
        </div>
        <div className="change-product-btns">
          <button className="createProduct-btn" type="submit">
            Update product
          </button>
          <button className="createProduct-btn" onClick={deleteProduct}>
            Delete product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
