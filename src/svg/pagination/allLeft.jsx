import React from "react";

const AllLeftArrow = ({ w = 10, h = 10, c = "black" }) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 0.0556641H2V9.05566H0.5V0.0556641ZM3.125 4.55566L9.5 9.05566V0.0556641L3.125 4.55566Z"
        fill={c}
        // fill-opacity="0.87"
      />
    </svg>
  );
};

export default AllLeftArrow;
