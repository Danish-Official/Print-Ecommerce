import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Styles/order.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const response = await axios.get("/api/v1/order/get-adminOrders");
      if (response.status === 200) {
        setOrders(response.data.orders);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleStatusChange = async (e, oid) => {
    const value = e.target.value;
    try {
      const response = await axios.put("/api/v1/order/set-order-status", {
        oid,
        value,
      });
      if (response.status === 200) {
        getOrders();
        alert("Status changed successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendMail = async (mail, name, status) => {
    try {
      console.log(mail, name, status);
      const res = await axios.post(`/api/v1/mail/send-mail`, {
        userEmail: mail,
        userName: name,
        status: status,
      });
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
              <th>Buyer name</th>
              <th>product/s</th>
            </tr>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="srno">
                  <span>{index + 1}.</span>
                </td>
                <td>
                  <select
                    name=""
                    id=""
                    value={order.status}
                    onChange={(e) => {
                      handleStatusChange(e, order._id);
                      sendMail(
                        order.buyer.email,
                        order.buyer.fullName,
                        e.target.value
                      );
                    }}
                  >
                    <option value="Yet to dispatch">Yet to dispatch</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Arrived">Arrived</option>
                  </select>
                </td>
                <td>{order.buyer.fullName}</td>
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

export default Orders;
