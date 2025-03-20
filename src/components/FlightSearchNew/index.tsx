import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GlobalSearch from "../GlobalSearch/GlobalSearch";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "../../store/slices/searchFilterSlice";
import SearchBarNew from "../SearchBarNew";

const FlightSearchNewOld = ({ isLoading, fetchFlights = () => {} }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const searchFilterData = useSelector((state) => state.searchFilter);
  const dispatch = useDispatch();

  const handleTripTypeChange = (value) => {
    dispatch(
      setSearchFilter({
        ...searchFilterData,
        trip_type: value,
        departure_date: "",
        return_date: "",
      })
    );
  };

  const setSearchFilterData = () => {};

  // const [searchFilterData, setSearchFilterData] = useState({
  //   trip_type: "ROUND",
  //   departure_airport: "LAX",
  //   arrival_airport: "LHR",
  //   departure_date: "2025-02-18",
  //   return_date: "2025-03-19",
  //   num_passengers: 3,
  // });

  return (
    <div className="fligt-book-form" style={{ padding: "16px" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          sx={{
            display: "flex",
            justifyContent: isSmallScreen ? "center" : "flex-start",
            alignItems: "center",
          }}
        >
          <RadioGroup
            row={!isSmallScreen}
            value={searchFilterData.trip_type}
            onChange={(event) => handleTripTypeChange(event.target.value)}
            aria-label="trip type"
            sx={{
              "& .MuiRadio-root.Mui-checked": {
                color: "#A64DFF",
              },
              "& .MuiFormControlLabel-label": {
                fontWeight: "bold",
              },
              display: "flex",
              justifyContent: isSmallScreen ? "center" : "flex-start",
              alignItems: "center", // Center the radio buttons vertically
              paddingLeft: !isSmallScreen ? 2 : 0,
              width: !isSmallScreen ? "100%" : "100%", // Full width on small screens
            }}
          >
            <FormControlLabel
              value="ROUND"
              control={<Radio />}
              label="Round Trip"
            />
            <FormControlLabel value="ONE" control={<Radio />} label="One Way" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            {/* <InputLabel>Travel Class</InputLabel> */}
            <Select
              value={searchFilterData.travel_class}
              onChange={(event) => {
                dispatch(
                  setSearchFilter({
                    ...searchFilterData,
                    travel_class: event.target.value,
                  })
                );
              }}
              // label="Travel Class"
              sx={{
                width: "100%",
                color: "#A64DFF",
                fontWeight: 600, // Changes selected value color to red
                "& .MuiSelect-select": { color: "#A64DFF" }, //
              }}
            >
              <MenuItem value="economy">Economy</MenuItem>
              <MenuItem value="premium_economy">Premium Economy</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="first_class">First Class</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div style={{ marginTop: "18px" }}></div>
      <GlobalSearch
        isLoading={isLoading}
        fetchFlights={fetchFlights}
        searchFilterData={searchFilterData}
        setSearchFilterData={setSearchFilterData}
      />
    </div>
  );
};

const FlightSearchNew = ({ isLoading, fetchFlights = () => {} }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const searchFilterData = useSelector((state) => state.searchFilter);
  const dispatch = useDispatch();

  const handleTripTypeChange = (value) => {
    dispatch(
      setSearchFilter({
        ...searchFilterData,
        trip_type: value,
        departure_date: "",
        return_date: "",
      })
    );
  };

  const setSearchFilterData = () => {};

  // const [searchFilterData, setSearchFilterData] = useState({
  //   trip_type: "ROUND",
  //   departure_airport: "LAX",
  //   arrival_airport: "LHR",
  //   departure_date: "2025-02-18",
  //   return_date: "2025-03-19",
  //   num_passengers: 3,
  // });

  return (
    <div className="fligt-book-form" style={{ padding: "16px" }}>
      <SearchBarNew
        isLoading={false}
        fetchFlights={fetchFlights}
        searchFilterData={searchFilterData}
        setSearchFilterData={setSearchFilterData}
      />
    </div>
  );
};

export default FlightSearchNew;
