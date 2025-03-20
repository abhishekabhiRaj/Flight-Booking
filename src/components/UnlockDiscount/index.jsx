import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  InputAdornment,
  Modal,
  Paper,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import Title from "../Title";
import shareDetailImg from "../../img/shareDetail.png";
import { gasBallonSvg } from "../../svg/gasBallon";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { closeIcon } from "../../svg/closeIcon";

function UnlockDiscount({ open, setOpen }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // navigate(-1);
  };
  return (
    // <Modal open={open} onClose={handleClose}>
    <Modal
      open={open}
      onClose={handleClose}
      // BackdropProps={{ onClick: (e) => e.stopPropagation() }}
    >
      <Container maxWidth="lg" sx={{ my: 0 }}>
        <div className="cards overflow">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span></span>
            <button className="close-btn" onClick={handleClose}>
              {closeIcon}
            </button>
          </div>
          <section className="mobile-view">
            <div
              className=" gasBallonSvg"
              style={{
                // width: isMobile ? "100%" : "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {gasBallonSvg}
              {/* <img width="90%" src={shareDetailImg} /> */}
            </div>
          </section>
          {/* <img src={travel} width="100%" alt="" /> */}
          <div style={{ display: !isMobile ? "flex" : "flex" }}>
            <Title title="Unlock Your" />
            <p
              className="custom_title"
              style={{ marginLeft: "20px", color: "#fc7302" }}
            >
              $50 Travel Discount
            </p>
          </div>
          <p>
            Planning your next adventure? Connect with our customer assistant{" "}
            <br /> now to grab an exclusive $50 off on your next flight
            booking! 
          </p>
          <section style={{ display: isMobile ? "" : "flex" }}>
            <div style={{ width: isMobile ? "100%" : "50%" }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  px: 0,
                  borderRadius: 2,
                  // maxWidth: 900,
                  mx: "auto",
                  // backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}
              >
                <Stack spacing={3}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Email *"
                      // defaultValue="Enter Email No..."
                      placeholder="Enter Email No..."
                      // InputProps={{
                      //   startAdornment: (
                      //     <InputAdornment position="start">
                      //       <PersonIcon color="primary" />
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Mobile *"
                      placeholder="Enter Mobile No..."
                      // InputProps={{
                      //   startAdornment: (
                      //     <InputAdornment position="start">
                      //       <PersonIcon color="primary" />
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                  </Box>

                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="I agree the Terms and Conditions"
                  />

                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 2,
                      py: 1.5,
                      fontSize: "1.1rem",
                      borderRadius: "8px",
                      textTransform: "none",
                    }}
                  >
                    Send
                  </Button>
                </Stack>
              </Paper>
            </div>
            <div
              className="web-view"
              style={{
                width: isMobile ? "100%" : "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ marginTop: "-100px" }}>{gasBallonSvg}</div>
              {/* <img width="90%" src={shareDetailImg} /> */}
            </div>
          </section>
        </div>
      </Container>
    </Modal>
  );
}

export default UnlockDiscount;
