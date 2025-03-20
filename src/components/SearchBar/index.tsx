import React from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// import deal1 from "../../img/bg/deal_1_bg.jpeg";
import { useNavigate } from "react-router-dom";
import deal1 from "../../img/deals/deals_1.png";
import deal2 from "../../img/deals/deals_2.png";
import deal3 from "../../img/deals/deals_3.png";
import Title from "../Title";
import "./index.css";
import themeWeb from "../../img/theme-banner.png";
import flightThemeWeb from "../../img/flight_bg.png";
import themeMobile from "../../img/theme-banner-mobile.png";
import FlightSearchNew from "../FlightSearchNew";

const deals = [
  {
    title: "Best Travel Offer",
    description: "Save up to $60",
    subtext: "on the domestic flights.*",
    bgColor: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  },
  {
    title: "Weekend Deal",
    description: "20% OFF",
    subtext: "on your first booking.*",
    bgColor: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
  },
  {
    title: "Deals With",
    description: "$200 onwards",
    subtext: "on the international flights.*",
    bgColor: "linear-gradient(135deg, #9D174D 0%, #DB2777 100%)",
  },
];

const SearchBar = ({
  isLoading = false,
  searchFilterData,
  setSearchFilterData,
  fetchFlights = () => {},
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div className="bg-theme">
      <p
        className={
          !isMobile ? "font-48 font-weight-300" : "font-24 font-weight-300"
        }
        style={{ color: "#45008A" }}
      >
        Enjoy the unbeatable {!isMobile && <br />} deals on {isMobile && <br />}{" "}
        flights with {!isMobile && <br />}
        <b> TriWize Booking</b>
      </p>
      <img width="100%" src={isMobile ? themeMobile : themeWeb} />
    </div>
  );
};

const SearchBarFlightPage = ({
  isLoading = false,
  searchFilterData,
  setSearchFilterData,
  fetchFlights = () => {},
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div className="bg-theme">
      {/* <p
        className={
          !isMobile ? "font-48 font-weight-300" : "font-24 font-weight-300"
        }
        style={{ color: "#45008A" }}
      >
        Enjoy the unbeatable {!isMobile && <br />} deals on {isMobile && <br />}{" "}
        flights with {!isMobile && <br />}
        <b> TriWize Booking</b>
      </p> */}
      <img width="100%" src={flightThemeWeb} />
    </div>
  );
};

export {SearchBarFlightPage}


export default SearchBar;
