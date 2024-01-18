import React from "react";

interface SubmitButtonProps {
  onSubmit: () => void;
}

const BtnSubmit: React.FC<SubmitButtonProps> = ({ onSubmit }) => {
  return (
    <button type="button" onClick={onSubmit} className="btn btn-primary">
      Submit
    </button>
  );
};

export default BtnSubmit;
