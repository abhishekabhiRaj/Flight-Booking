import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import React from "react";

function FakeHeight() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  if (isMobile) {
    return <div style={{ height: "71px" }}></div>;
  } else {
    return <div style={{ height: "81px" }}></div>;
  }
}

export default FakeHeight;
