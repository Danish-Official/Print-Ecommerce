import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/authContext";
import "../../../Styles/adminProfile.css";
import axios from "axios";
import { VscEye } from "react-icons/vsc";

const AdminProfile = () => {
  const [auth, setAuth] = useAuth();
  const passRef1 = useRef(null);
  const passRef2 = useRef(null);

  const [id, setId] = useState();
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

  const updateHandleSubmit = async (e) => {
    e.preventDefault();
    if (cnfpassword !== password) {
      setPassError("Password does not match");
      return;
    } else {
      setPassError();
    }
    try {
      const res = await axios.post("/api/v1/auth/update", {
        id,
        fullName,
        email,
        phNo,
        gender,
        address,
        password,
      });
      alert(res.data.message);
      if (res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
        });
        localStorage.setItem("auth", JSON.stringify({...auth, user: res.data.user}));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      const { _id, fullName, email, phNo, gender, address } = parsedData?.user;
      setId(_id);
      setFullName(fullName);
      setEmail(email);
      setphNo(phNo);
      setGender(gender);
      setAddress(address);
    }
  }, [auth?.user]);

  return (
    <div className="adminProfile">
      <div className="login__container">
        <form onSubmit={updateHandleSubmit}>
          <h2>Update Profile</h2>
          <div className="form-elements">
            <div className="longinputs">
              <label htmlFor="fullName">Full Name</label>
              <br />
              <input
                type="text"
                name=""
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="longinputs">
              <label htmlFor="email">Email Address</label>
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
              <label htmlFor="phno">Phone Number</label>
              <br />
              <input
                type="number"
                name=""
                id="phno"
                value={phNo}
                onChange={(e) => setphNo(e.target.value)}
              />
            </div>
            <div className="gender">
              <div>
                <label>Gender</label>
              </div>
              <input
                type="radio"
                name="gender"
                id="male"
                onChange={(e) => setGender(e.target.value)}
                value="male"
                checked={gender === "male"}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                id="female"
                onChange={(e) => setGender(e.target.value)}
                value="female"
                checked={gender === "female"}
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                name="gender"
                id="others"
                onChange={(e) => setGender(e.target.value)}
                value="others"
                checked={gender === "others"}
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
              />
            </div>
            <div className="longinputs">
              <label>
                Set Password
                <br />
                <input
                  type="password"
                  ref={passRef1}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                Confirm Password
                <br />
                <input
                  type="password"
                  ref={passRef2}
                  value={cnfpassword}
                  onChange={(e) => setcnfPassword(e.target.value)}
                />
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
            <button className="login-btn" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
