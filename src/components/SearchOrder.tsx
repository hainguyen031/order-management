import React, { useState } from "react";
import { SearchData } from "../interface/iSearchData";

interface SearchFormProps {
  onSearch: (searchData: SearchData) => void;
}

const SearchOrder: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchData, setSearchData] = useState<SearchData>({
    keyword: "",
    pageIndex: 1,
    pageSize: 10,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchData);
  };

  return (
    <form
      className="mt-4 border p-2 w-75 m-auto bg-opacity-10 bg-body-secondary rounded-4"
      onSubmit={handleSubmit}
    >
      <h3>Search Order</h3>
      <label>
        keyword:
        <input
          type="text"
          className="m-2"
          name="keyword"
          value={searchData.keyword}
          onChange={handleChange}
        />
      </label>
      <label>
        Page Index:
        <input
          type="number"
          className="m-2"
          name="pageIndex"
          value={searchData.pageIndex}
          onChange={handleChange}
        />
      </label>
      <label>
        Page Size:
        <input
          type="number"
          className="m-2"
          name="pageSize"
          value={searchData.pageSize}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="btn btn-success">
        Search
      </button>
    </form>
  );
};

export default SearchOrder;
