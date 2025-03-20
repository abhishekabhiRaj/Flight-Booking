import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Title from "../Title";
import { headphoneSvg } from "../../svg/headphone";
import { eyeSvg } from "../../svg/eye";
import { percentageSvg } from "../../svg/percentage";
import "./index.css";

const benefits = [
  {
    icon: headphoneSvg,
    title: "24/7 Customer Support",
    text: "Our dedicated customer support team is available 24/7 to assist with bookings, answer your queries, and ensure a hassle-free travel experience.",
  },
  {
    icon: eyeSvg,
    title: "Transparent Pricing",
    text: "Our platform provides clear pricing for all bookings. For even better deals and additional savings, our customer representatives are ready to help.",
  },
  {
    icon: percentageSvg,
    title: "Unlock Exclusive Deals",
    text: "Contact our travel experts to access unbeatable flight deals tailored to your preferences, so you can save more on every trip.",
  },
];

const Benefits = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <div className="cards">
        {/* <img src={benefit} width="100%" alt="" /> */}
        <Title title="Benefits You Will Get" />
        <div className="benefit_card_container">
          {benefits.map((item, i) => (
            <section
              key={i}
              className="benefit_card"
              style={{
                // display: "flex",
                padding: "12px 24px",
                borderRight: !isMobile
                  ? i !== 2
                    ? "1px solid #d3d3d3"
                    : undefined
                  : "", // Apply borderRadius conditionally
              }}
            >
              <div
                className="left"
                style={{
                  fontSize: "64px",
                  fontWeight: "500",
                  color: "#EBD9FF",
                  paddingLeft: "12px",
                }}
              >
                {item.icon}
              </div>
              <div className="right" style={{ marginLeft: "12px" }}>
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
                  className="font-12 font-weight-400 text-grey-2"
                  style={{ margin: "0px", color: "#525252" }}
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
};

export default Benefits;
