import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { Link, useParams } from "react-router-dom";
import { outletContext } from "../../context/outletContext";

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [listedProducts, setListedProducts] = useState([]);
  const params = useParams();
  const perPage = 6;
  const numberList = [];
  const {sortBy, setResults, setFirst, setLast, startPrice, endPrice} = useContext(outletContext);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `/api/v1/product/get-products-by-category/${params.cid}/${sortBy}`
      );
      const priceFilter = response.data.products.filter((item)=>{
        if (item.discountedPrice && item.discountedPrice >= startPrice && item.discountedPrice <= endPrice) {
          return true;
        }
        else if (item.price>= startPrice && item.price <= endPrice) {
          return true;
        }
        else return false;
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
    const skip = (pageNo-1)*perPage;
    const range = products.slice(skip, skip+6);
    setFirst(skip+1);
    setLast((productsCount<(skip + 6))?productsCount:(skip + 6));
    setListedProducts(range);
    console.log(range);
  };

  for (let i = 1; i <= Math.ceil(productsCount / perPage); i++) {
    numberList.push(
      <li key={i} onClick={() => handlePagination(i)}>
        {i}
      </li>
    );
  }
  useEffect(() => {
    getProducts();
  }, [params.cid, sortBy, startPrice, endPrice]);

  return (
    <>
      <div className="products__container">
        {listedProducts.map((p) => (
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
      <ul className="pagination-menu">
        {numberList}
        <li to={""}>
          <LiaLongArrowAltRightSolid size={"1.3rem"} />
        </li>
      </ul>
    </>
  );
};

export default CategoryProducts;
