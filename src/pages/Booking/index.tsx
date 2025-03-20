import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import FlightResults from "../../components/FlightResults";
import Benefits from "../../components/Benefits";
import flightImg from "../../img/flight-page-ads.png";
import HeroSearch from "../../components/HeroSearch/index.jsx";
import InternationalFlightDeals from "../../components/InternationalFlightDeals/index.jsx";
import CitySlider from "../../components/CitySlider/index.jsx";
import LargeAds from "../../components/LargeAds/index.jsx";
import Travel from "../../components/Travel/index.jsx";
import Help from "../../components/Help/index.jsx";
import SharedDetails from "../../components/SharedDetails/index.jsx";
import BookingForm from "../../components/BookingForm/index.jsx";
import ThankYouModal from "../../components/ThankYou/index.jsx";
import UnlockDiscount from "../../components/UnlockDiscount/index.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSearchFlightsMutation } from "../../store/services/flightListApi.js";
import { useDispatch, useSelector } from "react-redux";
import DestinationDeals from "../../components/DestinationDeals/index.jsx";
import "./index.css";
import { setSearchFilter } from "../../store/slices/searchFilterSlice.js";
import FakeHeight from "../../components/FakeHeight/index.jsx";
const Booking = () => {
  const searchFilterData = useSelector((state) => state.searchFilter);

  const [flightSelected, setFlightSelected] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState([]);

  const [searchFlights, { data, error, isLoading }] =
    useSearchFlightsMutation();

  const handleSearch = async () => {
    if (searchFilterData.trip_type == "ROUND") {
      if (!searchFilterData.departure_date && !searchFilterData.return_date) {
        window.alert("Departure and Return Date are missing....");
        return;
      }
    }

    if (searchFilterData.trip_type == "ONE") {
      if (!searchFilterData.departure_date) {
        window.alert("Departure Date is missing....");
        return;
      }
    }
    setFlightData([]);
    const requestData = {
      trip_type: searchFilterData.trip_type,
      departure_airport: searchFilterData.departure_airport,
      arrival_airport: searchFilterData.arrival_airport,
      departure_date: searchFilterData.departure_date,
      return_date: searchFilterData.return_date,
      num_passengers: searchFilterData.num_passengers,
      currency: searchFilterData.currency,
    };

    try {
      const result = await searchFlights(requestData).unwrap();

      if (result?.AirShoppingRS?.DataLists?.FlightSegmentList?.FlightSegment) {
        setFlightData(
          result.AirShoppingRS.DataLists.FlightSegmentList.FlightSegment
        );
      } else {
        console.warn("Response structure is different than expected:", result);
      }
    } catch (err) {
      console.error("Error fetching flights:", err);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (searchFilterData.departure_date && flightData.length == 0) {
      handleSearch();
    }
  }, []);

  const [id, setId] = useState(0);
  useEffect(() => {
    if (location.state) {
      dispatch(
        setSearchFilter({
          ...searchFilterData,
          departure_airport: location.state.departure_airport,
          departure_airport_name: location.state.departure_airport_name,
          arrival_airport: location.state.arrival_airport,
          arrival_airport_name: location.state.arrival_airport_name,
        })
      );
    }
    if (location.state?.id) {
      setId(location.state?.id);
    }
  }, [location]);

  useEffect(() => {
    if (flightSelected) {
      window.scrollTo(0, 0);
      navigate("../booking");
    }
  }, [flightSelected]);

  return (
    <Box sx={{ bgcolor: "#f5f5f5" }}>

      <FakeHeight/>
      {/* booking form */}
      <BookingForm id={id} />

      {/* International Flight Deals */}
      <div className="mt-3"></div>
      <InternationalFlightDeals />

      {/* City */}
      <CitySlider />

      {/* benefits */}
      <Benefits />

      {/* Ads */}
      <LargeAds flightImg={flightImg} />

      {/* travel */}
      <Travel />

      {/* Help */}
      <Help />

      {/* Share Details */}
      <SharedDetails />

      {/*  */}
      <DestinationDeals />
    </Box>
  );
};

export default Booking;
