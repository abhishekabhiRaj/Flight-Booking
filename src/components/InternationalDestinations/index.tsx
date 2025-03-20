import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const destinations = [
  {
    city: "New York",
    country: "USA",
    price: "$147",
    image: "/images/newyork.jpg",
  },
  {
    city: "San Francisco",
    country: "USA",
    price: "$157",
    image: "/images/sanfran.jpg",
  },
  {
    city: "Chicago",
    country: "USA",
    price: "$167",
    image: "/images/chicago.jpg",
  },
  {
    city: "Atlanta",
    country: "USA",
    price: "$187",
    image: "/images/atlanta.jpg",
  },
];

const InternationalDestinations = () => {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">Latest International Flight Deals</Typography>
        <ArrowForwardIosIcon />
      </Box>
      <Grid container spacing={3}>
        {destinations.map((dest, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={dest.image}
                alt={dest.city}
              />
              <CardContent>
                <Typography variant="h6">{dest.city}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {dest.country}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  {dest.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default InternationalDestinations;
