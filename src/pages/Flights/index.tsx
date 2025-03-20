import React, { useEffect, useState } from "react";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
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
import moment from "moment";
import SearchBar, { SearchBarFlightPage } from "../../components/SearchBar/index.js";
import FlightSearchNew from "../../components/FlightSearchNew/index.js";
import FakeHeight from "../../components/FakeHeight/index.jsx";
import SearchBarNew from "../../components/SearchBarNew/index.jsx";

const Flights = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const locaiton = useLocation();
  const searchFilterData = useSelector((state) => state.searchFilter);

  const [flightSelected, setFlightSelected] = useState(null);
  const [flightData, setFlightData] = useState([]);
  const [recom, setRecom] = useState(null);
  const [searchFlights, { data, error, isLoading }] =
    useSearchFlightsMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);

  const [noOfPage, setNoOfPage] = useState([]);

  const [pagination, setPaginationData] = useState({
    page: 1,
    limit: 6,
    pages: 3,
    total: 15,
    next: 2,
    prev: null,
  });

  const handleSearch = async () => {
    if (searchFilterData.trip_type === "ROUND") {
      if (!searchFilterData.departure_date && !searchFilterData.return_date) {
        window.alert("Departure and Return Date are missing....");
        return;
      }
    }

    if (searchFilterData.trip_type === "ONE") {
      if (!searchFilterData.departure_date) {
        window.alert("Departure Date is missing....");
        return;
      }
    }

    setFlightData([]);
    setRecom(null);
    const requestData = {
      trip_type: searchFilterData.trip_type,
      departure_airport: searchFilterData.departure_airport,
      arrival_airport: searchFilterData.arrival_airport,
      departure_date: moment(searchFilterData.departure_date).format(
        "YYYY-MM-DD"
      ),
      return_date: moment(searchFilterData.return_date).format("YYYY-MM-DD"),
      num_passengers: searchFilterData.num_passengers,
      currency: searchFilterData.currency,
    };

    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      try {
        const result = await searchFlights({
          body: requestData,
          page: currentPage,
        }).unwrap();

        if (result?.pagination?.current_page) {
          setCurrentPage(result.pagination.current_page);
        }
        if (result?.pagination?.total_pages) {
          setTotalPage(result.pagination.total_pages);
        }
        if (result?.pagination?.total_results) {
          setTotalData(result.pagination.total_results);
        }

        if (result?.results) {
          setFlightData(result.results);
          setRecom(result.recommendations);
          setPaginationData(result.pagination);
          let array = [];
          for (let i = 0; i < result?.pagination.total_pages; i++) {
            array.push(i + 1);
          }
          setNoOfPage(array);
        } else {
          console.warn(
            "Response structure is different than expected:",
            result
          );
        }
        return; // Exit function on success
      } catch (err) {
        console.error(`Attempt ${attempts + 1}: Error fetching flights:`, err);

        if (err?.response?.status === 504) {
          attempts++;
          if (attempts < maxAttempts) {
            console.warn(
              `Retrying request... Attempt ${attempts + 1}/${maxAttempts}`
            );
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
          } else {
            console.error(
              "Max retry attempts reached. Please try again later."
            );
            window.alert("Server timeout error. Please try again later.");
          }
        } else {
          break; // If error is not 504, stop retrying
        }
      }
    }
  };

  useEffect(() => {
    if (flightSelected) {
      window.scrollTo(0, 0);
      navigate("../booking");
    }
  }, [flightSelected]);

  const [searchFilterDatad, setSearchFilterData] = useState({
    trip_type: "ROUND",
    departure_airport: "LAX",
    arrival_airport: "LHR",
    departure_date: null,
    return_date: "2025-03-19",
    num_passengers: 3,
  });

  return (
    <Box sx={{ bgcolor: "#f5f5f5" }}>
      {/* booking form */}

      {/* Hero Search */}
      {/* <HeroSearch
        isLoading={isLoading}
        searchFilterData={null}
        setSearchFilterData={() => {}}
        fetchFlights={handleSearch}
      />
      {isMobile && <div style={{ height: "450px" }}></div>}
      {!isMobile && <div style={{ height: "160px" }}></div>} */}

      <FakeHeight />

      <SearchBarFlightPage
        searchFilterData={searchFilterData}
        setSearchFilterData={setSearchFilterData}
      />

      <Container maxWidth="lg" sx={{ mt: -8 }}>
        <section className="form-book cards" style={{ padding: "6px" }}>
          <FlightSearchNew
            isLoading={false}
            fetchFlights={handleSearch}
            searchFilterData={searchFilterData}
            setSearchFilterData={setSearchFilterData}
          />
        </section>
      </Container>

      {/* Flight Results */}
      {locaiton.state == "home" && (
        <FlightResults
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
          totalData={totalData}
          handleSearch={handleSearch}
          isLoading={isLoading}
          flightData={flightData}
          setFlightSelected={setFlightSelected}
          currentPage={currentPage}
          noOfPage={noOfPage}
          pagination={pagination}
          recom={recom}
        />
      )}

      {/* International Flight Deals */}
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

      <div id="contact"></div>

      {/* Share Details */}
      <SharedDetails />

      <DestinationDeals />
    </Box>
  );
};

export default Flights;
