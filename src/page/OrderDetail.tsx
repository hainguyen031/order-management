import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetail, selectOrderDetail } from "../features/orderSlice";
import { IOrderDetail } from "../interface/iOrderDetail";
import { formatDate } from "../format/formatDate";
import BtnBackList from "../components/BtnBackList";

const OrderDetail: React.FC = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const getDetail = useSelector(selectOrderDetail);
  const [orderDetail, setOrderDetail] = useState<IOrderDetail[]>([]);

  const getOrder = async () => {
    if (orderDetail?.length === 0) {
      await dispatch(getOrderDetail(orderId));
    }
    setOrderDetail(getDetail?.data?.orderDetail);
  };

  useEffect(() => {
    getOrder();
    return () => setOrderDetail([]);
  }, [orderDetail]);

  return (
    <>
      <h2>Order Detail</h2>
      {orderDetail && orderDetail.length > 0 ? (
        <div className="border bg-opacity-10 bg-secondary rounded-4 w-50 p-4 m-auto mb-4">
          <table className="table table-bordered m-auto align-middle text-start mt-4 mb-4">
            <tbody>
              {orderDetail.map((item) => (
                <React.Fragment key={item.id}>
                  <tr>
                    <th scope="row">ID</th>
                    <td>{item.id}</td>
                  </tr>
                  <tr>
                    <th scope="row">Order ID</th>
                    <td>{item.orderId}</td>
                  </tr>
                  <tr>
                    <th scope="row">Product ID</th>
                    <td>{item.productId}</td>
                  </tr>
                  <tr>
                    <th scope="row">Quantity</th>
                    <td>{item.quantity}</td>
                  </tr>
                  <tr>
                    <th scope="row">Price</th>
                    <td>{item.price}</td>
                  </tr>
                  <tr>
                    <th scope="row">Create at</th>
                    <td>{formatDate(item.createdAt)}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <BtnBackList />
    </>
  );
};

export default OrderDetail;
