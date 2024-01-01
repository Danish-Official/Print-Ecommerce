import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import "../../../Styles/adminAccount.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AiOutlineRightCircle } from "react-icons/ai";
import axios from "axios";
import Spinner from "../../Spinner";
import { useAuth } from "../../../context/authContext";

const UserAccount = () => {
  const liInfo = [
    { Name: "User Profile", path: "/user-account/user-profile" },
    { Name: "Orders", path: "/user-account/user-orders" },
  ];
  const [activeItem, setActiveItem] = useState();
  const [ok, setOk] = useState();
  const [auth] = useAuth();

  const activeLi = (index) => { 
    setActiveItem(index);
  };
  const userAuth = async () => {
    try {
      console.log('User auth function');
      const response = await axios.get(
        `/api/v1/auth/user-auth`
      );
      if (response.data.ok) {
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
      userAuth();
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

export default UserAccount;
