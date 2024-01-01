import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../Layout/Layout";
import { Link, NavLink, Outlet } from "react-router-dom";
import ProductCard from "../ProductCard";
import "../../Styles/allProducts.css";
import PriceStyle from "../PriceStyle";
import axios from "axios";
import { outletContext } from "../../context/outletContext";

const AllProducts = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [resetVisible, setResetVisible] = useState(false);
  const [groupedProducts, setGroupedProducts] = useState([]);
  const [hotDeals, setHotDeals] = useState([]);
  const minValRef = useRef();
  const maxValRef = useRef();
  const rangeMin = 0;
  const rangeMax = 10000;
  const rangeSteps = 1000;
  const progressRef = useRef();
  const { setSortBy, results, first, last, setStartPrice, setEndPrice } =
    useContext(outletContext);

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const getHotDeals = async () => {
    try {
      const response = await axios.get(
        `/api/v1/product/get-products/'Default sorting'`
      );
      const hotDeals1 = response.data.Products.filter((item) => item.sale);
      setHotDeals(hotDeals1);
    } catch (error) {
      console.log(error);
    }
  };
  const getGroupedProducts = async () => {
    try {
      const response = await axios.get("/api/v1/product/get-grouped-products");
      setGroupedProducts(response.data.groupedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMinValue(parseInt(minValRef.current.min));
    setMaxValue(parseInt(maxValRef.current.max));
    progressRef.current.style.left = 0;
    progressRef.current.style.right = 0;
    setStartPrice(rangeMin);
    setEndPrice(rangeMax);
    getGroupedProducts();
    getHotDeals();
  }, []);

  function handleChange(e) {
    if (
      maxValRef.current.value !== maxValRef.current.max ||
      minValRef.current.value !== minValRef.current.min
    ) {
      setResetVisible(true);
    } else {
      setResetVisible(false);
    }
    if (
      maxValRef.current.value <= rangeMin ||
      minValRef.current.value >= rangeMax
    ) {
      return;
    }
    if (maxValRef.current.value - minValRef.current.value < rangeSteps) {
      if (maxValRef.current.value < maxValue) {
        setMinValue(parseInt(minValRef.current.value) - rangeSteps);
        progressRef.current.style.left =
          ((parseInt(minValRef.current.value) - rangeSteps - rangeMin) * 100) /
            (rangeMax - rangeMin) +
          "%";
      } else if (minValRef.current.value > minValue) {
        setMaxValue(parseInt(maxValRef.current.value) + rangeSteps);
        progressRef.current.style.right =
          ((rangeMax - (parseInt(maxValRef.current.value) + rangeSteps)) *
            100) /
            (rangeMax - rangeMin) +
          "%";
      }
    } else {
      if (e.target === minValRef.current) {
        setMinValue(parseInt(e.target.value));
        progressRef.current.style.left =
          ((parseInt(e.target.value) - rangeMin) * 100) /
            (rangeMax - rangeMin) +
          "%";
      } else {
        setMaxValue(parseInt(e.target.value));
        progressRef.current.style.right =
          ((rangeMax - parseInt(e.target.value)) * 100) /
            (rangeMax - rangeMin) +
          "%";
      }
    }
  }

  return (
    <Layout>
      <div className="allProducts__container">
        <div className="area__container">
          <div className="widget-area">
            <h3>Filter by price</h3>
            <div className="slider">
              <div className="progress" ref={progressRef}></div>
            </div>
            <div className="input-range">
              <input
                type="range"
                ref={minValRef}
                min={rangeMin}
                max={rangeMax}
                step={rangeSteps}
                value={minValue}
                onChange={handleChange}
              />
              <input
                type="range"
                ref={maxValRef}
                min={rangeMin}
                max={rangeMax}
                step={rangeSteps}
                value={maxValue}
                onChange={handleChange}
              />
            </div>
            <div className="display-value">
              <span className="minValue">
                <PriceStyle price={minValue} />
              </span>
              <span className="maxValue">
                <PriceStyle price={maxValue} />
              </span>
            </div>
            <div className="filterbtn">
              {resetVisible && (
                <div className="resetbtn">
                  <button
                    className="buttonComp"
                    onClick={() => {
                      setMinValue(rangeMin);
                      setMaxValue(rangeMax);
                      setStartPrice(rangeMin);
                      setEndPrice(rangeMax);
                      progressRef.current.style.left = 0;
                      progressRef.current.style.right = 0;
                      setResetVisible(false);
                    }}
                  >
                    reset
                  </button>
                </div>
              )}
              <div className="applybtn">
                <button
                  className="buttonComp"
                  onClick={() => {
                    setStartPrice(minValue);
                    setEndPrice(maxValue);
                  }}
                >
                  apply
                </button>
              </div>
            </div>
            <div className="categories">
              <h3>Categories</h3>
              {groupedProducts.map((product, index) => (
                <div className="category" key={index}>
                  <Link to={`/products/${product.cid[0]}`}>
                    {product.categoryName}
                  </Link>
                  <span>({product.categoryCount})</span>
                </div>
              ))}
            </div>
            <div className="hottest-deals">
              <h3>Hottest Deals</h3>
              <div className="hottest-deals__products">
                {hotDeals.map((p) => (
                  <Link to={`/product/${p._id}`} key={p._id}>
                    <ProductCard
                      pid={p._id}
                      cid={p.cid}
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
          <div className="area-seperator"></div>
          <div className="content-area">
            <div className="shop-path">
              <Link to={"/"}>Home</Link>
              <span> / Shop</span>
            </div>
            <h1>Shop</h1>
            <div className="sorting__container">
              <span className="results">
                Showing{" "}
                {results <= 6
                  ? `all ${results}`
                  : `${first}-${last} of ${results}`}{" "}
                results
              </span>
              <span className="sort-dropdown">
                <select name="" id="" onChange={(e) => handleSort(e)}>
                  <option value="Default sorting">Default sorting</option>
                  <option value="popularity">Sort by popularity</option>
                  <option value="average rating">Sort by average rating</option>
                  <option value="latest">Sort by latest</option>
                  <option value="price: low to high">
                    Sort by price: low to high
                  </option>
                  <option value="price: high to low">
                    Sort by price: high to low
                  </option>
                </select>
              </span>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
