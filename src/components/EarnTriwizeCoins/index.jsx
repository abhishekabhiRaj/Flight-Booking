import React, { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import deal1 from "../../img/bg/deal_1_bg.jpeg";
import ads2 from "../../img/ads2.png";
import ellipse from "../../img/shape/ellipse.png";
import { useNavigate } from "react-router-dom";
import { heIL } from "@mui/x-date-pickers/locales";
import { phoneSvg } from "../../svg/phone";
import PhoneSvg from "../../svg/PhoneSvg";

const EarnTriwizeCoins = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <div className="">
        {/* <h1 style={{ paddingLeft: "20px" }}>Deals to look out for</h1> */}
        <Grid container spacing={3} padding={0}>
          <CardAds />
          <CardEarn />
        </Grid>
      </div>
    </Container>
  );
};

export default EarnTriwizeCoins;

const CardAdsOld = () => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          p: 3,
          height: "100%",
          borderRadius: 2,
          color: "white",
          background:
            "linear-gradient(180deg,rgba(255, 125, 78, 0.95) 0%, #8B5CF6 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              // opacity: "0.2",
            }}
          >
            <div className="web-view">
              <img width="100%" src={ads2} />
            </div>
            <div className="mobile-view">
              <img width="140%" src={ads2} />
            </div>
          </div>
          {/* <div
            style={{
              background: "#fff",
              borderRadius: "6px",
              width: "max-content",
              fontWeight: 600,
              padding: "10px 20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            className="font-32 text-primary"
          >
            <PhoneSvg />
            1234-5678-9012
          </div> */}

          {/* <p
            className="font-24 font-weight-700 text-light-primary"
            style={{ marginTop: "16px" }}
          >
            {" "}
            Call our customer assistant to get deals for your travel destination
          </p> */}
        </Box>
        <Button
          // onClick={() => navigate("/earn")}
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: 2,
            width: 140,
            bgcolor: "#000000",
            "&:hover": {
              bgcolor: "rgba(9, 9, 9, 0.67)",
            },
          }}
        >
          LEARN MORE
        </Button>
      </Box>
    </Grid>
  );
};
const CardAds = () => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} md={6}>
      <div style={{ display: "flex" }}>
        <img style={{ borderRadius: "8px" }} width="100%" src={ads2} />
      </div>
    </Grid>
  );
};

const CardEarn = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  return (
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          // p: 3,
          height: "100%",
          borderRadius: 2,
          color: "white",
          background: "#8F5FBE",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box>
          <div
            style={{
              // position: "absolute",
              top: "0",
              left: "0",
            }}
          >
            <img
              width="42%"
              style={{ transform: "scale(1.1)" }}
              src={ellipse}
            />
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            // justifyContent: "flex-end",
            position: "absolute",
            top: !isMobile ? "50px" : "20px",
            left: !isMobile ? "259px" : "160px",
            // background: "red",
          }}
        >
          {/* <div style={{ width: "46%" }}></div> */}
          <div>
            <p
              className={
                isMobile ? "font-12 font-weight-400" : "font-30 font-weight-400"
              }
            >
              Earn
            </p>
            <p
              className={
                isMobile ? "font-12 font-weight-700" : "font-16 font-weight-700"
              }
              style={{ width: "max-content" }}
            >
              EaTriWize Coinsrn
            </p>
            <p
              className={
                isMobile ? "font-12 font-weight-400" : "font-20 font-weight-400"
              }
            >
              Book more, Earn more!*
            </p>
            <Button
              // onClick={() => navigate("/earn")}
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: 2,
                fontSize:isMobile?"9px":"13px",
                width: isMobile?"120px":"140px",
                bgcolor: "#000000",
                "&:hover": {
                  bgcolor: "rgba(9, 9, 9, 0.67)",
                },
              }}
            >
              LEARN MORE
            </Button>
          </div>
        </Box>
      </Box>
    </Grid>
  );
};
