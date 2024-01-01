import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import React, { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { useRef } from "react";
import axios from "axios";

const Register = () => {
  const passRef1 = useRef(null);
  const passRef2 = useRef(null);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phNo, setphNo] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();
  const [cnfpassword, setcnfPassword] = useState();
  const [passError, setPassError] = useState();

  function toggleVisibilty(e) {
    e.preventDefault();
    if (e.currentTarget.name === "setpass") {
      if (passRef1.current.type === "password") {
        passRef1.current.type = "text";
      } else {
        passRef1.current.type = "password";
      }
    } else if (e.currentTarget.name === "cnfpass") {
      if (passRef2.current.type === "password") {
        passRef2.current.type = "text";
      } else {
        passRef2.current.type = "password";
      }
    }
  }

  const registerHandleSubmit = async (e) => {
    e.preventDefault();
    if (cnfpassword !== password) {
      setPassError('Password does not match');
      return ;
    }
    else{
      setPassError();
    }
    try {
      const res = await axios.post("/api/v1/auth/register", {
        fullName,
        email,
        phNo,
        gender,
        address,
        password,
      });
      alert(res.data.message);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="login__container">
        <form onSubmit={registerHandleSubmit}>
          <h2>Register</h2>
          <div className="form-elements">
            <div className="longinputs">
              <label htmlFor="fullName">
                Full Name <b className="star">*</b>
              </label>
              <br />
              <input
                type="text"
                name=""
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="longinputs">
              <label htmlFor="email">
                Email Address <b className="star">*</b>
              </label>
              <br />
              <input
                type="email"
                name=""
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="longinputs">
              <label htmlFor="phno">
                Phone Number <b className="star">*</b>
              </label>
              <br />
              <input
                type="number"
                name=""
                id="phno"
                value={phNo}
                onChange={(e) => setphNo(e.target.value)}
                required
              />
            </div>
            <div className="gender">
              <div>
                <label>
                  Gender <b className="star">*</b>
                </label>
              </div>
              <input
                type="radio"
                name="gender"
                id="male"
                onChange={(e) => setGender(e.target.value)}
                required
                value="male"
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                id="female"
                onChange={(e) => setGender(e.target.value)}
                required
                value="female"
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                name="gender"
                id="others"
                onChange={(e) => setGender(e.target.value)}
                required
                value="others"
              />
              <label htmlFor="others">Others</label>
            </div>
            <div className="longinputs">
              <label htmlFor="addr">Address</label>
              <br />
              <textarea
                name=""
                id="addr"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="longinputs">
              <label>
                Set Password <b className="star">*</b> <br />
                <input
                  type="password"
                  ref={passRef1}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <button
                className="eye"
                name="setpass"
                onClick={(e) => toggleVisibilty(e)}
              >
                <VscEye size={"1.1rem"} />
              </button>
            </div>
            <div className="longinputs">
              <label>
                Confirm Password <b className="star">*</b> <br />
                <input type="password" ref={passRef2} required value={cnfpassword} onChange={(e)=>setcnfPassword(e.target.value)} />
              </label>
              <button
                className="eye"
                name="cnfpass"
                onClick={(e) => toggleVisibilty(e)}
              >
                <VscEye size={"1.1rem"} />
              </button>
            </div>
            {passError && <div className="passError">{passError}</div>}
            <div className="checkbox">
              <input type="checkbox" name="" id="chkbox" required />
              <label htmlFor="chkbox">I agree</label>
            </div>
            <button className="login-btn" type="submit">
              Register
            </button>
            <div className="login-bottom-links">
              <Link className="register-link" to={"/login"}>
                Already have an account? Login here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
