import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Styles/order.css";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const response = await axios.get("/api/v1/order/get-orders");
      if (response.status === 200) {
        setOrders(response.data.orders);
        console.log(response.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="adminOrders">
      {orders.length ? (
        <div className="scrollOrders">
          <table cellSpacing={0}>
            <tr>
              <th>Sr. no.</th>
              <th>Order status</th>
              <th>product/s</th>
            </tr>
            {orders.map((order, index) => (
              <tr>
                <td className="srno">
                  <span>{index + 1}.</span>
                </td>
                <td className="status">
                  <span>{order.status}</span>
                </td>
                <td>
                  {order?.products?.map((p, i) => (
                    <div className="card-item">
                      <div className="card-img">
                        <img
                          src={`/api/v1/product/getproductphoto/${p._id}`}
                          alt=""
                        />
                      </div>
                      <div className="card-text">{p.name}</div>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <h2 className="noOrder">No orders available!!☹️</h2>
      )}
    </div>
  );
};

export default UserOrders;
