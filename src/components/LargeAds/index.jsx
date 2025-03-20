import { Container } from "@mui/material";
import React from "react";

function LargeAds({ flightImg }) {
  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <div style={{ width: "100%", display: "flex" }}>
        <img style={{ borderRadius: "8px" }} width="100%" src={flightImg} />
      </div>
    </Container>
  );
}

export default LargeAds;
