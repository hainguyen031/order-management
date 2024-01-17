import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { IPaginationOrder } from "../interface/iPaginationOrder";

const PaginationOrder: React.FC<IPaginationOrder> = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / pageSize));
  }, [totalItems, pageSize, currentPage]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        variant="outlined"
        onChange={handleChange}
        style={{ margin: "20px auto" }}
      />
    </Stack>
  );
};

export default PaginationOrder;
