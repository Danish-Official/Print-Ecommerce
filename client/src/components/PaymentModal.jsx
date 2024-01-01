import React, { useContext, useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { cartModalContext } from "../context/cartContext";
import "../Styles/paymentModal.css";
import { Navigate, useNavigate } from "react-router-dom";

const PaymentModal = ({ active, handleClose }) => {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [auth, setAuth] = useAuth();
  const { cartItems, setCartItems } = useContext(cartModalContext);
  const navigate = useNavigate();
  const getToken = async () => {
    try {
      const response = await axios.get("/api/v1/order/braintree/token");
      if (response.status === 200) {
        setClientToken(response.data.clientToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth.token]);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/order/braintree/payment", {
        nonce,
        cartItems,
      });
      localStorage.removeItem("cartItems");
      setCartItems([]);
      handleClose();
      alert("Payment Completed Successfully ");
      navigate("/user-account/user-orders");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={active && "paymentModal-Wrapper"}
        onClick={() => handleClose()}
      ></div>
      <div className={active && "dropIn"}>
        {active && (
          <>
            <DropIn
              options={{
                authorization: clientToken,
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <button className="buttonComp" onClick={()=>handlePayment()}>
              Make payment
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default PaymentModal;
