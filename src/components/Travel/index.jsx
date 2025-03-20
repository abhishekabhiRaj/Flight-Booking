import { Container, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Title from "../Title";
import travel_1 from "../../img/travel_1.png";
import travel_2 from "../../img/travel_2.png";
import travel_3 from "../../img/travel_3.png";
import "./index.css";

function Travel() {
  const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <div className={!isMobile ?"cards travel":"cards travel"}>
        
        {/* <img src={travel} width="100%" alt="" /> */}
        {<Title title="Latest Travel Libraries" />}
        <div className="travel-card-container">
          {[
            {
              icon: travel_1,
              title:
                "The Art of Budget Travel: Maximizing Adventure on a Shoestring",
              text: "Explore strategies to travel the world without breaking the bank. Learn about affordable destinations, smart saving tips, and hacks for securing cheap flights and accommodations while still enjoying an adventurous experience.",
            },
            {
              icon: travel_2,
              title: "Top Adventure Destinations for Adrenaline Junkies",
              text: "Discover must-visit spots for adventure lovers, from skydiving in New Zealand to scuba diving in Indonesia. Get insider tips on planning these high-energy trips while staying within your travel budget.",
            },
            {
              icon: travel_3,
              title: "How to Save, Invest, and Travel Debt-Free",
              text: "Find out how to balance travel and finances by planning smartly. Learn how saving and investing for travel can help you explore the world while avoiding debt and creating lifelong memories.",
            },
          ].map((item, i) => (
            <section
              key={i}
              className="benefit_card shadow-small"
              style={{
                width: "33%",
                // display: "flex",
                padding: "12px",
                border: "1px solid #e5e5e5",
                margin: "12px",
                borderRadius: "8px",
                cursor:'pointer'
                // borderRight: i !== 2 ? "1px solid #d3d3d3" : undefined, // Apply borderRadius conditionally
              }}
            >
              <div
                className="left"
                style={{
                  fontSize: "64px",
                  fontWeight: "500",
                  color: "#EBD9FF",
                  position: "relative",

                  // paddingLeft: "12px",
                }}
              >
                <button
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "12px",
                    cursor: "pointer",
                    background: "#A64DFFBA",
                    fontSize: "10px",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "6px 10px",
                    fontWeight: "700",
                  }}
                >
                  Travel
                </button>
                <img
                  style={{ borderRadius: "8px" }}
                  width="100%"
                  src={item.icon}
                />
              </div>
              <div className="right">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                    color: "#525252",
                    marginBottom: "12px",
                  }}
                >
                  <span>
                    <i>Nov 15, 2024</i>
                  </span>
                  <span>
                    <i>10 min read</i>
                  </span>
                </div>
                <p
                  style={{
                    margin: "0px",
                    marginTop: "0px",
                    marginBottom: "8px",
                  }}
                  className="font-18 font-weight-700 text-grey-1"
                >
                  {item.title}
                </p>
                <p
                  style={{ margin: "0px" }}
                  className="font-12 font-weight-400 text-grey-2"
                >
                  {item.text}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Travel;
