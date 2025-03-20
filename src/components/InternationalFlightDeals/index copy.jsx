import { Container } from "@mui/material";
import React, { useState } from "react";
import Title from "../Title";
import { leftArrowSvg } from "../../svg/leftArrow";
import { rightArrowSvg } from "../../svg/rightArrow";
import deal_1 from "../../img/deal_1.png";
import deal_2 from "../../img/deal_2.png";
import Tabs from "../Tabs";
import { LeftArrowSvg } from "../../svg/left_arrow";
import { useNavigate } from "react-router-dom";

function InternationalFlightDeals() {
  const [startIndex, setStartIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [active, setActive] = useState("one");

  const handleTab = (tab) => {
    setAnimating(true); // Start animation
    setTimeout(() => {
      setActive(tab);
      setAnimating(false); // End animation after 500ms
    }, 300);
  };

  const cardsPerPage = 4;
  const cardWidth = 270; // Approximate width of each card including margin

  const indianCity = [
    {
      icon: deal_1,
      title: "Budget Travel Tips",
      text: "Explore the world affordably.",
    },
    {
      icon: deal_2,
      title: "Adventure Destinations",
      text: "Top places for adrenaline junkies.",
    },
    {
      icon: deal_1,
      title: "Saving for Travel",
      text: "How to invest and travel debt-free.",
    },
    {
      icon: deal_2,
      title: "Scenic Destinations",
      text: "Must-visit places for nature lovers.",
    },
    {
      icon: deal_1,
      title: "Solo Travel Hacks",
      text: "How to enjoy trips alone.",
    },
    {
      icon: deal_2,
      title: "Cultural Experiences",
      text: "Explore different cultures worldwide.",
    },
    {
      icon: deal_1,
      title: "Luxury on a Budget",
      text: "Affordable luxury travel tips.",
    },
    {
      icon: deal_2,
      title: "Family Travel",
      text: "How to plan a family trip easily.",
    },
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

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <div className="cards latest">
        <Title title="Latest International Flight Deals" />
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="w-50">
            <Tabs active={active} handleTab={handleTab} />
          </div>
          <div >
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
            {selected.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>
        </div>
        <p
          className="font-10 font-weight-400 text-grey-2"
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
}

const Card = ({ item }) => {
  const navigate = useNavigate();
  return (
    <section
      className="benefit_card_2"
      style={{
        minWidth: "260px",
        padding: "12px",
        border: "1px solid #e5e5e5",
        // margin: "12px",
        borderRadius: "8px",
      }}
    >
      <div
        className="left"
        style={{
          fontSize: "64px",
          fontWeight: "500",
          color: "#EBD9FF",
        }}
      >
        <img width="100%" src={item.icon} alt={item.title} />
      </div>
      <div className="right">
        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // marginBottom: "12px",
          }}
        >
          <span className="font-20 font-weight-700 text-grey-1">New York</span>
          <span style={{ marginTop: "2px" }}>
            <LeftArrowSvg />
          </span>
          <span className="font-20 font-weight-700 text-grey-1">Mumbai</span>
        </p>
        <p
          style={{
            margin: "0px",
            marginTop: "0px",
            marginBottom: "8px",
          }}
          className="font-12 text-grey-2"
        >
          Jan 25 2025
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{ margin: "0px" }}
            className="font-20 font-weight-700 text-grey-2"
          >
            <b>$560*</b>
          </p>
          <button
            onClick={() => {
              navigate("/booking");
            }}
            className="btn-primary font-14 font-weight-400"
            style={{ width: "96px", borderRadius: "8px" }}
          >
            Book
          </button>
        </div>
      </div>
    </section>
  );
};

export default InternationalFlightDeals;
