import React, { useContext, useEffect, useState } from "react";
import "./header.css";
import { NavLink, Link } from "react-router-dom";
import { BsFillBasket2Fill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { Badge } from "antd";
import { cartModalContext } from "../../../context/cartContext";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { handleOpenModal, cartItems, total } = useContext(cartModalContext);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [accountPath, setAccountPath] = useState("/login");
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate();
  function handleClick() {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }
  const handleLogout = () => {
    localStorage.setItem("auth", JSON.stringify({ user: null, token: "" }));
    setAuth({ user: null, token: "" });
    navigate("/");
  };
  useEffect(() => {
    if (auth?.token) {
      if (auth?.user.admin) {
        setAccountPath("/admin-account/admin-profile");
      } else if (!auth.user.admin) {
        setAccountPath("/user-account/user-profile");
      }
    } else {
      setAccountPath("/login");
    }
  }, [auth.token]);
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => (sum += parseInt(item.itemCounts)), 0);
    setTotalItems(total);
  }, [cartItems]);
  return (
    <header>
      <nav>
        <div className={open ? "navbar" : "navbar borderbottom"}>
          <div className="logo1">
            <NavLink to={"/"}>
              <img src="/assets/print-1.svg" alt="logo" />
            </NavLink>
          </div>
          <div className={open ? "nav-menu" : "nav-menu-expanded"}>
            <NavLink to={"/"}> Home </NavLink>
            <NavLink to={"/products"}> All Products </NavLink>
            <NavLink to={"/about"}> About </NavLink>
            <NavLink to={"/contact"}> Contact </NavLink>
            <div
              className="dropdown"
              onMouseEnter={() => {
                setFlag(true);
              }}
              onMouseLeave={() => {
                setFlag(false);
              }}
            >
              <NavLink to={"/#"} className="texticon">
                <span>Account</span>
                <i>
                  <RiArrowDropDownLine size={"1.5rem"} />
                </i>
              </NavLink>
              {flag && (
                <div className="dropdown-menu">
                  <ul>
                    <li>
                      <NavLink to={accountPath}>My Account</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/cart"}>Cart</NavLink>
                    </li>
                    {auth.token && (
                      <li>
                        <button
                          className="logout-btn"
                          onClick={() => handleLogout()}
                        >
                          Logout
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="cart-icons-hamburger">
            <Link
              className="texticon"
              id="cartlink"
              onClick={() => handleOpenModal()}
            >
              <span>
                {(total).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
              <i>
                <Badge
                  count={totalItems}
                  showZero
                  offset={[5, -2]}
                  style={{
                    padding: "0",
                    color: "black",
                    fontWeight: "bold",
                    fontStyle: "normal",
                    boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.3)",
                  }}
                >
                  <BsFillBasket2Fill size={"1.4rem"} color="#ff3f26" />
                </Badge>
              </i>
            </Link>
            <div className="hamburger-menu">
              <button onClick={() => handleClick()}>
                {open ? (
                  <i>
                    <IoMdClose size={"1.2rem"} style={{ margin: "0.5rem" }} />
                  </i>
                ) : (
                  <i>
                    <RxHamburgerMenu
                      size={"1.2rem"}
                      style={{ margin: "0.5rem" }}
                    />
                  </i>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
