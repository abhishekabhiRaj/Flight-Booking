import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PaymentIcon from "@mui/icons-material/Payment";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Title from "../Title";
import "./index.css";

const steps = [
  {
    icon: <SearchIcon fontSize="large" />,
    title: "Search Your Trip",
    description: "Enter your trip details and find the perfect flight.",
  },
  {
    icon: <PaymentIcon fontSize="large" />,
    title: "Make Payment",
    description:
      "Choose your preferred payment method and complete the booking.",
  },
  {
    icon: <FlightTakeoffIcon fontSize="large" />,
    title: "Enjoy Your Flight",
    description: "Get your e-ticket and prepare for your journey.",
  },
];

const HowItWorks = () => {
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <div className="cards">
        {/* <img src={howWorkImg} width="100%" alt="" /> */}
        {/* <h1 style={{ paddingLeft: "20px" }}>How It Works</h1> */}
        <Title title="How It Works" />
        <div className="how_it_work_container">
          {[
            {
              num: "01",
              title: "Search Your Destination",
              text: "Enter your desired destination, travel dates, and preferences to explore a range of affordable flight options and deals tailored just for you.",
            },
            {
              num: "02",
              title: "Fill out the Details",
              text: "Fill out a simple form with your contact information and travel requirements. This helps us understand your needs and find the best deals available.",
            },
            {
              num: "03",
              title: "Personalized Assistance",
              text: "Our travel experts will contact you to guide you through the booking process, offering exclusive deals and ensuring you save more on your journey!",
            },
          ].map((item, i) => (
            <div
              style={{ width: "32%", display: "flex", alignItems: "center" }}
              key={i}
            >
              <HowItWorksCard item={item} i={i} />
              {i != 2 && (
                <div
                  style={{
                    width: "1px",
                    height: "110px",
                    background: "#d3d3d3",
                    marginTop: "36px",
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default HowItWorks;

const HowItWorksCard = ({ item, i }) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <section
      key={i}
      className="how_it_work_card"
      style={{
        display: "flex",
        paddingLeft: i !== 0 ? "24px" : "0px",
        paddingRight: i !== 2 ? "24px" : "0px",
      }}
    >
      <div
        className="left"
        style={{
          fontSize: "64px",
          fontWeight: "700",
          color: "#EBD9FF",
        }}
      >
        {item.num}
      </div>
      <div className="right" style={{ marginLeft: "12px" }}>
        <p
          style={{
            margin: "0px",
            marginTop: "16px",
            marginBottom: "8px",
          }}
          className="text-grey-1 font-18 font-weight-700"
        >
          {item.title}
        </p>
        <p className="text-grey-2 font-12 font-weight-400">{item.text}</p>
      </div>
    </section>
  );
};
