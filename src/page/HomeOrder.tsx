import React, { useEffect, useState } from "react";
import OrderList from "../components/OrderList";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchProducts,
  selectProductSearch,
  setSuccess,
} from "../features/orderSlice";
import SearchOrder from "../components/SearchOrder";
import PaginationOrder from "../components/PaginationOrder";
import { IOrder } from "../interface/iOrder";
import { SearchData } from "../interface/iSearchData";

const HomeOrder: React.FC = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<IOrder[]>([]);
  const orderSearch = useSelector(selectProductSearch);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [render, setRender] = useState<boolean>(true);
  const [renderSearch, setRenderSearch] = useState<boolean>(true);

  const [searchData, setSearchData] = useState<SearchData>({
    keyword: "",
    pageIndex: 1,
    pageSize: 10,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchData((prevData) => ({
      ...prevData,
      keyword: orderSearch?.keyword,
      pageIndex: page,
      pageSize: orderSearch?.pageSize,
    }));
    setRender(true);
  };

  const handleSearch = (searchData: SearchData) => {
    console.log(searchData);
    dispatch(getSearchProducts(searchData));
    getListOrder();
  };

  const getListOrder = () => {
    if (products?.length === 0 || render) {
      dispatch(getSearchProducts(searchData));
    } else {
      dispatch(setSuccess(true));
    }
    setRender(false);
  };

  const getOrderSearch = () => {
    if (orderSearch || renderSearch) {
      setProducts(orderSearch?.data);
      setPageSize(orderSearch?.pageSize);
      setTotalItems(orderSearch?.total);
      setCurrentPage(orderSearch?.pageIndex);
    }
    setRenderSearch(false);
  };
  const handleSetRender = () => {
    setRender(true);
  };
  useEffect(() => {
    getListOrder();
  }, [products, currentPage, render]);

  useEffect(() => {
    getOrderSearch();
  }, [orderSearch, renderSearch]);

  return (
    <>
      <h2>ORDER MANAGEMENT</h2>
      <div className="product-list">
        <SearchOrder onSearch={handleSearch} />
        <OrderList products={products} handleSetRender={handleSetRender} />
        <PaginationOrder
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default HomeOrder;
