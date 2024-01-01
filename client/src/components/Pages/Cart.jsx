import RedButton from "../Button";
import Layout from "../Layout/Layout";
import PriceStyle from "../PriceStyle";
import { Link } from "react-router-dom";
import "../../Styles/cart.css";
import { SlClose } from "react-icons/sl";
import { cartModalContext } from "../../context/cartContext";
import { useContext, useEffect, useState } from "react";
import PaymentModal from "../PaymentModal";

const Cart = () => {
  const { cartItems, setCartItems, deleteItem, total } = useContext(cartModalContext);
  const [tempArray, setTempArray] = useState(0);
  const [active, setActive] = useState(false);

  const handleClose = () => {
    setActive(false);
    document.body.style.overflowY = "scroll";
  };
  const handleOpen = () => {
    setActive(true);
    document.body.style.overflowY = "hidden";
  };

  const handleTempArray = (e, index) => {
    const newArray = [...tempArray];
    newArray[index] = parseInt(e.target.value);
    setTempArray(newArray);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCartItems = cartItems.map((item, index) => ({
      ...item,
      itemCounts: tempArray[index],
    })).filter((item)=> item.itemCounts>0);

    setCartItems(newCartItems);
    console.log(newCartItems);
  };
  const handleDeleteItem = (pid) => {
    deleteItem(pid);
  };
  useEffect(() => {
    const newArray1 = cartItems.map((item) => item.itemCounts);
    setTempArray(newArray1);
  }, [cartItems]);
  return (
    <Layout>
      <div className="cartPage">
        <div className="cart__container">
          <div className="product-table">
            <table cellSpacing={"0"}>
              <tr className="header-row">
                <th></th>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td className="deleteProd-btn">
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="delete-item-btn"
                    >
                      <i>
                        <SlClose size={"1.3rem"} />
                      </i>
                    </button>
                  </td>
                  <td>
                    <Link to={"/product/slug"}>
                      <span className="cart-productImg">
                        <img
                          src={`/api/v1/product/getproductphoto/${item._id}`}
                          alt=""
                        />
                      </span>
                    </Link>
                  </td>
                  <td data-aria-label="Product:">
                    <Link className="cart-productName" to={"/product/slug"}>
                      {item.name}
                    </Link>
                  </td>
                  <td data-aria-label="Price:">
                    <PriceStyle price={item.discountedPrice? item.discountedPrice: item.price} />
                  </td>
                  <td data-aria-label="Quantity:">
                    <input
                      type="number"
                      min={0}
                      className="quantityInput"
                      defaultValue={item.itemCounts}
                      value={tempArray[index]}
                      onChange={(e) => handleTempArray(e, index)}
                    />
                  </td>
                  <td data-aria-label="Subtotal:">
                    <PriceStyle price={(item.discountedPrice? item.discountedPrice: item.price) * item.itemCounts} />
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={"6"}>
                  <div className="last-row">
                    <span className="coupon">
                      <input type="text" placeholder="Coupon code" />
                      <RedButton text={"apply coupon"} />
                    </span>
                    <span className="update-cart-btn">
                      <button
                        className="buttonComp"
                        onClick={(e) => handleSubmit(e)}
                      >
                        update cart
                      </button>
                    </span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div className="cart-totals">
            <table cellSpacing={"0"}>
              <th colSpan={"2"}>Cart totals</th>
              <tr>
                <td>Subtotal</td>
                <td>
                  <PriceStyle price={total} />
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td>
                  <PriceStyle price={total} />
                </td>
              </tr>
              <tr>
                <td colSpan={"2"} className="proceed-btn">
                  <button className="buttonComp" onClick={() => handleOpen()}>
                    proceed to checkout
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <PaymentModal handleClose={handleClose} active={active} />
    </Layout>
  );
};

export default Cart;
