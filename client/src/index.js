import ReactDom from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartContextProvider } from "./context/cartContext";
import { OutletContextProvider } from "./context/outletContext";
import AuthContextProvider from "./context/authContext";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <OutletContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </OutletContextProvider>
  </AuthContextProvider>
);
