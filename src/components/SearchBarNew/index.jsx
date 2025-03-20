import React, { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "../../store/slices/searchFilterSlice";
import flip from "../../img/flip.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import {
  Box,
  Button,
  ClickAwayListener,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Popper,
  Radio,
  RadioGroup,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const SearchBarNew = ({ isLoading, fetchFlights = () => {} }) => {
  const navigate = useNavigate();
  const searchFilterData = useSelector((state) => state.searchFilter);
  const dispatch = useDispatch();
  const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  // for from
  let airportMainData = [{ value: "", label: "Search By Typing..." }];
  let [airportList, setAirportList] = useState(airportMainData);
  const [showDropdown, setShowDropdown] = useState(false);

  const [getIsRotated, setGetIsRotated] = useState(0);

  // for to
  let airportMainDataTo = [{ value: "", label: "Search By Typing..." }];
  const [showDropdownTo, setShowDropdownTo] = useState(false);

  const token = "4OxFHioNEXm5Z8jtAtppkWnCdweG"; // Replace with your actual token

  // from
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

      if (response.data.meta.count > 0) {
        setAirportList(
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
      } else {
        setAirportList([{ value: "", label: "No Data..." }]);
      }
    } catch (error) {
      console.error("Error fetching airport data:", error);
      setAirportList([{ value: "", label: "No Data..." }]);
    }
  };

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
  const isSmallScreen = useMediaQuery("(max-width:699px)");

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

  return (
    <>
      <div className="search-bar-container">
        <section className="top-for-search">
          <div className="radio-search">
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
              <div style={{ display: "flex" }}>
                <FormControlLabel
                  value="ROUND"
                  control={<Radio />}
                  label="Round Trip"
                />
                <FormControlLabel
                  value="ONE"
                  control={<Radio />}
                  label="One Way"
                />
              </div>
            </RadioGroup>
          </div>
          <div className="economy-search">
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
                  width: isSmallScreen ? "110px" : "200px",
                  color: "#A64DFF",
                  height:'40px',
                  borderRadius: "12px",
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
          </div>
        </section>
        <div className="economy-search-mobile">
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
                borderRadius: "12px",
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
        </div>

        <section className="search-bar-container_input">
          {/* from */}
          <div className="__input __from">
            <section style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "8px", paddingTop: "3px" }}>
                {/* <FaMapMarkerAlt color="#989da8" size={17} /> */}
                <LocationOnIcon sx={{ color: "#7C8DB0", fontSize: 20 }} />
              </span>
              <input
                value={searchFilterData.departure_airport_name}
                onChange={(e) => {
                  setShowDropdown(true);

                  // setFromTypedInput(e.target.value);
                  dispatch(
                    setSearchFilter({
                      ...searchFilterData,
                      departure_airport_name: e.target.value,
                    })
                  );
                  fetchAirport(e.target.value);
                }}
                placeholder="From Where ?"
              />
            </section>
            <FlipButton setGetIsRotated={setGetIsRotated} />
            {showDropdown && (
              <section
                className="dropdown_"
                onMouseLeave={() => setShowDropdown(false)}
              >
                {airportList.map((item, i) => (
                  <p
                    onClick={() => {
                      setShowDropdown(false);
                      // setFromTypedInput(item.label);
                      dispatch(
                        setSearchFilter({
                          ...searchFilterData,
                          departure_airport: item.value,
                          departure_airport_name: item.label,
                        })
                      );
                    }}
                    key={i}
                  >
                    {item.label}
                  </p>
                ))}
              </section>
            )}
          </div>
          {/* from */}

          {/* to */}
          <div className="__input __from">
            <section style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  marginLeft: !isMobile?"8px":"0px",
                  marginRight: "8px",
                  paddingTop: "3px",
                }}
              >
                {/* <FaMapMarkerAlt color="#989da8" size={17} /> */}
                <LocationOnIcon sx={{ color: "#7C8DB0", fontSize: 20 }} />
              </span>
              <input
                value={searchFilterData.arrival_airport_name}
                onChange={(e) => {
                  setShowDropdownTo(true);
                  // setToTypedInput(e.target.value);
                  dispatch(
                    setSearchFilter({
                      ...searchFilterData,
                      arrival_airport_name: e.target.value,
                    })
                  );
                  fetchAirport(e.target.value);
                }}
                placeholder="Where to ?"
              />
            </section>
            {showDropdownTo && (
              <section
                className="dropdown_"
                onMouseLeave={() => setShowDropdownTo(false)}
              >
                {airportList.map((item, i) => (
                  <p
                    onClick={() => {
                      setShowDropdownTo(false);
                      // setToTypedInput(item.label);
                      dispatch(
                        setSearchFilter({
                          ...searchFilterData,
                          arrival_airport: item.value,
                          arrival_airport_name: item.label,
                        })
                      );
                    }}
                    key={i}
                  >
                    {item.label}
                  </p>
                ))}
              </section>
            )}
          </div>
          {/* to */}

          {/* 2nd */}
          {/* <div className="__input">
            <input placeholder="To" />
          </div> */}
          {/* 3rd */}
          <div className="__input">
            {searchFilterData.trip_type == "ROUND" && (
             <DatePicker
             className="date_picker_input"
             selected={searchFilterData.departure_date}
             onChange={onChangeDateRange}
             minDate={new Date(new Date().setMonth(new Date().getMonth() - 3))}
             maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
             startDate={searchFilterData.departure_date}
             endDate={searchFilterData.return_date}
             selectsRange
             dateFormat="dd/MMM/yyyy"
             placeholderText="Departure - Return"
             monthsShown={2}
             onKeyDown={(e) => e.preventDefault()} 
           />
           
            )}
            {searchFilterData.trip_type != "ROUND" && (
              <DatePicker
                className="date_picker_input"
                // showIcon
                // icon="P"
                selected={searchFilterData.departure_date}
                onChange={onChangeDate}
                minDate={new Date(new Date().setMonth(new Date().getMonth() - 3))}
                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
                // startDate={searchFilterData.departure_date}
                // endDate={searchFilterData.return_date}
                format="DD/MMM/YYYY"
                placeholderText="Departure"
                monthsShown={2}
             onKeyDown={(e) => e.preventDefault()} 

                // inline
                // withPortal
              />
            )}
          </div>
          {/* 4th */}
          <div className="__input">
            <PassengerSelector />
          </div>
          {/* 5th */}
          <div
            className="__input search-btn"
            onClick={() => {
              if (location.pathname == "/flights") {
                navigate("/flights", { state: "home" });
                fetchFlights();
              } else {
                navigate("/flights", { state: "home" });
              }
            }}
          >
            Search
          </div>
          {/*  */}
        </section>
      </div>
    </>
  );
};

export default SearchBarNew;

const FlipButton = ({ setGetIsRotated }) => {
  const [rotated, setRotated] = useState(false);
  const dispatch = useDispatch();
  const {
    arrival_airport,
    arrival_airport_name,
    departure_airport,
    departure_airport_name,
  } = useSelector((state) => state.searchFilter);

  return (
    <button
      className="flip-btn_"
      onClick={() => {
        setRotated(!rotated);
        dispatch(
          setSearchFilter({
            departure_airport: arrival_airport,
            departure_airport_name: arrival_airport_name,
            arrival_airport: departure_airport,
            arrival_airport_name: departure_airport_name,
          })
        );
      }} // Toggle rotation state
    >
      <img
        src={flip}
        alt="Flip"
        className={`flip-img ${rotated ? "rotated" : ""}`} // Apply class conditionally
      />
    </button>
  );
};

const PassengerSelectorOld = () => {
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

const PassengerSelector = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [seniors, setSeniors] = useState(0);
  const [infants, setInfants] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (type, value) => {
    if (type === "adults") setAdults(value);
    if (type === "children") setChildren(value);
    if (type === "seniors") setSeniors(value);
    if (type === "infants") setInfants(value);
  };

  return (
    <div className="passenger-selector">
      <div className="selector-box" onClick={() => setOpen(!open)}>
        {adults} Adults
        {/* {children} Ch..., {seniors} S..., {infants} In... */}
      </div>

      {open && (
        <div className="dropdown" onMouseLeave={() => setOpen(false)}>
          {["Adults", "Children", "Seniors", "Infants"].map((label, index) => {
            const type = label.toLowerCase();
            const state = { adults, children, seniors, infants }[type];
            const min = type === "adults" ? 1 : 0;

            return (
              <div className="row" key={type}>
                <span>{label}</span>
                <div className="counter">
                  <button
                    onClick={() => handleChange(type, Math.max(min, state - 1))}
                    disabled={state === min}
                  >
                    -
                  </button>
                  <span>{state}</span>
                  <button onClick={() => handleChange(type, state + 1)}>
                    +
                  </button>
                </div>
              </div>
            );
          })}

          <button className="done-btn" onClick={() => setOpen(false)}>
            Done
          </button>
        </div>
      )}

      <style jsx>{`
        .passenger-selector {
          position: relative;
          // width: 250px;
          font-family: Arial, sans-serif;
        }

        .selector-box {
          // padding: 10px;
          // border: 1px solid #ccc;
          border-radius: 5px;
          cursor: pointer;
          background: #fff;
        }

        .dropdown {
          position: absolute;
          top: 40px;
          left: 0;
          background: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 10px;
          border-radius: 5px;
          width: 100%;
          z-index: 10;
          width: 250px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 0;
        }

        .counter button {
          padding: 5px 10px;
          border: none;
          background: #ddd;
          cursor: pointer;
          margin: 0 5px;
          border-radius: 3px;
        }

        .counter button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .done-btn {
          width: 100%;
          padding: 8px;
          background: #a64dff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

const TripFilter = ({ searchFilterData, setSearchFilter }) => {
  const [tripType, setTripType] = useState(searchFilterData.trip_type);
  const [travelClass, setTravelClass] = useState(searchFilterData.travel_class);

  const handleTripTypeChange = (value) => {
    setTripType(value);
    setSearchFilter({ ...searchFilterData, trip_type: value });
  };

  const handleTravelClassChange = (value) => {
    setTravelClass(value);
    setSearchFilter({ ...searchFilterData, travel_class: value });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <label style={{ fontWeight: "bold" }}>
          <input
            type="radio"
            name="tripType"
            value="ROUND"
            checked={tripType === "ROUND"}
            onChange={() => handleTripTypeChange("ROUND")}
            style={{ accentColor: "#A64DFF" }}
          />
          Round Trip
        </label>
        <label style={{ fontWeight: "bold" }}>
          <input
            type="radio"
            name="tripType"
            value="ONE"
            checked={tripType === "ONE"}
            onChange={() => handleTripTypeChange("ONE")}
            style={{ accentColor: "#A64DFF" }}
          />
          One Way
        </label>
      </div>
      <div>
        <select
          value={travelClass}
          onChange={(e) => handleTravelClassChange(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            fontWeight: "600",
            color: "#A64DFF",
            border: "1px solid #A64DFF",
            borderRadius: "4px",
          }}
        >
          <option value="economy">Economy</option>
          <option value="premium_economy">Premium Economy</option>
          <option value="business">Business</option>
          <option value="first_class">First Class</option>
        </select>
      </div>
    </div>
  );
};
