import React from "react";

const RightAll = ({ w = 10, h = 10, c = "black" }) => {
  return (
    <svg
      width={h}
      height={h}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 9.05566L6.875 4.55566L0.5 0.0556641V9.05566ZM8 0.0556641V9.05566H9.5V0.0556641H8Z"
        fill={c}
        // fill-opacity="0.87"
      />
    </svg>
  );
};

export default RightAll;
