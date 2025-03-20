import React from "react";
import { Box, Container, Grid, Typography, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import img1 from "../../img/footer/1.png";
import img2 from "../../img/footer/2.png";
import img3 from "../../img/footer/3.png";
import img4 from "../../img/footer/4.png";
import img5 from "../../img/footer/5.png";
import img6 from "../../img/footer/6.png";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./index.css";
import Test from "../Test";
// Payment method images
const paymentMethods = [
  { name: "American Express", src: img1 },
  { name: "PayPal", src: img2 },
  { name: "Visa", src: img3 },
  { name: "Mastercard", src: img4 },
  { name: "Discover", src: img5 },
  { name: "ICICI", src: img6 },
];

const handleContactClick = () => {
  setTimeout(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};

const Footer = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  return (
    <Box sx={{ bgcolor: "#311355", color: "white", pt: 6, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Contact Us Section */}
          <Grid item xs={6} md={5}>
            <p className="font-18 font-weight-700 mb-2">Contact Us</p>
            <Stack spacing={1}>
              <p className="font-12 font-weight-400">Address: Address</p>
              <p className="font-12 font-weight-400">
                Email: support@triwize.com
              </p>
              <p className="font-12 font-weight-400">
                Phone: +1 (xxx)-xxx-xxxx
              </p>
            </Stack>
          </Grid>
          {/* Quick Links Section */}
          <Grid item xs={6} md={5}>
            <p className="font-18 font-weight-700 mb-2">Quick Links</p>
            <Stack spacing={1}>
              <Link
                component={RouterLink}
                to="/"
                color="inherit"
                underline="hover"
              >
                <span className="font-12 font-weight-400">Home</span>
              </Link>
              <Link
                component={RouterLink}
                to="/disclaimer"
                color="inherit"
                underline="hover"
              >
                <span className="font-12 font-weight-400">Disclaimer</span>
              </Link>
              <Link
                component={RouterLink}
                to="/privacy-policy"
                color="inherit"
                underline="hover"
              >
                <span className="font-12 font-weight-400">Privacy Policy</span>
              </Link>
              <Link
                component={RouterLink}
                to="/cookie-policy"
                color="inherit"
                underline="hover"
              >
                <span className="font-12 font-weight-400">Cookie Policy</span>
              </Link>
              <Link
                component={RouterLink}
                to="/terms"
                color="inherit"
                underline="hover"
              >
                <span className="font-12 font-weight-400">
                  Terms & Conditions
                </span>
              </Link>
              <Link
                component={RouterLink}
                to="/refund-policy"
                color="inherit"
                underline="hover"
              >
                <span className="font-12 font-weight-400">
                  Refund & Chargeback Policy
                </span>
              </Link>
            </Stack>
          </Grid>

          {/* Help Section */}
          <Grid item xs={12} md={2}>
            <p className="font-18 font-weight-700 mb-2">Help</p>
            <Stack spacing={1}>
              <Link
                component={RouterLink}
                to="/chat"
                color="inherit"
                underline="hover"
              >
                <span className="font-12 font-weight-400">Chat</span>
              </Link>
              <Link
                component={RouterLink}
                to="/disclaimer"
                color="inherit"
                underline="hover"
              >
                <span className="font-12 font-weight-400">Disclaimer</span>
              </Link>
              <span
                // component={RouterLink}
                // to="/#"
                onClick={handleContactClick}
                color="inherit"
                underline="hover"
              >
                <span className="font-12 font-weight-400">Contact us</span>
              </span>
              <Link
                component={RouterLink}
                to="/coins"
                color="inherit"
                underline="hover"
              >
                <span className="font-12 font-weight-400">Triwize Coins</span>
              </Link>
              <Link
                component={RouterLink}
                to="/invest"
                color="inherit"
                underline="hover"
              >
                <span className="font-12 font-weight-400">Invest</span>
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <div className="mt-3"></div>
        <Test />

        {/* Disclaimer Section */}
        <Box sx={{ mt: 4 }}>
          <p className="font-18 font-weight-700 mb-2">Disclaimer:</p>
          <p className="font-10 font-weight-400 mb-1">
            This information provides some of best air fares for flights from
            USA which are subject to availability. Please do let us know, once
            you have picked the fare of your choice to confirm the availability
            of seats for a specified date.
          </p>
          <p className="font-10 font-weight-400 mb-2">
            SPL Fare** All Fares are subject to Availability, Fares are Special
            Call only Fares may change at the time of Booking, Fares Shown are
            Base Fares without Taxes. * All above Fares are in USD (United
            States Dollar)
          </p>
          <hr />
          <p className="font-10 font-weight-400 mb-2 mt-2">
            *Lowest Fare Guarantee - We are so sure that our bulk private fares
            are unbeatable that we will give you a Low Fare Guarantee! As long
            as you call us within 24 hours from the purchase of your ticket and
            you provide us with a copy of the itinerary from any of our
            competitors which will include identical itinerary, including the
            fare basis and fare calculation information, we will match the price
            and send you $50 voucher to use towards your next purchase of any
            bulk private fares. <br />
            <br /> All the advertised promos on top page 'Banners' are subject
            to individual rules. Please, click on each banner to learn all the
            advertised promo details. Savings of up to 50% off are indicated off
            the full un-restricted (i.e. refundable) published “Y” class
            airfares of major scheduled airlines. Savings may vary based on
            availability, advance purchase, minimum stay, travel dates, and
            blackout dates and may change without notice. To claim “Advertised
            Fare” and “Lowest Fare Guarantee” please, first, talk to your travel
            agent or email us at info@triwize.com or call us at xxx-xxx-xxxx.
            For more details check the website 'Rules & Conditions'.
            <br />
            <br />
            *Click below links to check individual fare rules for each city: To
            India & ISC : Delhi, Mumbai, Hyderabad, Ahmedabad, Bangalore,
            Chennai, Pune To North America : Las Vegas, Miami, Orlando, New
            York, Los Angeles, Dallas, Atlanta, Houston, Chicago, Phoenix,
            Washington, Fort Lauderdale
            <br />
            <br />
            Advertised Fare Guarantee: All the fares advertised on this website
            are guaranteed to be reasonably available within the specified
            travel period in the fare restrictions. If the fare is not
            available, ASAP Tickets will honor the advertised fare and sell the
            fare at the advertised level. To claim “Advertised Fare” and “Lowest
            Fare Guarantee” please, first, talk to your travel agent or email us
            at info@asaptickets.com or call us at 888-531-0722. For more details
            check the website 'Rules & Conditions'. 
            <br />
            <br /> ◊ Membership program is a subscription-based service known as
            “Dreampass Plus” offered to ASAP Tickets clients. The product is
            offered in 3 payment plans with automatic renewal: 3, 6 and 12
            months ($10.83 is a price per month choosing a 12-months plan).
            Cashback Program offers generous cashback in the form of Dreamcoins,
            up to 10% for every trip. International Emergency Medical Protection
            is a comprehensive medical coverage up to $500,000 for you and your
            family while traveling internationally. Global eSIM is a
            complimentary eSIM, featuring free internet access of 3GB, valid for
            30 days in 140+ countries for each trip purchased with ASAP Tickets.
            $100 Additional Credit is credit towards future ancillary purchases
            (like Travel Care Service and Lost Baggage Protection), which is
            available only for a 12-month membership. 
            <br />
            The $30 off Flight Voucher entitles the customer to a discount of
            $30 on air ticket purchases made with ASAP Tickets. The discount is
            applied when making a booking by calling ASAP Tickets. To redeem the
            voucher code [ASAP30], the customer is required to provide it to the
            Travel Agent before the booking is made. ASAP Tickets reserves the
            right to modify or terminate this promotion at any time without
            prior notice. The voucher is non-combinable with any other vouchers,
            the discount codes or other types of discounts. Other terms and
            conditions may apply.
          </p>
        </Box>

        {/* Copyright */}
        <p className="font-10 font-weight-400">
          Copyright © 2015-2024 TTL HOLIDAYS INC trading as FlyDealFare.com. All
          rights reserved (Website Developed & Managed by NETTONICS)
        </p>
      </Container>
    </Box>
  );
};

export default Footer;
