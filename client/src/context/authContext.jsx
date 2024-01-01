import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedAuth, setLoggedAuth] = useState(null);
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  axios.defaults.headers.common["Authorization"] = auth?.token;
  useEffect(() => { //for page refresh purpose
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parsedData.user,
        token: parsedData.token,
      });
      setLoggedAuth(parsedData);
    }
  }, []);
  return (
    <authContext.Provider value={[auth, setAuth]}>
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => useContext(authContext);

export default AuthContextProvider;
