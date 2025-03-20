import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { plainFrontSvg } from "../../svg/planeFront";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { closeIcon } from "../../svg/closeIcon";

function ThankYouModal({ open, setOpen }) {
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  return (
    <div>
      {/* <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Thank You Modal
      </Button> */}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 6,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span></span>
            <button className="close-btn" onClick={handleClose}>
              {closeIcon}
            </button>
          </div>
          {plainFrontSvg}
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "bold", marginTop: "24px" }}
          >
            Thank You!
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Your submission has been received. <br />
            We will be in touch and contact you soon!
          </Typography>
          <Button
            sx={{ mt: 3, width: "100%" }}
            variant="contained"
            onClick={handleClose}
          >
            Back To Site
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ThankYouModal;
