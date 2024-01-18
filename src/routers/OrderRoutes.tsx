import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeOrder from '../page/HomeOrder';
import OrderDetail from '../page/OrderDetail';
import OrderAdding from '../page/OrderAdding';
import OrderEditing from '../page/OrderEditing';


const OrderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeOrder />} />
        <Route path={`/order/:orderId`} element={<OrderDetail />} />
        <Route path={"/order/add"} element={<OrderAdding />} />
        <Route path={`/order/edit/:orderId`} element={<OrderEditing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default OrderRoutes;