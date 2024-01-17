import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeOrder from '../page/HomeOrder';
import OrderDetail from '../components/OrderDetail';
import OrderAdding from '../components/OrderAdding';
import OrderEditing from '../components/OrderEditing';


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