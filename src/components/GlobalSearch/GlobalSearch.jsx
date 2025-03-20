import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Autocomplete,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  useTheme,
  useMediaQuery,
  Typography,
  Popper,
  ClickAwayListener,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "../../store/slices/searchFilterSlice";
import "./index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import moment from "moment";
import axios from "axios";
import flip from "../../img/flip.png";

const passengerOptions = [1, 2, 3, 4, 5];

function FlightBookingForm({ isLoading, fetchFlights }) {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const searchFilterData = useSelector((state) => state.searchFilter);
  const dispatch = useDispatch();

  const { departure_date, return_date } = useSelector(
    (state) => state.searchFilter
  );
  const dateRange = [dayjs(departure_date), dayjs(return_date)];

  const handleDateChange = (newValue) => {
    if (!newValue || !newValue[0] || !newValue[1]) return;

    dispatch(
      setSearchFilter({
        departure_date: newValue[0].format("YYYY-MM-DD"),
        return_date: newValue[1].format("YYYY-MM-DD"),
      })
    );
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChangeDateRange = (dates) => {
    const [start, end] = dates;
    dispatch(
      setSearchFilter({
        ...searchFilterData,
        departure_date: start,
        return_date: end,
      })
    );
  };
  const onChangeDate = (date) => {
    dispatch(
      setSearchFilter({
        ...searchFilterData,
        departure_date: date,
        return_date: null,
      })
    );
  };

  // [
  //   "AK",
  //   "AL",
  //   "AZ",
  //   "AR",
  //   "CA",
  //   "LHR",
  //   "LGW",
  //   "STN",
  //   "LTN",
  //   "LAX",
  // ]
  const [flightOptions, setFlightOptions] = useState([]);
  const [flightToOptions, setFlightToOptions] = useState([]);

  const token = "cuUHulpd3osiY2walIW1KJB0ROau"; // Replace with your actual token
  const fetchAirport = async (input) => {
    if (input.length < 2) return;

    try {
      const response = await axios.get(
        "https://test.api.amadeus.com/v1/reference-data/locations",
        {
          params: {
            subType: "AIRPORT,CITY",
            keyword: input,
            "page[limit]": 10,
            "page[offset]": 0,
            sort: "analytics.travelers.score",
            view: "FULL",
          },
          headers: {
            Authorization: `Bearer ${token}`, // Passing token in the header
            "Content-Type": "application/json",
          },
        }
      );

      setFlightOptions(
        response.data.data.map((item) => {
          let obj = {
            value: item.iataCode.toLowerCase(),
            label:
              item.name.toLowerCase() +
              " (" +
              item.iataCode.toLowerCase() +
              ")",
          };
          return obj;
        })
      );
    } catch (error) {
      console.error("Error fetching airport data:", error);
    }
  };

  const fetchToAirport = async (input) => {
    if (input.length < 2) return;

    try {
      const response = await axios.get(
        "https://test.api.amadeus.com/v1/reference-data/locations",
        {
          params: {
            subType: "AIRPORT,CITY",
            keyword: input,
            "page[limit]": 10,
            "page[offset]": 0,
            sort: "analytics.travelers.score",
            view: "FULL",
          },
          headers: {
            Authorization: `Bearer ${token}`, // Passing token in the header
            "Content-Type": "application/json",
          },
        }
      );

      setFlightToOptions(
        response.data.data.map((item) => {
          let obj = {
            value: item.iataCode.toLowerCase(),
            label:
              item.name.toLowerCase() +
              " (" +
              item.iataCode.toLowerCase() +
              ")",
          };
          return obj;
        })
      );
    } catch (error) {
      console.error("Error fetching airport data:", error);
    }
  };

  return (
    <Box sx={{ padding: isMobile ? 0 : 0 }}>
      <Grid
        className="text-capitalize"
        container
        spacing={2}
        alignItems="center"
        position={"relative"}
      >
        <FlipButton />
        {/* From (Searchable Dropdown) */}
        <Grid item xs={12} sm={6} md={2.75}>
          <Autocomplete
            value={searchFilterData.departure_airport_name}
            onChange={(event, newValue) => {
              dispatch(
                setSearchFilter({
                  ...searchFilterData,
                  departure_airport: newValue.value,
                  departure_airport_name: newValue.label,
                })
              );
            }}
            options={flightOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                label="From"
                onChange={(e) => {
                  // setSearchFilterData({
                  //   ...searchFilterData,
                  //   departure_airport: e.target.value,
                  // });
                  fetchAirport(event.target.value);
                  dispatch(
                    setSearchFilter({
                      ...searchFilterData,
                      departure_airport: e.target.value,
                    })
                  );
                }}
                placeholder="Select From"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="#7C8DB0" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            )}
          />
        </Grid>

        {/* To (Searchable Dropdown) */}
        <Grid item xs={12} sm={6} md={2.75}>
          <Autocomplete
            value={searchFilterData.arrival_airport_name}
            onChange={(event, newValue) =>
              dispatch(
                setSearchFilter({
                  ...searchFilterData,
                  arrival_airport: newValue.value,
                  arrival_airport_name: newValue.label,
                })
              )
            }
            options={flightToOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                label="To"
                onChange={(e) => {
                  fetchToAirport(event.target.value);
                  dispatch(
                    setSearchFilter({
                      ...searchFilterData,
                      arrival_airport: e.target.value,
                    })
                  );
                }}
                placeholder="Select To"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="#7C8DB0" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            )}
          />
        </Grid>

        {/* Departure Date Picker */}
        {/* <Grid item xs={12} sm={6} md={2.4} sx={{ width: "100%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={dateRange}
              onChange={handleDateChange}
              renderTextField={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Date"
                  placeholder="Select Date Range"
                  value={
                    dateRange[0] && dateRange[1]
                      ? `${dateRange[0].format(
                          "DD/MM/YYYY"
                        )} - ${dateRange[1].format("DD/MM/YYYY")}`
                      : ""
                  }
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Grid> */}
        <Grid item xs={12} sm={6} md={2.75}>
          {searchFilterData.trip_type == "ROUND" && (
            <DatePicker
              className="date_picker_input"
              // showIcon
              // icon="P"
              selected={searchFilterData.departure_date}
              onChange={onChangeDateRange}
              // minDate={new Date()}
              startDate={searchFilterData.departure_date}
              endDate={searchFilterData.return_date}
              selectsRange
              format="DD/MMM/YYYY"
              placeholderText="Departure - Return"
              monthsShown={2}
              // inline
              // withPortal
            />
          )}
          {searchFilterData.trip_type != "ROUND" && (
            <DatePicker
              className="date_picker_input"
              // showIcon
              // icon="P"
              selected={searchFilterData.departure_date}
              onChange={onChangeDate}
              minDate={new Date()}
              // startDate={searchFilterData.departure_date}
              // endDate={searchFilterData.return_date}
              format="DD/MMM/YYYY"
              placeholderText="Departure"
              monthsShown={2}
              // inline
              // withPortal
            />
          )}
        </Grid>

        {/* Passenger Selection */}
        <Grid item xs={12} sm={6} md={2.75}>
          {/* <FormControl fullWidth>
            <InputLabel>Passengers</InputLabel>
            <Select
              value={searchFilterData.num_passengers}
              onChange={(event) =>
                dispatch(
                  setSearchFilter({
                    num_passengers: event.target.value,
                  })
                )
              }
              label="Passengers"
            >
              {passengerOptions.map((count) => (
                <MenuItem key={count} value={count}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <PassengerSelector />
        </Grid>

        {/* Search Button */}
        <Grid item xs={12} sm={6} md={1}>
          <Button
            disabled={isLoading}
            onClick={() => {
              if (location.pathname == "/flights") {
                navigate("/flights", { state: "home" });
                fetchFlights();
              } else {
                navigate("/flights", { state: "home" });
              }
            }}
            variant="contained"
            sx={{
              backgroundColor: "#A64DFF",
              "&:hover": {
                backgroundColor: "#6419DD",
              },
              height: 55,
            }}
            fullWidth
          >
            {!isLoading ? "Search" : "Loading..."}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FlightBookingForm;

const FlipButton = () => {
  const [rotated, setRotated] = useState(false);
  const dispatch = useDispatch();
  const {
    arrival_airport,
    arrival_airport_name,
    departure_airport,
    departure_airport_name,
  } = useSelector((state) => state.searchFilter);
  useEffect(() => {
    dispatch(
      setSearchFilter({
        departure_airport: arrival_airport,
        departure_airport_name: arrival_airport_name,
        arrival_airport: departure_airport,
        arrival_airport_name: departure_airport_name,
      })
    );
  }, [rotated]);

  return (
    <button
      className="flip-btn"
      onClick={() => setRotated(!rotated)} // Toggle rotation state
    >
      <img
        src={flip}
        alt="Flip"
        className={`flip-img ${rotated ? "rotated" : ""}`} // Apply class conditionally
      />
    </button>
  );
};

const PassengerSelector = () => {
  const dispatch = useDispatch();
  const searchFilterData = useSelector((state) => state.searchFilter);

  const [adults, setAdults] = useState(searchFilterData.num_adult || 1);
  const [children, setChildren] = useState(searchFilterData.num_child || 0);
  const [seniors, setSeniors] = useState(searchFilterData.num_senior || 0);
  const [infants, setInfants] = useState(searchFilterData.num_infant || 0);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleChange = (type, value) => {
    if (type === "adults") setAdults(value);
    if (type === "children") setChildren(value);
    if (type === "seniors") setSeniors(value);
    if (type === "infants") setInfants(value);

    dispatch(
      setSearchFilter({
        ...searchFilterData,
        num_passengers: type === "adults" ? value : adults,
        num_adult: type === "adults" ? value : adults,
        num_child: type === "children" ? value : children,
        num_senior: type === "seniors" ? value : seniors,
        num_infant: type === "infants" ? value : infants,
      })
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <FormControl fullWidth>
      <Select
        open={false} // Prevents default dropdown behavior
        value={`${adults} Adults, ${children} Children, ${seniors} Seniors, ${infants} Infants`}
        onClick={handleDropdownClick}
        renderValue={() =>
          `${adults} Adults, ${children} Children, ${seniors} Seniors, ${infants} Infants`
        }
      >
        <MenuItem
          value={`${adults} Adults, ${children} Children, ${seniors} Seniors, ${infants} Infants`}
        >
          {adults} Adults, {children} Children, {seniors} Seniors, {infants}{" "}
          Infants
        </MenuItem>
      </Select>

      {/* Custom Popper for Dropdown Options */}
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <Box
            sx={{
              background: "white",
              boxShadow: 3,
              p: 2,
              borderRadius: 2,
              minWidth: 250,
            }}
          >
            {/* Passenger Type Sections */}
            {[
              {
                label: "Adults",
                type: "adults",
                min: 1,
                state: adults,
                setState: setAdults,
              },
              {
                label: "Children",
                type: "children",
                min: 0,
                state: children,
                setState: setChildren,
              },
              {
                label: "Seniors",
                type: "seniors",
                min: 0,
                state: seniors,
                setState: setSeniors,
              },
              {
                label: "Infants",
                type: "infants",
                min: 0,
                state: infants,
                setState: setInfants,
              },
            ].map(({ label, type, min, state }) => (
              <Box
                key={type}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography>{label}</Typography>
                <Box display="flex" alignItems="center">
                  <Button
                    onClick={() => handleChange(type, Math.max(min, state - 1))}
                    disabled={state === min}
                  >
                    -
                  </Button>
                  <Typography mx={2}>{state}</Typography>
                  <Button onClick={() => handleChange(type, state + 1)}>
                    +
                  </Button>
                </Box>
              </Box>
            ))}

            {/* Done Button to Close Menu */}
            <Box textAlign="center" mt={2}>
              <Button variant="contained" onClick={handleClose} fullWidth>
                Done
              </Button>
            </Box>
          </Box>
        </ClickAwayListener>
      </Popper>
    </FormControl>
  );
};
