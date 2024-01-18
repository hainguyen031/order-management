import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BtnBackList from "../components/BtnBackList";
import { useDispatch, useSelector } from "react-redux";
import {
  getEditOrder,
  getOrderDetail,
  selectOrderDetail,
} from "../features/orderSlice";
import { IOrder } from "../interface/iOrder";
import BtnSubmit from "../components/BtnSubmit";
import Swal from "sweetalert2";

const OrderEditing = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const getDetail = useSelector(selectOrderDetail);
  const [orderDetail, setOrderDetail] = useState<IOrder>();
  const [orderData, setOrderData] = useState<IOrder>({
    id: "",
    name: "",
    totalAmount: 0,
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    createdAt: "",
  });

  useEffect(() => {
    if (orderDetail === undefined) {
      dispatch(getOrderDetail(orderId));
    }
  }, []);

  const getOrderEdit = () => {
    if (getDetail !== null && getDetail.data !== null) {
      setOrderData(getDetail?.data?.order);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getOrderEdit();
    setOrderDetail(getDetail?.data?.order);
    return () => setOrderDetail(undefined);
  }, [orderDetail, getDetail]);

  const handleSubmit = () => {
    if (!orderData.name || orderData.name.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Name is required",
      });
      return;
    }

    if (!orderData.totalAmount || orderData.totalAmount <= 0) {
      Swal.fire({
        icon: "error",
        title: "Total Amount must be greater than 0",
      });
      return;
    }
    dispatch(getEditOrder(orderData));
    Swal.fire({
      icon: "success",
      title: "Edit order successful",
    });
    navigate("/");
  };

  return (
    <div>
      <h2>Order Editing</h2>
      {orderDetail ? (
        <form className="w-75 m-auto border p-4 mt-4 rounded-4 bg-opacity-10 bg-secondary ">
          <div className="input-group mb-3">
            <label className="input-group-text" style={{ width: 150 }}>
              Name
            </label>
            <input
              name="name"
              className="form-control"
              value={orderData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" style={{ width: 150 }}>
              Total Amount
            </label>
            <input
              name="totalAmount"
              type="number"
              className="form-control"
              value={orderData.totalAmount}
              onChange={handleChange}
            />
          </div>

          <div className="input-group mb-3">
            <label className="input-group-text" style={{ width: 150 }}>
              Customer Name
            </label>
            <input
              name="customerName"
              className="form-control"
              value={orderData.customerName}
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
              value={orderData.customerPhone}
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
              value={orderData.customerAddress}
              onChange={handleChange}
            />
          </div>
          <div className="btnCSS">
            <BtnBackList />
            &nbsp;
            <BtnSubmit onSubmit={handleSubmit} />
          </div>
        </form>
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default OrderEditing;
