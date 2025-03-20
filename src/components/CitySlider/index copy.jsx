import { Container } from "@mui/material";
import React, { useState } from "react";
import Title from "../Title";
import { leftArrowSvg } from "../../svg/leftArrow";
import { rightArrowSvg } from "../../svg/rightArrow";
import deal_1 from "../../img/deal_1.png";
import deal_2 from "../../img/deal_2.png";
import Tabs, { TabsWithPadding } from "../Tabs";
import { LeftArrowSvg } from "../../svg/left_arrow";
import city_1 from "../../img/city-1.png";
import city_2 from "../../img/city-2.png";
import "./index.css";

function CitySlider() {
  const [startIndex, setStartIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [active, setActive] = useState("one");

  const handleTab = (tab) => {
    setAnimating(true); // Start animation
    setTimeout(() => {
      if (tab == "one") {
        setSelectedCity(indianCity);
      } else {
        setSelectedCity(usaCity);
      }
      setActive(tab);
      setAnimating(false); // End animation after 500ms
    }, 300);
  };

  const cardsPerPage = 12;
  const cardWidth = 372; // Approximate width of each card including margin

  let indianCity = [
    { city: "Hyderabad", img: city_1 },
    { city: "New Delhi", img: city_2 },
    { city: "Pune", img: city_1 },
    { city: "Mumbai", img: city_2 },
    { city: "Bangalore", img: city_1 },
    { city: "Kolkata", img: city_2 },
    { city: "Chennai", img: city_1 },
    { city: "Ahmedabad", img: city_2 },
    { city: "Jaipur", img: city_1 },
    { city: "Lucknow", img: city_2 },
    { city: "Kolkata", img: city_2 },
    { city: "Chennai", img: city_1 },
    { city: "Ahmedabad", img: city_2 },
    { city: "Jaipur", img: city_1 },
    { city: "Lucknow", img: city_2 },
  ];

  let usaCity = [
    { city: "New York", img: city_1 },
    { city: "Washington", img: city_2 },
    { city: "Ohio", img: city_1 },
    { city: "Los Angeles", img: city_2 },
    { city: "Chicago", img: city_1 },
    { city: "San Francisco", img: city_2 },
    { city: "Miami", img: city_1 },
    { city: "Boston", img: city_2 },
    { city: "Seattle", img: city_1 },
    { city: "Denver", img: city_2 },
    { city: "Chicago", img: city_1 },
    { city: "San Francisco", img: city_2 },
    { city: "Miami", img: city_1 },
    { city: "Boston", img: city_2 },
    { city: "Seattle", img: city_1 },
  ];

  const [selected, setSelectedCity] = useState(indianCity);

  const handleNext = () => {
    if (startIndex + cardsPerPage < selected.length) {
      setStartIndex(startIndex + 1);
      setTranslateX((prev) => prev - cardWidth);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
      setTranslateX((prev) => prev + cardWidth);
    }
  };

  let tabs = ["India", "USA"];
  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <div className="cards">
        <Title title="Cities You Might Love" />
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="w-50">
            <TabsWithPadding
              tabs={tabs}
              active={active}
              handleTab={handleTab}
            />
          </div>
          <div>
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              style={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                background: "transparent",
                cursor: startIndex === 0 ? "not-allowed" : "pointer",
              }}
              aria-label="Previous"
            >
              {startIndex === 0 ? (
                leftArrowSvg
              ) : (
                <span className="rotate-180">{rightArrowSvg}</span>
              )}
            </button>

            <button
              onClick={handleNext}
              disabled={startIndex + cardsPerPage >= selected.length}
              style={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                background: "transparent",
                cursor:
                  startIndex + cardsPerPage >= selected.length
                    ? "not-allowed"
                    : "pointer",
              }}
              aria-label="Next"
            >
              {startIndex + cardsPerPage >= selected.length ? (
                <span className="rotate-180">{leftArrowSvg}</span>
              ) : (
                rightArrowSvg
              )}
            </button>
          </div>
        </section>

        {/* Smooth Sliding Cards */}
        <div
          className={`slider-container ${animating ? "fade-out" : "fade-in"}`}
          style={{
            overflow: "hidden",
            width: "100%",
            position: "relative",
            marginTop: "12px",
          }}
        >
          <div
            className={`slider`}
            style={{
              display: "flex",
              gap: "16px",
              transform: `translateX(${translateX}px)`,
              transition: "transform 0.5s ease-in-out",
              paddingRight: 100,
            }}
          >
            <div className="grid-container">
              {selected.map((item, i) => (
                <Card key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
        {/* <p
          className="font-10 font-weight-400 text-grey-2"
          style={{ marginTop: "28px" }}
        >
          *All fares above were found in last 8 hours. Fares are round trip/one
          way. Fares incl. all fuel surcharges, taxes & fees and our service
          fees. Displayed fares are based on historical data, are subject to
          change and cannot be guaranteed at the time of booking. See all
          booking terms and conditions.
        </p> */}
      </div>
    </Container>
  );
}

const Card = ({ item }) => {
  return (
    <section
      className="card-grid city-card-hover"
      style={{
        border: "2px solid rgba(229, 229, 229, 0)",
        padding: "16px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        minWidth: "338px",
        height: "122px",
        background: "#fff",
      }}
    >
      <img
        src={item.img}
        alt={item.city}
        style={{ width: "90px", height: "90px" }}
      />
      <span style={{ marginLeft: "12px", fontWeight: "700", fontSize: "18px" }}>
        {item.city}
      </span>
    </section>
  );
};

export default CitySlider;
