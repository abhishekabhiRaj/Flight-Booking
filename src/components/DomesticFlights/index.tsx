import React, { useEffect, useState } from "react";
import { Container, useMediaQuery, useTheme } from "@mui/material";
import "./index.css";
import { OneWayPriceCard, RoundWayPriceCard } from "../Card/PriceCard";
import Title from "../Title";
import Tabs from "../Tabs";

const DomesticFlights = () => {
  const [animating, setAnimating] = useState(false);
  const [active, setActive] = useState("one");

  const handleTab = (tab) => {
    setAnimating(true); // Start animation
    setTimeout(() => {
      setActive(tab);
      setAnimating(false); // End animation after 500ms
    }, 300);
  };


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [dataWeb, setDataWeb] = useState([1,1,1,1,1,1]);

    useEffect(()=>{
      if(isMobile){
        setDataWeb([1,1,1])
      }
    },[isMobile])

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <div className="cards">
        <Title title="Best Deals On Domestic Flights" />
        <div className="w-50">
          <Tabs active={active} handleTab={handleTab} />
        </div>
        <div
          className={`flight-card-price ${animating ? "fade-out" : "fade-in"}`}
        >
          {active !== "round" ? (
            <div className="grid-container--">
             {
              dataWeb.map((item, i)=><OneWayPriceCard />)
             }
            </div>
          ) : (
            <section className="grid-container---">
             
              {
              dataWeb.map((item, i)=><RoundWayPriceCard />)
             }
            </section>
          )}
        </div>
        <p
          className="font-10 font-weight-400 text-grey-2 term-click"
          style={{ marginTop: "28px" }}
        >
          *All fares above were found in last 8 hours. Fares are round trip/one
          way. Fares incl. all fuel surcharges, taxes & fees and our service
          fees. Displayed fares are based on historical data, are subject to
          change and cannot be guaranteed at the time of booking. See all
          booking terms and conditions.
        </p>
      </div>
    </Container>
  );
};

export default DomesticFlights;
