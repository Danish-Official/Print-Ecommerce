import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import "../../Styles/login.css";
import React, { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { useRef } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const passRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [auth, setAuth] = useAuth();

  function toggleVisibilty(e) {
    e.preventDefault();
    if (passRef.current.type === "password") {
      passRef.current.type = "text";
    } else {
      passRef.current.type = "password";
    }
  }
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/auth/login", { email, password });
      alert(response.data.message);
      if (response.data.success) {
        setAuth({
          ...auth,
          user: response.data.auth.user,
          token: response.data.auth.token,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: response.data.auth.user,
            token: response.data.auth.token,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="login__container">
        <form onSubmit={handleLoginSubmit}>
          <h2>Login</h2>
          <div className="form-elements">
            <div className="longinputs">
              <label htmlFor="email">
                Username or email address <b className="star">*</b>
              </label>
              <br />
              <input
                type="email"
                name=""
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="longinputs">
              <label>
                Password <b className="star">*</b> <br />
                <input
                  ref={passRef}
                  type="password"
                  name=""
                  id=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button className="eye" onClick={(e) => toggleVisibilty(e)}>
                <VscEye size={"1.1rem"} />
              </button>
            </div>
            <div className="checkbox">
              <input type="checkbox" name="" id="chkbox" />
              <label htmlFor="chkbox">Remember me</label>
            </div>
            <button className="login-btn" type="submit">
              Log in
            </button>
            <div className="login-bottom-links">
              <Link className="lost">Lost your password?</Link>
              <Link className="register-link" to={"/register"}>
                Don't have an account? Register here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
