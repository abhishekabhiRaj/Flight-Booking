import { Container, useMediaQuery, Box, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Title from "../Title";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination as P } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import city_1 from "../../img/city-1.png";
import city_2 from "../../img/city-2.png";
import "./index.css"
import { TabsWithPadding } from "../Tabs";
import { leftArrowSvg } from "../../svg/leftArrow";
import { rightArrowSvg } from "../../svg/rightArrow";

const indianCity = [
  { city: "Hyderabad", img: city_1 },
  { city: "New Delhi", img: city_2 },
  { city: "Pune", img: city_1 },

  { city: "Mumbai", img: city_2 },
  { city: "Bangalore", img: city_1 },
  { city: "Kolkata", img: city_2 },

  { city: "Chennai", img: city_1 },
  { city: "Ahmedabad", img: city_2 },
  { city: "Jaipur", img: city_1 },

   { city: "Hyderabad", img: city_1 },
  { city: "New Delhi", img: city_2 },
  { city: "Pune", img: city_1 },

  { city: "Mumbai", img: city_2 },
  { city: "Bangalore", img: city_1 },
  { city: "Kolkata", img: city_2 },

  { city: "Chennai", img: city_1 },
  { city: "Ahmedabad", img: city_2 },
  { city: "Jaipur", img: city_1 },
 
];

const usaCity = [
  { city: "New York", img: city_1 },
  { city: "Washington", img: city_2 },
  { city: "Ohio", img: city_1 },

  { city: "Los Angeles", img: city_2 },
  { city: "Chicago", img: city_1 },
  { city: "San Francisco", img: city_2 },

  { city: "Miami", img: city_1 },
  { city: "Boston", img: city_2 },
  { city: "New York", img: city_1 },

  { city: "Washington", img: city_2 },
  { city: "Ohio", img: city_1 },
  { city: "Los Angeles", img: city_2 },

  { city: "Chicago", img: city_1 },
  { city: "San Francisco", img: city_2 },
  { city: "Miami", img: city_1 },

  { city: "Washington", img: city_2 },
  { city: "Ohio", img: city_1 },
  { city: "Los Angeles", img: city_2 },
];

const CitySlider = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [active, setActive] = useState("one");
  const [selected, setSelectedCity] = useState(indianCity);
  const swiperRef = useRef(null);
  const [index, setIndex] = useState(0);
  const handleTab = (tab) => {
    if (tab === "one") {
      setSelectedCity(indianCity);
    } else {
      setSelectedCity(usaCity);
    }
    setActive(tab);
  };

  const handleNext = () => {
    setIndex(swiperRef.current.activeIndex);
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };
  
  const handlePrev = () => {
    setIndex(swiperRef.current.activeIndex);
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  useEffect(()=>{
    setIndex(swiperRef.current.activeIndex + 1);
  },[swiperRef]);
  
  let tabs = ["India", "USA"];
  const cardsPerPage = 12;

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
          { <div style={{display:"flex"}} className="web-view">
         <button
                      onClick={handlePrev}
                      // disabled={active !== "one" }
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
                      { index === 1 ? (
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
                      {index == 0 ? (
                        <span className="rotate-180">{leftArrowSvg}</span>
                      ) : (
                        rightArrowSvg
                      )}
                    </button>

          </div>}
        </section>
      <Box sx={{ position: 'relative', width: '100%', margin: '20px auto' }}>
        <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}  // Correctly set the reference
        spaceBetween={50}
        slidesPerView={1}
        pagination={isMobile ? { clickable: true } : false}
        navigation={false}  // Disable internal navigation as we are using custom buttons
        modules={[P, Navigation]}
        >
          {selected.reduce((result, item, index) => {
            if (index % 9 === 0) result.push([]);
            result[result.length - 1].push(item);
            return result;
          }, []).map((group, groupIndex) => (
            <SwiperSlide key={groupIndex}>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: !isMobile?'repeat(3, 1fr)':'repeat(1, 1fr)',
                gap: 2,
                // padding: 2
              }}>
                {group.map((item, i) => (
                  <Card key={i} item={item} />
                ))}
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      </div>
    </Container>
  );
};

const Card = ({ item }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <section
      className="card-grid city-card-hover"
      style={{
        border: "2px solid rgba(229, 229, 229, 0)",
        padding: "16px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        minWidth: "33%",
        height: !isMobile?"122px":"max-content",
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
