import {
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import Title from "../Title";
import shareDetailImg from "../../img/shareDetail.png";
import "./index.css";
import { useNavigate } from "react-router-dom";

function DestinationDeals() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const data = [
    {
      title: "Destination Deals",
      lists: [
        "Flights under $200",
        "Last minute travel deals",
        "Travel deals",
        "All our destinations",
      ],
    },
    {
      title: "Cheap International Flights from Popular US Cities to India (IN)",
      lists: [
        "Cheap flights from Newark to India",
        "Cheap flights from Detroit to India",
        "Cheap flights from Houston to India",
        "Cheap flights from Chicago to India",
        "Cheap flights from Seattle-Tacoma to India",
        "Cheap flights from Los Angeles to India",
        "Cheap tights from washington to India",
        "Uneaf flights from Atlanta to India",
      ],
    },
    {
      title: "Top International City Pairs",
      lists: [
        "Cheap flights from San Francisco to New Welhi",
        "Cheap flights from Newark to Ahmedabad",
        "Cheap tights from Chicago to Hyderabad",
        "Cheap flights from San Francisco to Mumbal",
        "Cheap flights from San Francisco to Hyderabad",
        "Cheao flionts from Newark to Mumbai",
        "Chean flights from Washington to Hyderabad",
        "Cheap flights from Dallas to Hyderabad",
        "Cheap flights from New York to Hyderabad",
        "Cheap flights from Newark to Hyderabad",
      ],
    },
    {
      title: "Best Last Minute Flights",
      lists: [
        "Cheap last minute flights from San Francisco to New Delhi",
        "Cheap last minute flights from Newark to Ahmedabad",
        "Cheap last minute flights from Chicago to Hyderabad",
        "Cheap last minute flights from San Francisco to Mumbai",
        "Cheap last minute flights from San Francisco to Hyderabad",
        "Cheap last minute flights from Newark to Mumbai",
        "Cheap last minute flights from Washington  to Hyderabad",
        "Cheap last minute flights from Dallas to Hyderabad",
        "Cheap last minute flights from New York to Hyderabad",
        "Cheap last minute flights from Newark to Hyderabad",
      ],
    },
    {
      title: "Top Destination Airports",
      lists: [
        "Cheap flights to Rajiv Gandhi International Airport",
        "Cheap flights to Chhatrapati Shivaji International Airport",
        "Cheap flights to Indira Gandhi International Airport",
        "Cheap flights to Chennai Airport",
        "Cheap flights to Ahmedabad Airport",
        "Cheap flights to Bengaluru International Airport",
        "Cheap flights to Cochin International Airport",
        "Cheap flights to Netaji Subhas Chandra Bose Airport",
        "Cheap flights to Trivandrum International Airport",
        "Cheap flights to Vadodara Airport",
      ],
    },
    {
      title: "Top International Airlines",
      lists: [
        "Cheap flights with United Airlines",
        "Cheap flights with Emirates",
        "Cheap flights with Etihad Airways",
        "Cheap flights with Lufthansa",
        "Cheap flights with Delta Air Lines",
        "Cheap flights with Air India",
        "Cheap flights with British Airways",
        "Cheap flights with Qatar Airways",
        "Cheap flights with Singapore Airlines",
        "Cheap flights with Cathay Pacific",
      ],
    },
    {
      title:
        "Cheap Business Class Flights from Popular Cities, with Major Airlines and to Top Indian Destinations",
      lists: [
        "Cheap Business class tickets from San Francisco to New Delhi",
        "Cheap Business class tickets from Newark to Ahmedabad",
        "Cheap Business class tickets from Chicago to Hyderabad",
        "Cheap Business class tickets from San Francisco to Mumbai",
        "Cheap Business class tickets from San Francisco to Hyderabad",
        "Cheap Business class tickets from Newark to Mumbai",
        "Cheap Business class tickets from Washington to Hyderabad",
        "Cheap Business class tickets from Dallas to Hyderabad",
        "Cheap Business class tickets from New York to Hyderabad",
        "Cheap Business class tickets from Newark to Hyderabad",
        "Cheap Business class tickets with United Airlines",
        "Cheap Business class tickets with Emirates",
        "Cheap Business class tickets with Etihad Airways",
        "Cheap Business class tickets with Lufthansa",
        "Cheap Business class tickets with Delta Air Lines",
        "Cheap Business class tickets with Air India",
        "Cheap Business class tickets with British Airways",
        "Cheap Business class tickets with Qatar Airways",
        "Cheap Business class tickets with Singapore Airlines",
        "Cheap Business class tickets with Cathay Pacific",
        "Cheap Business class tickets to Rajiv Gandhi International Airport",
        "Cheap Business class tickets to Chhatrapati Shivaji International Airport",
        "Cheap Business class tickets to Indira Gandhi International Airport",
        "Cheap Business class tickets to Chennai Airport",
        "Cheap Business class tickets to Ahmedabad Airport",
        "Cheap Business class tickets to Bengaluru International Airport",
        "Cheap Business class tickets to Cochin International Airport",
        "Cheap Business class tickets to Netaji Subhas Chandra Bose Airport",
        "Cheap Business class tickets to Trivandrum International Airport",
        "Cheap Business class tickets to Vadodara Airport",
      ],
    },
  ];
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
      <div className="">
        <section className="">
          <div className="left" style={{ width: "100%" }}>
            <Paper
              elevation={0}
              sx={{
                p: isMobile ? 1 : 0,
                borderRadius: 2,
                // maxWidth: 900,
                mx: "auto",
                backgroundColor: "transparent",
              }}
            >
              <Stack spacing={3}>
                {data.map((item, i) => (
                  <div key={i}>
                    <h4>{item.title}</h4>
                    <div>
                      {item.lists.map((list, j) => (
                        <span
                          onClick={() => {
                            // if (item.title != "Destination Deals") {
                            //   let parts = list.split(" from ")[1].split(" to ");
                            //   let from = parts[0]; // "Newark"
                            //   let to = parts[1]; // "India"
                            //   navigate("/booking", {
                            //     state: {
                            //       departure_airport: from,
                            //       departure_airport_name: from,
                            //       arrival_airport: to,
                            //       arrival_airport_name: to,
                            //     },
                            //   });
                            // }
                            let matches = list.match(
                              /\bfrom\s+(.+?)\s+to\s+(.+)/i
                            );
                            if (matches) {
                              let from = matches[1]; // "Newark"
                              let to = matches[2]; // "India"

                              navigate("/booking", {
                                state: {
                                  departure_airport: from,
                                  departure_airport_name: from,
                                  arrival_airport: to,
                                  arrival_airport_name: to,
                                },
                              });
                            }
                          }}
                          className="a_link"
                          style={{ fontSize: "13px" }}
                          key={j}
                        >
                          {list}, &nbsp;
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </Stack>
            </Paper>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default DestinationDeals;
