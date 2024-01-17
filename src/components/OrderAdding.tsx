import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ICreateOrder } from "../interface/iCreateOrder";
import { getCreateOrder } from "../features/orderSlice";
import { v4 as uuidv4 } from "uuid";
import BtnBackList from "../utilities/BtnBackList";
import BtnSubmit from "../utilities/BtnSubmit";
import Swal from "sweetalert2";

const OrderAdding: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState<ICreateOrder>({
    name: "",
    totalAmount: 0,
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    orderDetails: [
      {
        orderId: uuidv4(),
        productId: "",
        price: 0,
        quantity: 0,
      },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      orderDetails: [
        {
          ...prevData.orderDetails[0],
          [name]: value,
        },
      ],
    }));
  };

  const handleSubmit = () => {
    if (!orderData.name.trim()) {
      Swal.fire({
        icon: "error",
        title: "Name is required",
      });
      return;
    }

    if (!orderData.customerName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Customer Name is required",
      });
      return;
    }

    if (!orderData.customerPhone.trim()) {
      Swal.fire({
        icon: "error",
        title: "Customer Phone is required",
      });
      return;
    }

    if (!orderData.customerAddress.trim()) {
      Swal.fire({
        icon: "error",
        title: "Customer Address is required",
      });
      return;
    }

    if (!orderData.orderDetails[0].productId.trim()) {
      Swal.fire({
        icon: "error",
        title: "Product ID is required",
      });
      return;
    }

    if (orderData.orderDetails[0].price <= 0) {
      Swal.fire({
        icon: "error",
        title: "Price must be greater than 0",
      });
      return;
    }

    if (orderData.orderDetails[0].quantity <= 0) {
      Swal.fire({
        icon: "error",
        title: "Quantity must be greater than 0",
      });
      return;
    }
    dispatch(getCreateOrder(orderData));
    Swal.fire({
      icon: "success",
      title: "Create new order successful",
    });
    navigate("/");
  };

  useEffect(() => {
    const calculateTotalAmount = () => {
      const { price, quantity } = orderData.orderDetails[0];
      const totalAmount = price * quantity;
      setOrderData((prevData) => ({
        ...prevData,
        totalAmount,
      }));
    };

    calculateTotalAmount();
  }, [orderData.orderDetails[0].price, orderData.orderDetails[0].quantity]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Order Add</h1>
      <form className="w-75 m-auto border p-4 mt-4 rounded-4 bg-opacity-10 bg-secondary">
        <div className="input-group mb-3">
          <label className="input-group-text" style={{ width: 150 }}>
            Name
          </label>
          <input name="name" className="form-control" onChange={handleChange} />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" style={{ width: 150 }}>
            Customer Name
          </label>
          <input
            name="customerName"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" style={{ width: 150 }}>
            Customer Phone
          </label>
          <input
            name="customerPhone"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" style={{ width: 150 }}>
            Customer Address
          </label>
          <input
            name="customerAddress"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <p className="detail text-start m-2">Order Details</p>
        <div className="input-group mb-3">
          <label className="input-group-text" style={{ width: 150 }}>
            Product Id
          </label>
          <input
            name="productId"
            className="form-control"
            onChange={handleDetailChange}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" style={{ width: 150 }}>
            Price
          </label>
          <input
            name="price"
            type="number"
            className="form-control"
            onChange={handleDetailChange}
          />
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" style={{ width: 150 }}>
            Quantity
          </label>
          <input
            name="quantity"
            type="number"
            className="form-control"
            onChange={handleDetailChange}
          />
        </div>
        <div className="btnCSS">
          <BtnBackList />
          &nbsp;
          <BtnSubmit onSubmit={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default OrderAdding;
