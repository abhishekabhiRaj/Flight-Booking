import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";

const Earn = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" component="h1">
        Earn
      </Typography>
    </Container>
  );
};

export default Earn;
