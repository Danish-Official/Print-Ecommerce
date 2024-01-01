import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import "../../../Styles/adminAccount.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AiOutlineRightCircle } from "react-icons/ai";
import axios from "axios";
import Spinner from "../../Spinner";
import { useAuth } from "../../../context/authContext";

const AdminAccount = () => {
  const liInfo = [
    { Name: "Admin Profile", path: "/admin-account/admin-profile" },
    { Name: "Create Category", path: "/admin-account/create-category" },
    { Name: "Create Product", path: "/admin-account/create-product" },
    { Name: "Products", path: "/admin-account/admin-products" },
    { Name: "Orders", path: "/admin-account/admin-orders" },
  ];
  const [activeItem, setActiveItem] = useState();
  const [ok, setOk] = useState();
  const [auth, setAuth] = useAuth();

  const activeLi = (index) => {
    setActiveItem(index);
  };
  const adminAuth = async () => {
    try {
      const response = await axios.get(
        `/api/v1/auth/admin-auth`
      );
      if (response.status === 200) {
        setOk(true);
      } else {
        setOk(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) {
      adminAuth();
    }
  }, [auth?.token]);
  return (
    <Layout>
      {ok ? (
        <div className="adminAccount">
          <div className="adminPanel">
            <ul>
              {liInfo.map((Item, index) => (
                <li
                  key={index}
                  onClick={() => activeLi(index)}
                  className={activeItem === index && "activeList"}
                >
                  <NavLink to={Item.path}>{Item.Name}</NavLink>
                  {activeItem === index && (
                    <i>
                      <AiOutlineRightCircle size={"1.5rem"} />
                    </i>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="adminAccount-content">
            <Outlet />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

export default AdminAccount;
