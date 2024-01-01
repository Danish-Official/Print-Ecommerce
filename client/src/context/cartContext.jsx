import { createContext, useEffect, useRef, useState} from "react";
import React from "react";

export const cartModalContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const WrapperRef = useRef(null);

  const handleOpenModal = () => {
    setModalVisibility(true);
    WrapperRef.current.style.display = 'block';
    document.body.style.overflowY = "hidden";
  };
  const handleCloseModal = () => {
    setModalVisibility(false);
    setTimeout(() => {
      WrapperRef.current.style.display = 'none';
    }, 400); 
    document.body.style.overflowY = "scroll";
  };
  const deleteItem = (pid) =>{
      const newCartItems = cartItems.filter((item)=> item._id!==pid);
      setCartItems(newCartItems);
  }

  useEffect(() => {
    // Load cart items from local storage on component mount
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    // Save cart items to local storage whenever cartItems change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    const totals = cartItems.reduce(
      (sum, item) => sum + item.itemCounts * (item.discountedPrice? item.discountedPrice: item.price),
      0
    );
    setTotal(totals);
  }, [cartItems]);
  
  return (
    <cartModalContext.Provider
      value={{ handleOpenModal, handleCloseModal, modalVisibility, cartItems, setCartItems, deleteItem, WrapperRef, total}}
    >
      {children}
    </cartModalContext.Provider>
  );
};
