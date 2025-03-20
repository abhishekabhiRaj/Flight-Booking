import { Container, useMediaQuery, Box } from "@mui/material";
import React, { useState, useRef } from "react";
import Title from "../Title";
import { leftArrowSvg } from "../../svg/leftArrow";
import { rightArrowSvg } from "../../svg/rightArrow";
import deal_1 from "../../img/deal_1.png";
import deal_2 from "../../img/deal_2.png";
import Tabs from "../Tabs";
import { LeftArrowSvg } from "../../svg/left_arrow";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination as P } from "swiper/modules";
import "./index.css";
import roundIcon  from "../../img/round.png"

function InternationalFlightDeals() {
  const [active, setActive] = useState("one");
  const swiperRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleTab = (tab) => {
    setActive(tab);
  };

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
    // { icon: deal_2, title: "Family Travel", text: "How to plan a family trip easily." },
  ];

  const handleNext = () => {
    setIndex(1);
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    setIndex(0);
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  const [selected, setSelectedCity] = useState(indianCity);

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
          <div className="w-50 mb-2">
            <Tabs active={active} handleTab={handleTab} />
          </div>
          <div style={{ display: "flex" }} className="web-view">
            <button
              onClick={handlePrev}
              // disabled={startIndex === 0}
              style={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                background: "transparent",
                // cursor: startIndex === 0 ? "not-allowed" : "pointer",
              }}
              aria-label="Previous"
            >
              {index === 0 ? (
                leftArrowSvg
              ) : (
                <span className="rotate-180">{rightArrowSvg}</span>
              )}
            </button>

            <button
              onClick={handleNext}
              // disabled={startIndex + cardsPerPage >= selected.length}
              style={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                border: "none",
                background: "transparent",
                // cursor:
                //   startIndex + cardsPerPage >= selected.length
                //     ? "not-allowed"
                //     : "pointer",
              }}
              aria-label="Next"
            >
              {index == 1 ? (
                <span className="rotate-180">{leftArrowSvg}</span>
              ) : (
                rightArrowSvg
              )}
            </button>
          </div>
        </section>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Correctly set the reference
          spaceBetween={50}
          slidesPerView={1}
          pagination={isMobile ? { clickable: true } : false}
          navigation={false} // Disable internal navigation as we are using custom buttons
          modules={[P, Navigation]}
        >
          {selected
            .reduce((result, item, index) => {
              if (index % (!isMobile? 4 : 1) === 0) result.push([]);
              result[result.length - 1].push(item);
              return result;
            }, [])
            .map((group, groupIndex) => (
              <SwiperSlide key={groupIndex}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: !isMobile
                      ? "repeat(4, 1fr)"
                      : "repeat(1, 1fr)",
                    gap: 2,
                    // padding: 2
                  }}
                >
                  {group.map((item, i) => {
                    if (active == "one") {
                      return <Card key={i} item={item} />;
                    } else {
                      return <RoundCard key={i} item={item} />;
                    }
                  })}
                </Box>
              </SwiperSlide>
            ))}
        </Swiper>
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
}

const Card = ({ item }) => {
  const navigate = useNavigate();
  return (
    <section
      className="benefit_card_2"
      style={{
        minWidth: "20%",
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

const RoundCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <section
      className="benefit_card_2"
      style={{
        minWidth: "20%",
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
          <span className="font-20 font-weight-700 text-grey-1">
            New York
          </span>
          <div style={{display:"flex", flexDirection:'column'}}>
                <img width="20px" src={roundIcon} />
          </div>
          <span className="font-20 font-weight-700 text-grey-1">Mumbai</span>
        </p>
        <div style={{display:'flex', justifyContent:'space-between'}}>
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
        <p
          style={{
            margin: "0px",
            marginTop: "0px",
            marginBottom: "8px",
          }}
          className="font-12 text-grey-2"
        >
          Mar 12 2025
        </p>
        </div>
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
