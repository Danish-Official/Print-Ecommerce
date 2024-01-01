import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { outletContext } from "../../context/outletContext";

const Products = () => {
  const { sortBy, setResults, setFirst, setLast, startPrice, endPrice } =
    useContext(outletContext);
  const [listedProducts, setListedProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const perPage = 6;
  const numberList = [];
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `/api/v1/product/get-products/${sortBy}`
      );
      const priceFilter = response.data.Products.filter((item) => {
        if (
          item.discountedPrice &&
          item.discountedPrice >= startPrice &&
          item.discountedPrice <= endPrice
        ) {
          return true;
        } else if (item.price >= startPrice && item.price <= endPrice) {
          return true;
        } else return false;
      });
      const range = priceFilter.slice(0, perPage);
      setFirst(1);
      setLast(perPage);
      setListedProducts(range);
      setProducts(priceFilter);
      setResults(priceFilter.length);
      const count = parseInt(priceFilter.length);
      setProductsCount(count);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePagination = (pageNo) => {
    const skip = (pageNo - 1) * perPage;
    const range = products.slice(skip, skip + 6);
    setFirst(skip + 1);
    setLast(productsCount < skip + 6 ? productsCount : skip + 6);
    setListedProducts(range);
    console.log(range);
  };
  for (let i = 1; i <= Math.ceil(productsCount / perPage); i++) {
    numberList.push(
      <li
        key={i}
        onClick={() => {
          setCurrentPage(i);
          handlePagination(i);
        }}
      >
        {i}
      </li>
    );
  }
  useEffect(() => {
    getProducts();
  }, [sortBy, startPrice, endPrice]);

  return (
    <>
      <div className="products__container">
        {listedProducts.map((p) => (
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
      <ul className="pagination-menu">
        {numberList}
        {currentPage < Math.ceil(productsCount / perPage) && (
          <li onClick={() => {setCurrentPage(currentPage + 1); handlePagination(currentPage + 1)}}>
            <LiaLongArrowAltRightSolid size={"1.3rem"} />
          </li>
        )}
      </ul>
    </>
  );
};

export default Products;
