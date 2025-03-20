import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import FlightSearchNew from "../FlightSearchNew";
import { cloud1Svg } from "../../svg/cloud1";
import { cloud2Svg } from "../../svg/cloud2";
import { cloud3Svg } from "../../svg/cloud3";
import { cloud4Svg } from "../../svg/cloud4";
import cloudBg from "../../img/cloudBg.png";
import { plainSvg } from "../../svg/plane";
import { plainMobileSvg } from "../../svg/planeMobile";
import "./index.css";

function HeroSearch({
  isLoading = false,
  searchFilterData,
  setSearchFilterData,
  fetchFlights = () => {},
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Box
        sx={{
          position: "relative",
          // height: "600px",
          background: "linear-gradient(to bottom, #f3e8ff, #ffffff)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            backgroundImage: "url(/airplane.svg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            backgroundSize: "contain",
            zIndex: 1,
          },
        }}
      >
        <div className="flight-search">
          <div>
            <img width="100%" src={cloudBg} />
            <section className="cloud_2">
              <p>
                Enjoy the unbeatable <br /> deals on flights with <br />
                <b> TriWize Booking</b>
              </p>
            </section>
            {/* <section className="cloud_3">{cloud3Svg}</section>
            <section className="cloud_4">{cloud4Svg}</section> */}
            <section className="plane">
              {/* {isMobile ? (
                <marquee direction="right">{plainMobileSvg}</marquee>
              ) : (
                plainSvg
              )} */}
              {plainSvg}
            </section>
          </div>
          <Container maxWidth="lg" sx={{ my: 0 }}>
            <section className="form-book">
              <FlightSearchNew
                isLoading={isLoading}
                searchFilterData={searchFilterData}
                setSearchFilterData={setSearchFilterData}
                fetchFlights={fetchFlights}
              />
            </section>
          </Container>
        </div>
      </Box>
    </div>
  );
}

export default HeroSearch;
