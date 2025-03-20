import React from "react";

const RightArrowSvg = ({ w = 6, h = 10, c = "black" }) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.27918 0.0556641L0.22168 1.11316L3.65668 4.55566L0.22168 7.99816L1.27918 9.05566L5.77918 4.55566L1.27918 0.0556641Z"
        fill={c}
        // fill-opacity="0.87"
      />
    </svg>
  );
};

export default RightArrowSvg;
