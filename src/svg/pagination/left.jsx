import React from "react";

const LeftArrowSvg = ({ w = 6, h = 10, c = "black" }) => {
  return (
    <>
      <svg
        width={w}
        height={h}
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.77918 1.11316L4.72168 0.0556641L0.22168 4.55566L4.72168 9.05566L5.77918 7.99816L2.34418 4.55566L5.77918 1.11316Z"
          fill={c}
          //   fill-opacity="0.87"
        />
      </svg>
    </>
  );
};

export default LeftArrowSvg;
