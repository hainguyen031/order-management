import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IOrder } from "../interface/iOrder";
import { formatDate } from "../format/formatDate";
import { useDispatch } from "react-redux";
import { getOrderDelete } from "../features/orderSlice";
import Swal from "sweetalert2";

interface Props {
  products: IOrder[];
  handleSetRender: () => void;
}

const OrderList: React.FC<Props> = (props) => {
  const { products, handleSetRender } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/order/add");
  };
  const handleDetail = (id: string) => {
    navigate(`/order/${id}`);
  };
  const handleEdit = (id: string) => {
    navigate(`/order/edit/${id}`);
  };
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your order will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete order",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(getOrderDelete(id));
        Swal.fire("Deleted!", "This order have been cleared.", "success");
        handleSetRender();
      }
    });
  };
  return (
    <div className="mt-4">
      <div className="border bg-opacity-10 bg-body-secondary rounded-4 w-75 p-4 m-auto">
        <h3>Order list</h3>
        <table className="table table-bordered table-hover align-middle">
          <thead className="align-middle table-success">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Total Amount</th>
              <th>Customer Name</th>
              <th>Customer Address</th>
              <th>Customer Phone</th>
              <th>Created At</th>
              <th colSpan={3}>
                <button
                  type="button"
                  onClick={handleCreate}
                  className="btn btn-success"
                >
                  Create
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 ? (
              products?.map((product) => (
                <tr key={product.id}>
                  <td>{product.id} </td>
                  <td>{product.name} </td>
                  <td>{product.totalAmount} </td>
                  <td>{product.customerName} </td>
                  <td>{product.customerAddress} </td>
                  <td>{product.customerPhone} </td>
                  <td>{formatDate(product.createdAt)} </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDetail(product.id)}
                      className="btn btn-primary"
                    >
                      Detail
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleEdit(product.id)}
                      className="btn btn-success"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <th colSpan={10}>
                  <img
                    src="https://www.kpriet.ac.in/asset/frontend/images/nodata.png"
                    alt="not found"
                  ></img>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
