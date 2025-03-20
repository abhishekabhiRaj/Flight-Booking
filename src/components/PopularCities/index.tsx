import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const cities = [
  { name: 'Hyderabad', country: 'India', image: '/images/cities/hyderabad.jpg' },
  { name: 'New Delhi', country: 'India', image: '/images/cities/delhi.jpg' },
  { name: 'Pune', country: 'India', image: '/images/cities/pune.jpg' },
  { name: 'Bangalore', country: 'India', image: '/images/cities/bangalore.jpg' },
  { name: 'Kolkata', country: 'India', image: '/images/cities/kolkata.jpg' },
  { name: 'Mumbai', country: 'India', image: '/images/cities/mumbai.jpg' },
  { name: 'Chennai', country: 'India', image: '/images/cities/chennai.jpg' },
  { name: 'Ahmedabad', country: 'India', image: '/images/cities/ahmedabad.jpg' },
  { name: 'Bhopal', country: 'India', image: '/images/cities/bhopal.jpg' },
];

const PopularCities = () => {
  return (
    <Box sx={{ bgcolor: 'white', borderRadius: 2, p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6">Cities You Might Love</Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'primary.main',
                borderBottom: '2px solid',
                cursor: 'pointer'
              }}
            >
              India
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                cursor: 'pointer'
              }}
            >
              USA
            </Typography>
          </Box>
        </Box>
        <ArrowForwardIosIcon sx={{ color: 'primary.main' }} />
      </Box>
      <Grid container spacing={2}>
        {cities.map((city, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="100"
                image={city.image}
                alt={city.name}
              />
              <CardContent sx={{ p: 1 }}>
                <Typography variant="body2" noWrap>
                  {city.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularCities; 