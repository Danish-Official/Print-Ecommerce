import React, { useContext, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { SlClose } from "react-icons/sl";
import PriceStyle from "./PriceStyle";
import PaymentModal from "./PaymentModal";
import "../Styles/cartModal.css";
import { Link } from "react-router-dom";
import { cartModalContext } from "../context/cartContext";

const CartModal = () => {
  const { handleCloseModal, modalVisibility, cartItems, deleteItem, WrapperRef, total} =
    useContext(cartModalContext);
  const [active, setActive] = useState(false);

  const handleClose = () => {
    setActive(false); 
    document.body.style.overflowY = "scroll";
  };
  const handleOpen = () => {
    setActive(true);
    document.body.style.overflowY = "hidden";
  };
  return (
    <>
      <div
        className="modalWrapper"
        onClick={() => handleCloseModal()}
        ref={WrapperRef}
      ></div>
      <div className = {modalVisibility ? 'cartModal' : 'cartModal modal-closed'}>
        <div className="cart-header">
          <span>Shopping Cart</span>
          <button onClick={() => handleCloseModal()} className="closeModal-btn">
            <MdClose size={"1.5rem"} />
          </button>
        </div>
        <hr />
        <div className="cart-body">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <Link to={"/product/slug"}>
                  <span className="shoppingCartItem-img">
                    <img
                      src={`/api/v1/product/getproductphoto/${item._id}`}
                      alt=""
                    />
                  </span>
                </Link>
                <div className="shoppingCartItem-details">
                  <div className="name-delete">
                    <Link to={"/product/slug"} className="item-name">
                      {item.name}
                    </Link>
                    <span className="delete-item-btn">
                      <button onClick={() => deleteItem(item._id)}>
                        <SlClose size={"1.3rem"} />
                      </button>
                    </span>
                  </div>
                  <div className="quantity-price">
                    {item.itemCounts} x <PriceStyle price={item.discountedPrice? item.discountedPrice: item.price} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cart-footer">
          <hr />
          <div className="subtotal">
            <span>Subtotal:</span>
            <span>
              <PriceStyle price={total} />
            </span>
          </div>
          <hr />
          <div className="viewCart-btn">
            <Link to={"/cart"}>
              <button className="buttonComp" onClick={() => handleCloseModal()}>
                view cart
              </button>
            </Link>
          </div>
          <div className="checkout-btn">
            <button className="buttonComp" onClick={() => handleOpen()}>
              proceed to checkout
            </button>
          </div>
        </div>
      </div>
      <PaymentModal handleClose={handleClose} active={active} />
    </>
  );
};
export default CartModal;
