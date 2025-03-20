import React from 'react';
import { Box, Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EastIcon from '@mui/icons-material/East';

const flights = [
  {
    from: 'New York',
    to: 'Mumbai',
    price: '$567',
    image: '/images/flights/mumbai.jpg',
  },
  {
    from: 'San Francisco',
    to: 'Hyderabad',
    price: '$425',
    image: '/images/flights/hyderabad.jpg',
  },
  {
    from: 'Chicago',
    to: 'Delhi',
    price: '$739',
    image: '/images/flights/delhi.jpg',
  },
  {
    from: 'Atlanta',
    to: 'Mumbai',
    price: '$819',
    image: '/images/flights/atlanta.jpg',
  },
];

const LatestFlightDeals = () => {
  return (
    <Box sx={{ bgcolor: 'white', borderRadius: 2, p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Latest International Flight Deals</Typography>
        <ArrowForwardIosIcon sx={{ color: 'primary.main' }} />
      </Box>
      <Grid container spacing={3}>
        {flights.map((flight, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <Box
                component="img"
                src={flight.image}
                alt={`${flight.from} to ${flight.to}`}
                sx={{
                  width: '100%',
                  height: 160,
                  objectFit: 'cover',
                }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="body2">{flight.from}</Typography>
                  <EastIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">{flight.to}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary.main">
                    {flight.price}
                  </Typography>
                  <Button variant="contained" size="small">
                    Book Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LatestFlightDeals; 