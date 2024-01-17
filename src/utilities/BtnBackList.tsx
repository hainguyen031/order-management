import React from "react";
import { useNavigate } from "react-router-dom";

const BtnBackList: React.FC = () => {
  const navigate = useNavigate();

  return (
      <button
        type="button"
        onClick={() => navigate("/")}
        className="btn bg-danger"
      >
        Back
      </button>
  );
};

export default BtnBackList;
