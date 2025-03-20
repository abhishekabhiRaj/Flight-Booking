import React from "react";
import { Box, Container, Grid, Button, Typography } from "@mui/material";
// import deal1 from "../../img/bg/deal_1_bg.jpeg";
import { useNavigate } from "react-router-dom";
import deal1 from "../../img/deals/deals_1.png";
import deal2 from "../../img/deals/deals_2.png";
import deal3 from "../../img/deals/deals_3.png";
import Title from "../Title";
import "./index.css";

const deals = [
  {
    title: "Best Travel Offer",
    description: "Save up to $60",
    subtext: "on the domestic flights.*",
    bgColor: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  },
  {
    title: "Weekend Deal",
    description: "20% OFF",
    subtext: "on your first booking.*",
    bgColor: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
  },
  {
    title: "Deals With",
    description: "$200 onwards",
    subtext: "on the international flights.*",
    bgColor: "linear-gradient(135deg, #9D174D 0%, #DB2777 100%)",
  },
];

const DealsShowcase = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <div className="cards">
        <Title title="Deals to look out for" />
        <div className="deal-card-container">
          {deals.map((deal, index) => (
            <div onClick={() => navigate("/booking", { state: { id: index } })}>
              <img
                width="100%"
                src={[deal1, deal2, deal3][index]}
                alt={deal.title}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default DealsShowcase;

const DealsShowcaseOld = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ my: 0 }}>
      <div className="cards">
        <h1 style={{ paddingLeft: "20px" }}>Deals to look out for</h1>
        <Grid container spacing={3} padding={2} paddingTop={0}>
          {deals.map((deal, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 2,
                  color: "white",
                  background: deal.bgColor,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box>
                  <div
                    style={{
                      // position: "absolute",
                      top: "0",
                      left: "0",
                      // opacity: "0.2",
                    }}
                  >
                    <img width="100%" src={deal1} />
                  </div>
                  <Typography variant="h6" gutterBottom>
                    {deal.title}
                  </Typography>
                  <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
                    {deal.description}
                  </Typography>
                  <Typography variant="body2">{deal.subtext}</Typography>
                </Box>
                <Button
                  onClick={() => navigate("./deals/claim", { state: deal })}
                  variant="contained"
                  sx={{
                    mt: 2,
                    width: 140,
                    bgcolor: "#000000",
                    "&:hover": {
                      bgcolor: "rgba(9, 9, 9, 0.67)",
                    },
                  }}
                >
                  LEARN MORE
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};
