import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { plainFrontSvg } from "../../svg/planeFront";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { closeIcon } from "../../svg/closeIcon";
import plane from "../../img/gif/plane.gif";
import loader from "../../img/gif/loader.gif";

function Loader() {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div
      // maxWidth="lg"
      sx={{
        width: "100vw",
        height: "1000px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: "9999999",
        top: -100,
        left: 0,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          // bgcolor: "background.paper",
          // boxShadow: 24,
          // p: 6,
          borderRadius: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* <button
          className="close-btn"
          onClick={handleClose}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          {closeIcon}
        </button> */}
        <img width="100%" src={plane} />
        
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", marginTop: "24px" }}
        >
          Scanning the skies!
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Great deals ahead! We're searching for your perfect flight.
        </Typography>
        <img width="100%" src={loader} />
        {/* <Button
          sx={{ mt: 3, width: "50%" }}
          variant="contained"
          onClick={handleClose}
        >
          Back To Site
        </Button> */}
      </Box>
    </div>
  );
}


function LoaderSmall() {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div
      // maxWidth="lg"
      sx={{
        width: "100vw",
        height: "1000px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: "9999999",
        top: -100,
        left: 0,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          // bgcolor: "background.paper",
          // boxShadow: 24,
          // p: 6,
          borderRadius: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* <button
          className="close-btn"
          onClick={handleClose}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          {closeIcon}
        </button> */}
        <img width="50%" src={plane} />
        
       
        <img width="50%" src={loader} />
        {/* <Button
          sx={{ mt: 3, width: "50%" }}
          variant="contained"
          onClick={handleClose}
        >
          Back To Site
        </Button> */}
      </Box>
    </div>
  );
}

export {LoaderSmall}

export { Loader };
