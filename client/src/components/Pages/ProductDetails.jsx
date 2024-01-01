import React, { useContext, useEffect } from "react";
import Layout from "../Layout/Layout";
import PriceStyle from "../PriceStyle";
import RedButton from "../Button";
import { NavLink, Link, useParams } from "react-router-dom";
import "../../Styles/productDetails.css";
import { useState, useRef } from "react";
import StarRating from "../StarRating";
import ProductCard from "../ProductCard";
import axios from "axios";
import { cartModalContext } from "../../context/cartContext";

const ProductDetails = () => {
  const [productQuantity, setProductQuantity] = useState(1);
  const [enableDesc, setEnableDesc] = useState(true);
  const navRef1 = useRef();
  const navRef2 = useRef();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState();
  const params = useParams();
  const { cartItems, setCartItems } = useContext(cartModalContext);
  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [categoryId, setCategoryId] = useState();

  const addToCart = () => {
    const existingItem = cartItems.find(
      (item) => item._id === productDetails._id
    );
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item._id === productDetails._id
          ? {
              ...item,
              itemCounts: Number(item.itemCounts) + Number(productQuantity),
            }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([
        ...cartItems,
        { ...productDetails, itemCounts: productQuantity },
      ]);
    }
  };

  const handleClick = (e) => {
    if (e.target.name === "reviews") {
      setEnableDesc(false);
      navRef2.current.classList.add("activeTab");
      navRef1.current.classList.remove("activeTab");
    } else {
      setEnableDesc(true);
      navRef2.current.classList.remove("activeTab");
      navRef1.current.classList.add("activeTab");
    }
  };

  const getSingleProduct = async () => {
    try {
      const response = await axios.get(
        `/api/v1/product/get-singleProduct/${params.pid}`
      );
      const { name, description, cid, price, discountedPrice } =
        response.data.product;
      console.log(response.data.product);
      setCategoryId(cid._id);
      setTitle(name);
      setCategoryName(cid.name);
      setDescription(description);
      setPrice(discountedPrice ? discountedPrice : price);
      setProductDetails(response.data.product);
      getRelatedProducts(cid._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getRelatedProducts = async (categoryId) => {
    try {
      const response = await axios.get(
        `/api/v1/product/get-related-products/${categoryId}/${params.pid}`
      );
      setRelatedProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navRef1.current.classList.add("activeTab");
    getSingleProduct();
  }, [params.pid]);

  return (
    <Layout>
      <div className="productDetailsPage__container">
        <div className="productDetails__card">
          <div className="productDetails__content">
            <div className="productDetails__section">
              <div className="product-img__container">
                <div className="product-img">
                  <img
                    src={`/api/v1/product/getproductphoto/${params.pid}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="product-details">
                <h1 className="product-title">{title}</h1>
                <div className="price-shipping">
                  <span className="price">
                    <PriceStyle price={price} />
                  </span>
                  <span> + Free Shipping</span>
                </div>
                <p>{description}</p>
                <div className="input-btn">
                  <input
                    type="number"
                    min={1}
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                  />
                  <span onClick={() => addToCart()}>
                    <RedButton text={"add to cart"} />
                  </span>
                </div>
                <div className="divider-rule"></div>
                <div className="product-category">
                  Category: <Link>{categoryName}</Link>
                </div>
              </div>
            </div>
            <div className="divider-rule"></div>
            <div className="description-reviews">
              <ul>
                <li>
                  <NavLink
                    className="description-btn"
                    onClick={handleClick}
                    ref={navRef1}
                  >
                    Description
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    name="reviews"
                    className="reviews-btn"
                    onClick={handleClick}
                    ref={navRef2}
                  >
                    Reviews (0)
                  </NavLink>
                </li>
              </ul>
              {enableDesc ? (
                <div className="description-content" id="description-content">
                  Neque porro quisquam est, qui dolore ipsum quia dolor sit
                  amet, consectetur adipisci velit, sed quia non incidunt lores
                  ta porro ame. numquam eius modi tempora incidunt lores ta
                  porro ame.
                </div>
              ) : (
                <div className="reviews-content" id="reviews-content">
                  <div className="reviewsCount">There are no reviews yet.</div>
                  <form className="submitReview-form">
                    <div className="beTheFirst">
                      Be the first to review “Father's Day Coffee Mug”
                    </div>
                    <div>
                      Your email address will not be published. Required fields
                      are marked *
                    </div>
                    <div className="yourRating">
                      Your rating * <StarRating />
                    </div>
                    <div className="yourReview">
                      <label htmlFor="yourReview">Your review *</label>
                      <textarea id="yourReview" rows="3"></textarea>
                    </div>
                    <div className="yourNameAndEmail">
                      <div className="reviewerName">
                        <label htmlFor="reviewerName">Name *</label>
                        <input type="text" id="reviewerName" />
                      </div>
                      <div className="reviewerEmail">
                        <label htmlFor="reviewerEmail">Email *</label>
                        <input type="email" id="reviewerEmail" />
                      </div>
                    </div>
                    <div className="reveiwerConsent">
                      <input type="checkbox" id="reveiwerConsent" />
                      <label htmlFor="reveiwerConsent">
                        Save my name, email, and website in this browser for the
                        next time I comment.
                      </label>
                    </div>
                    <span className="submit-btn">
                      <RedButton text={"submit"} />
                    </span>
                  </form>
                </div>
              )}
            </div>
            <div className="relatedProducts__container">
              <h2>Related products</h2>
              <div className="relatedProducts">
                {relatedProducts.map((p) => (
                  <Link to={`/product/${p._id}`} key={p._id}>
                    <ProductCard
                      pid={p._id}
                      cid={p.cid._id}
                      productName={p.name}
                      price={p.price}
                      discountedPrice={p.discountedPrice}
                      sale={p.sale}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
