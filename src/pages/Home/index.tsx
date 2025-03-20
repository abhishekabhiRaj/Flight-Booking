import React, { useEffect, useState } from "react";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
// components import
import DealsShowcase from "../../components/DealsShowcase";
import DomesticFlights from "../../components/DomesticFlights";
import HeroSearch from "../../components/HeroSearch/index.jsx";
import EarnTriwizeCoins from "../../components/EarnTriwizeCoins/index.jsx";
import HowItWorks from "../../components/HowItWorks";
import Review from "../../components/Review/index.jsx";
import Invest from "../../components/Invest/index.jsx";
import Benefits from "../../components/Benefits/index.js";
import Travel from "../../components/Travel/index.jsx";
import Help from "../../components/Help/index.jsx";
import CitySlider from "../../components/CitySlider/index.jsx";
import SharedDetails from "../../components/SharedDetails/index.jsx";
import InternationalFlightDeals from "../../components/InternationalFlightDeals/index.jsx";
import DestinationDeals from "../../components/DestinationDeals/index.jsx";
import UnlockDiscount from "../../components/UnlockDiscount/index.jsx";
import { useLocation } from "react-router-dom";
import SearchBar from "../../components/SearchBar/index.js";
import FlightSearchNew from "../../components/FlightSearchNew/index.js";
import FakeHeight from "../../components/FakeHeight/index.jsx";
import { useIntercom } from "react-use-intercom";
import SearchBarNew from "../../components/SearchBarNew/index.jsx";

const Home = () => {
  const [open, setOpen] = useState(false);
  // const { boot, shutdown, hide, show, update } = useIntercom();
  const [tripType, setTripType] = useState("roundTrip");
  const [cabinClass, setCabinClass] = useState("economy");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleTripTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newTripType: string | null
  ) => {
    if (newTripType !== null) {
      setTripType(newTripType);
    }
  };

  const [searchFilterData, setSearchFilterData] = useState({
    trip_type: "ROUND",
    departure_airport: "LAX",
    arrival_airport: "LHR",
    departure_date: null,
    return_date: "2025-03-19",
    num_passengers: 3,
  });

  // welcome modal
  useEffect(() => {
    window.scrollTo(0, 0);
    const hasShownModal = localStorage.getItem("hasShownWelcomeModal");
  
    if (!hasShownModal) {
      const timer = setTimeout(() => {
        setOpen(true);
        localStorage.setItem("hasShownWelcomeModal", "true");
      }, 10000);
  
      return () => clearTimeout(timer);
    }
  }, []);



  return (
    <Box>
      {/* <div style={{ height: "100px" }}></div> */}

      {/* Hero Section with Flight Search --done */}
      {/* <HeroSearch
        searchFilterData={searchFilterData}
        setSearchFilterData={setSearchFilterData}
      /> */}

      {/* Deals to look out for --done */}
      {/* {isMobile ? (
        <div style={{ height: "477px" }}></div>
      ) : (
        <div style={{ height: "158px" }}></div>
      )} */}

      <FakeHeight />

      <SearchBar
        searchFilterData={searchFilterData}
        setSearchFilterData={setSearchFilterData}
      />

      <Container maxWidth="lg" sx={{ mt: -8 }}>
        <section className="form-book cards" style={{ padding: "6px" }}>
          <FlightSearchNew
            isLoading={false}
            fetchFlights={() => {}}
            searchFilterData={searchFilterData}
            setSearchFilterData={setSearchFilterData}
          />
        </section>
      </Container>

      {/* <Container maxWidth="lg" sx={{ mt: -8 }}>
        <SearchBarNew
          isLoading={false}
          fetchFlights={() => {}}
          searchFilterData={searchFilterData}
          setSearchFilterData={setSearchFilterData}
        />
      </Container> */}

      <DealsShowcase />

      {/* Best Deals On Domestic Flights --done */}
      <DomesticFlights />

      {/* Earn Triwize Coins  --done */}
      <EarnTriwizeCoins />

      {/* review --done */}
      {/* <Review /> */}

      <InternationalFlightDeals />

      {/* how it work  --done*/}
      <div className="web-view">
        <HowItWorks />
      </div>

      {/* invest */}
      {!isMobile && <Invest />}

      {/* benefits */}
      <Benefits />

      {/* travel */}
      <Travel />

      {/* Help */}
      <Help />

      {/* City */}
      <CitySlider />

      {/* Share Details */}
      
      <div id="contact"></div>

      <SharedDetails />

      {/* DestinationDeals */}
      <DestinationDeals />

      {/* Unlock Discount Modal*/}
      <UnlockDiscount open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Home;
