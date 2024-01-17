import axios from "axios";
import { SearchData } from "../interface/iSearchData";
import { ICreateOrder } from "../interface/iCreateOrder";
import { IOrder } from "../interface/iOrder";

const ORDER_API = "https://tuyendung-api.bakco.vn/api/Order";

export const findOrder = async () => {
  let result = null;
  try {
    result = await axios.get(`${ORDER_API}`);
  } catch (e) {
    console.log("Find order API error: " + e);
  }
  return result;
};

export const searchProducts = async (searchData: SearchData) => {
  let result = null;
  try {
    result = await axios.get(
      `${ORDER_API}?keyword=${searchData.keyword}&pageIndex=${searchData.pageIndex}&pageSize=${searchData.pageSize}`
    );
  } catch (e) {
    console.log("Search order API error: " + e);
  }
  return result;
};

export const orderDetail = async (orderID: string) => {
  let result = null;
  try {
    result = await axios.get(`${ORDER_API}/GetById?id=${orderID}`);
  } catch (e) {
    console.log("order detail API error: " + e);
  }
  return result;
};

export const deleteOrder = async (orderID: string) => {
  let result = null;
  try {
    result = await axios.delete(`${ORDER_API}?id=${orderID}`);
  } catch (e) {
    console.log("Delete order API error: " + e);
  }
  return result;
};

export const createOrder = async (order: ICreateOrder) => {
  let result = null;
  try {
    result = await axios.post(ORDER_API, order);
  } catch (e) {
    console.error("Create Order Error: ", e);
  }
  return result;
};

export const editOrder = async (order: IOrder) => {
  let result = null;
  try {
    result = await axios.put(ORDER_API, order);
  } catch (e) {
    console.error("Create Order Error: ", e);
  }
  return result;
};