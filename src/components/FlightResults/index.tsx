import {
  Box,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import emiratesImg from "../../img/emirates.png";
import { dividerSvg } from "../../svg/divider.jsx";
import PersonIcon from "@mui/icons-material/Person";
import { bellIcon } from "../../svg/bell_icon.jsx";
import ads1 from "../../img/flight-ads-img.png";
import ads2 from "../../img/flight-ads-img-2.png";
import "./index.css";
import { useSelector } from "react-redux";
import moment from "moment";
import { BulletList } from "react-content-loader";
import { Loader } from "../Loader/index.jsx";
import { planGrey } from "../../svg/planeGrey.jsx";
import AllLeftArrow from "../../svg/pagination/allLeft.jsx";
import LeftArrowSvg from "../../svg/pagination/left.jsx";
import RightArrowSvg from "../../svg/pagination/right.jsx";
import RightAll from "../../svg/pagination/rightAll.jsx";

function FlightResults({
  currentPage,
  setCurrentPage,
  totalPage,
  totalData,
  handleSearch,
  isLoading,
  flightData,
  setFlightSelected = () => {},
  recom,
  noOfPage,
  pagination,
}) {
  const [selectedClass, setSelectedClass] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const [sliceFlightData, setSliceFlightData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(totalData); // Initial count
  const searchFilterData = useSelector((state) => state.searchFilter);

  useEffect(() => {
    setSliceFlightData(flightData.slice(0, visibleCount));
  }, [flightData, visibleCount]);

  const handleShowMore = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // if (currentPage > 1) {
    handleSearch();
    // }
  }, [currentPage]);

  return (
    <Box>
      {/* Flight Result */}
      <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
        <div className=" flight-booking-card-box">
          <section className="cards left" style={{ margin: 0 }}>
            {/* top */}
            {!isLoading && currentPage != totalPage && totalPage != 0 && (
              <WebCardTopFilter
                handleSearch={() => {}}
                selectedClass={selectedClass}
                handleChange={handleChange}
                recom={recom}
              />
            )}
            {!isLoading && currentPage != totalPage && totalPage != 0 && (
              <MobileCardTopFilter
                selectedClass={selectedClass}
                handleChange={handleChange}
              />
            )}

            <div style={{ height: "1040px", overflowY: "scroll" }}>
              {!isLoading ? (
                flightData.length != 0 ? (
                  flightData.map((item, i) => {
                    if (searchFilterData.trip_type != "ROUND") {
                      return (
                        <OneWayCard
                          isMobile={isMobile}
                          i={i}
                          item={item}
                          setFlightSelected={setFlightSelected}
                        />
                      );
                    } else {
                      return (
                        <TwoWayCard
                          isMobile={isMobile}
                          i={i}
                          item={item}
                          setFlightSelected={setFlightSelected}
                        />
                      );
                    }
                  })
                ) : (
                  <p
                    style={{
                      textAlign: "center",
                      border: "1px solid rgb(215, 215, 215)",
                      marginTop: "16px",
                      padding: "12px",
                      borderRadius: "8px",
                      letterSpacing: "4px",
                      color: "rgb(127, 127, 127)",
                    }}
                  >
                    NO DATA...
                  </p>
                )
              ) : (
                <div className="mt-3">
                  <Loader />
                </div>
              )}
              {!isLoading
                ? pagination.total_pages > 1 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "32px",
                      }}
                    >
                      <Pagination
                        totalPages={pagination.total_pages}
                        pageLimit={3}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                      />
                    </div>
                  )
                : ""}
            </div>
          </section>
          <section className=" right margin-top">
            <div className="cards" style={{ margin: 0 }}>
              <p
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                }}
                className="font-24 font-weight-700 text-grey-1"
              >
                <span
                  style={{
                    marginRight: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {bellIcon}
                </span>
                Get Fare Alerts
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#525252",
                  marginBottom: "24px",
                }}
                className="font-16 font-weight-400 text-grey-2"
              >
                <b>Del</b> - New Delhi IGI to <b>NYC</b> -New York All Airports
              </p>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Email Address..."
                  placeholder="email@gmail.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <button className="btn-secondary font-18 font-weight-700">
                Get Free Alerts
              </button>
              <p style={{ marginTop: "16px" }}>
                By signing up, you accept our{" "}
                <a href="#" style={{ color: "#FC7300" }}>
                  Terms and Conditions, Privacy Policy
                </a>
                and to receive emails.
              </p>
            </div>
            <div className=" mt-3">
              <img src={ads1} width="100%" />
            </div>
            <div className="cards mt-3" style={{ padding: 0 }}>
              <div
                style={{
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  overflow: "hidden",
                  // background: "red",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src={ads2} width="100%" />
              </div>
              <div style={{ padding: "22px", paddingTop: "12px" }}>
                <p className="font-24 font-weight-700 text-grey-1">
                  Let us help you book
                </p>
                <p className="font-12 font-weight-400 text-grey-2">
                  Personalized travel assistance by our live agents. Immediate
                  booking confirmation.
                </p>
                <button className="btn-secondary font-18 font-weight-700">
                  Contact Us
                </button>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </Box>
  );
}

export default FlightResults;

const WebCardTopFilter = ({
  handleSearch,
  selectedClass,
  handleChange,
  recom,
}) => {
  const [active, setActive] = useState("best");
  useEffect(() => {
    handleSearch();
  }, [active]);
  return (
    <div className="flight-search-filter card-top web-view">
      <section
        className="flight-search-filter-left"
        onClick={() => setActive("best")}
      >
        <p className="font-16 font-weight-400 text-grey-2">Best</p>
        <h3
          className={`flight-search-filter-price ${
            active == "best" && "text-FC7300"
          }`}
        >
          {recom.best_value.price.currency == "INR" ? "RS" : "$"}
          {recom.best_value.price.total}
        </h3>
        <p className="flight-search-filter-duration">
          {recom.best_value.duration}
        </p>
        {active == "best" && <div className="border-bottom"></div>}
      </section>
      <div className="horizontal-line"></div>

      <section
        className="flight-search-filter-middle"
        onClick={() => setActive("cheap")}
      >
        <p className="flight-search-filter-label">Cheapest</p>
        <h3
          className={`flight-search-filter-price ${
            active == "cheap" && "text-FC7300"
          }`}
        >
          {recom.cheapest.price.currency == "INR" ? "RS" : "$"}
          {recom.cheapest.price.total}
        </h3>
        <p className="flight-search-filter-duration">
          {" "}
          {recom.cheapest.duration}
        </p>
        {active == "cheap" && <div className="border-bottom"></div>}
      </section>
      <div className="horizontal-line"></div>

      <section
        className="flight-search-filter-right"
        onClick={() => setActive("fast")}
      >
        <p className="flight-search-filter-label">Fastest</p>
        <h3
          className={`flight-search-filter-price ${
            active == "fast" && "text-FC7300"
          }`}
        >
          {recom.fastest.price.currency == "INR" ? "RS" : "$"}
          {recom.fastest.price.total}
        </h3>
        <p className="flight-search-filter-duration">
          {" "}
          {recom.fastest.duration}
        </p>
        {active == "fast" && <div className="border-bottom"></div>}
      </section>
      <section>
        <div
          className="dropdown-container"
          style={{ marginRight: "24px", background: "#fff" }}
        >
          {/* <label htmlFor="travel-class" className="dropdown-label">
          Travel Class
        </label> */}
          {/* <select
            id="travel-class"
            className="class-dropdown"
            value={selectedClass}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Stops
            </option>
            <option value="direct">Direct</option>
            <option value="one">1 Stop</option>
            <option value="two">2 Stops</option>
            <option value="multiple">2+ Stops</option>
          </select> */}
          <FormControl fullWidth sx={{ zIndex: 0 }}>
            <InputLabel>Stop</InputLabel>
            <Select
              value={selectedClass}
              onChange={handleChange}
              label="Stop"
              sx={{ width: "100%" }}
            >
              <MenuItem value="direct">Direct</MenuItem>
              <MenuItem value="1">One Stop</MenuItem>
              <MenuItem value="2">Two Stop </MenuItem>
              <MenuItem value="-1">+2 Stop </MenuItem>
            </Select>
          </FormControl>
        </div>
      </section>
    </div>
  );
};

const MobileCardTopFilter = ({ selectedClass, handleChange }) => {
  return (
    <div className="mobile-view">
      <div className="card-top-mobile">
        <section style={{ display: "flex", justifyContent: "space-between" }}>
          <section>
            <p>Best</p>
            <h3>$200</h3>
            <p>9hr 40min</p>
          </section>
          <section>
            <p>Best</p>
            <h3>$200</h3>
            <p>9hr 40min</p>
          </section>
          <section>
            <p>Best</p>
            <h3>$200</h3>
            <p>9hr 40min</p>
          </section>
        </section>
        <section>
          <div
            className="dropdown-container"
            style={{ width: "100%", marginTop: "20px" }}
          >
            {/* <label htmlFor="travel-class" className="dropdown-label">
          Travel Class
        </label> */}
            <select
              id="travel-class"
              className="class-dropdown"
              value={selectedClass}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Stops
              </option>
              <option value="direct">Direct</option>
              <option value="one">1 Stop</option>
              <option value="two">2 Stops</option>
              <option value="multiple">2+ Stops</option>
            </select>
          </div>
        </section>
      </div>
    </div>
  );
};

// Card Small Compnents

const DepartureAirportCode = ({
  item,
  flight = "flight_2",
  schedule = "departure",
}) => {
  return (
    <p
      className="font-24 font-weight-700 text-grey-1"
      style={{ lineHeight: "16px" }}
    >
      {item.flight_details ? item.flight_details[flight][schedule].airport : ""}
    </p>
  );
};

const DepartureAirportName = ({
  item,
  flight = "flight_2",
  schedule = "departure",
}) => {
  return (
    <p
      className="web-view font-12 font-weight-400 text-grey-2"
      style={{
        lineHeight: "40px",
        cursor: "pointer", // Makes it clear that it's hoverable
      }}
    >
      {item.flight_details ? item.flight_details[flight][schedule].airport : ""}
    </p>
  );
};

const DepartureTime = ({
  item,
  isMobile,
  flight = "flight_2",
  schedule = "departure",
}) => {
  return (
    <p className={`font-${isMobile ? "10" : "16"} font-weight-700 text-grey-1`}>
      {item?.flight_details?.[flight]?.departure?.time
        ? moment(item.flight_details[flight].departure.time, "HH:mm:ss").format(
            "h:mm A"
          )
        : ""}
    </p>
  );
};

const DepartureDate = ({
  item,
  isMobile,
  flight = "flight_2",
  schedule = "departure",
}) => {
  return (
    <p className={`font-${isMobile ? "10" : "12"} font-weight-400 text-grey-2`}>
      {item?.flight_details?.[flight]?.[schedule]?.date
        ? moment(item.flight_details[flight][schedule].date).format(
            "dddd, D MMMM YYYY"
          )
        : ""}
    </p>
  );
};

const Stop = ({ item }) => {
  return (
    <>
      <p
        style={{ textAlign: "center" }}
        className="font-16 font-weight-700 text-grey-1"
      >
        {item.flight_details ? item.flight_details.flight_1.duration : ""}
      </p>
      {/* {dividerSvg} */}
      <div className="trip-container">
        <div className="line">
          {item.flight_details.flight_1.stops.length == 1 ? (
            <>
              <div className="stop" style={{ left: "53%" }}></div>
            </>
          ) : (
            ""
          )}{" "}
          {item.flight_details.flight_1.stops.length == 2 ? (
            <>
              <div className="stop" style={{ left: "30%" }}></div>
              <div className="stop" style={{ left: "60%" }}></div>
            </>
          ) : (
            ""
          )}{" "}
          {item.flight_details.flight_1.stops.length == 3 ? (
            <>
              <div className="stop" style={{ left: "20%" }}></div>
              <div className="stop" style={{ left: "40%" }}></div>
              <div className="stop" style={{ left: "60%" }}></div>
            </>
          ) : (
            ""
          )}{" "}
          {/* <div className="stop" style={{ left: "20%" }}></div>
          <div className="stop" style={{ left: "40%" }}></div>
          <div className="stop" style={{ left: "60%" }}></div> */}
        </div>
        <div className="airplane">{planGrey}</div>
      </div>
      <p
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
        className="font-14 font-weight-700"
      >
        <span style={{ color: "#A64DFF", marginRight: "8px" }}>
          {item.flight_details.flight_1.stops.length > 0
            ? item.flight_details.flight_1.stops.length
            : "0"}{" "}
          STOP
        </span>{" "}
        {item.flight_details.flight_1.stops.length > 0
          ? item.flight_details.flight_1.stops.map((stop, i) => {
              return <span className="text-grey-3">{stop.airport}</span>;
            })
          : ""}
      </p>
    </>
  );
};

const ReturnStop = ({ item }) => {
  return (
    <>
      <p
        style={{ textAlign: "center" }}
        className="font-16 font-weight-700 text-grey-1"
      >
        {item.flight_details ? item.flight_details.flight_2.duration : ""}
      </p>
      {/* {dividerSvg} */}
      <div className="trip-container">
        <div className="line">
          {item.flight_details.flight_2.stops.length == 1 ? (
            <>
              <div className="stop" style={{ left: "53%" }}></div>
            </>
          ) : (
            ""
          )}{" "}
          {item.flight_details.flight_2.stops.length == 2 ? (
            <>
              <div className="stop" style={{ left: "30%" }}></div>
              <div className="stop" style={{ left: "60%" }}></div>
            </>
          ) : (
            ""
          )}{" "}
          {item.flight_details.flight_2.stops.length == 3 ? (
            <>
              <div className="stop" style={{ left: "20%" }}></div>
              <div className="stop" style={{ left: "40%" }}></div>
              <div className="stop" style={{ left: "60%" }}></div>
            </>
          ) : (
            ""
          )}{" "}
          {/* <div className="stop" style={{ left: "20%" }}></div>
          <div className="stop" style={{ left: "40%" }}></div>
          <div className="stop" style={{ left: "60%" }}></div> */}
        </div>
        <div className="airplane">{planGrey}</div>
      </div>
      <p
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
        className="font-14 font-weight-700"
      >
        <span style={{ color: "#A64DFF", marginRight: "8px" }}>
          {item.flight_details.flight_2.stops.length > 0
            ? item.flight_details.flight_2.stops.length
            : "0"}{" "}
          STOP
        </span>{" "}
        {item.flight_details.flight_2.stops.length > 0
          ? item.flight_details.flight_2.stops.map((stop, i) => {
              return <span className="text-grey-3">{stop.airport}</span>;
            })
          : ""}
      </p>
    </>
  );
};

/* <img src={emiratesImg} width="70%" /> */
const FlightLogo = ({ item }) => {
  return <p style={{ width: "40px" }}>{item.airline.code}</p>;
};

const OneWayCard = ({ isMobile, i, item, setFlightSelected }) => {
  return (
    <section
      key={i}
      style={{
        border: isMobile ? "1px solid #e5e5e5" : "",
        padding: isMobile ? "6px" : "",
        borderRadius: isMobile ? "6px" : "",
        marginTop: isMobile ? "16px" : "",
      }}
    >
      <div className="one-war-card-flight-book">
        <section
          className="web-view"
          style={{
            borderRight: !isMobile ? "1px solid #E5E5E5" : "",
            paddingRight: "12px",
            paddingLeft: "12px",

            height: "100px",
          }}
        >
          <FlightLogo item={item} />
        </section>
        {/* Departure */}
        <section style={{ width: "15%" }}>
          <DepartureAirportCode
            flight="flight_1"
            schedule="departure"
            item={item}
          />
          <DepartureAirportName
            flight="flight_1"
            schedule="departure"
            item={item}
          />
          <DepartureTime
            flight="flight_1"
            schedule="departure"
            item={item}
            isMobile={isMobile}
          />
          <DepartureDate
            flight="flight_1"
            schedule="departure"
            item={item}
            isMobile={isMobile}
          />
        </section>
        {/* Departure */}
        {/* Center */}
        <section>
          <Stop item={item} />
        </section>
        {/* Center */}
        {/* Arrival */}
        <section>
          <DepartureAirportCode
            flight="flight_1"
            schedule="arrival"
            item={item}
          />
          <DepartureAirportName
            flight="flight_1"
            schedule="arrival"
            item={item}
          />
          <DepartureTime
            flight="flight_1"
            schedule="arrival"
            item={item}
            isMobile={isMobile}
          />
          <DepartureDate
            flight="flight_1"
            schedule="arrival"
            item={item}
            isMobile={isMobile}
          />
        </section>
        {/* Arrival */}
        {/* Price */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <p
            style={{
              opacity: 0,
            }}
          >
            3 left at
          </p>
          <h2
            style={{
              margin: "0",
              padding: "0",
              textAlign: "right",
            }}
            className={
              isMobile
                ? "font-12 text-grey-1 font-weight-700"
                : "font-36 text-grey-1 font-weight-700"
            }
          >
            {item.price.currency == "INR" ? "₹" : "$"} {item.price.total}
          </h2>
          <p
            style={{
              color: "#525252",
              fontSize: isMobile ? "10px" : "12px",
              textAlign: "right",
              marginBottom: "8px",
            }}
          >
            per traveller
          </p>
          <button
            onClick={() => setFlightSelected(i + 1)}
            className="btn-primary web-view"
            style={{ padding: "6px 12px", fontSize: "15px", width: "122px" }}
          >
            Select
          </button>
        </section>
        {/* Price */}
      </div>
      {isMobile && (
        <div className="divider" style={{ margin: "8px 0px" }}></div>
      )}
      <div className="mobile-view">
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img src={emiratesImg} width="30px" />
          <button
            onClick={() => setFlightSelected(i + 1)}
            className="btn-primary"
            style={{ padding: "6px 12px", fontSize: "15px" }}
          >
            Select
          </button>
        </section>
      </div>
    </section>
  );
};

const TwoWayCard = ({ isMobile, i, item, setFlightSelected }) => {
  return (
    <section
      key={i}
      style={{
        // border: isMobile ? "1px solid #e5e5e5" : "",
        padding: isMobile ? "6px" : "",
        borderRadius: isMobile ? "6px" : "",
        marginTop: isMobile ? "16px" : "",
        position: "relative",
      }}
      className="border"
    >
      <div className="web-view round-trip-line "></div>
      <section className="">
        <div
          className="one-war-card-flight-book border-none"
          style={{ marginTop: "0px", paddingTop: "8px" }}
        >
          {/* plan logo */}
          <section
            className="web-view"
            style={{
              borderRight: !isMobile ? "1px solid #E5E5E5" : "",
              paddingRight: "12px",
              paddingLeft: "12px",

              height: "100px",
            }}
          >
            {/* <img src={emiratesImg} width="70%" /> */}
            <FlightLogo item={item} />
          </section>
          {/* plan logo */}
          {/* Departure */}
          <section style={{ width: "15%" }}>
            <DepartureAirportCode
              flight="flight_1"
              schedule="departure"
              item={item}
            />
            <DepartureAirportName
              flight="flight_1"
              schedule="departure"
              item={item}
            />
            <DepartureTime
              flight="flight_1"
              schedule="departure"
              item={item}
              isMobile={isMobile}
            />
            <DepartureDate
              flight="flight_1"
              schedule="departure"
              item={item}
              isMobile={isMobile}
            />
          </section>
          {/* Departure */}
          {/* Center */}
          <section>
            <Stop item={item} />
          </section>
          {/* Center */}
          {/* Arrival */}
          <section>
            <DepartureAirportCode
              flight="flight_1"
              schedule="arrival"
              item={item}
            />
            <DepartureAirportName
              flight="flight_1"
              schedule="arrival"
              item={item}
            />
            <DepartureTime
              flight="flight_1"
              schedule="arrival"
              item={item}
              isMobile={isMobile}
            />
            <DepartureDate
              flight="flight_1"
              schedule="arrival"
              item={item}
              isMobile={isMobile}
            />
          </section>
          {/* Arrival */}
          {/* Price */}
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              opacity: 0,
            }}
          >
            <p
              style={{
                opacity: 0,
              }}
            >
              3 left at
            </p>
            <h2
              style={{
                margin: "0",
                padding: "0",
                textAlign: "right",
              }}
              className={
                isMobile
                  ? "font-12 text-grey-1 font-weight-700"
                  : "font-36 text-grey-1 font-weight-700"
              }
            >
              {item.price.currency == "INR" ? "₹" : "$"} {item.price.total}
            </h2>
            <p
              style={{
                color: "#525252",
                fontSize: isMobile ? "10px" : "12px",
                textAlign: "right",
                marginBottom: "8px",
              }}
            >
              per traveller
            </p>
            <button
              className="btn-primary web-view"
              style={{ padding: "6px 12px", fontSize: "15px", width: "122px" }}
            >
              Select
            </button>
          </section>
          {/* Price */}
        </div>

        <div
          className="one-war-card-flight-book border-none"
          style={{ marginTop: "0px" }}
        >
          {/* plan logo */}
          <section
            className="web-view"
            style={{
              borderRight: !isMobile ? "1px solid #E5E5E5" : "",
              paddingRight: "12px",
              paddingLeft: "12px",
              height: "100px",
            }}
          >
            <FlightLogo item={item} />
            {/* <img src={emiratesImg} width="70%" /> */}
          </section>
          {/* plan logo */}
          {/* Departure */}
          <section style={{ width: "15%" }}>
            <DepartureAirportCode
              flight="flight_2"
              schedule="departure"
              item={item}
            />
            <DepartureAirportName
              flight="flight_2"
              schedule="departure"
              item={item}
            />
            <DepartureTime
              flight="flight_2"
              schedule="departure"
              item={item}
              isMobile={isMobile}
            />
            <DepartureDate
              flight="flight_2"
              schedule="departure"
              item={item}
              isMobile={isMobile}
            />
          </section>
          {/* Departure */}
          {/* Center */}
          <section>
            <ReturnStop item={item} />
          </section>
          {/* Center */}
          {/* Arrival */}
          <section>
            <DepartureAirportCode
              flight="flight_2"
              schedule="arrival"
              item={item}
            />
            <DepartureAirportName
              flight="flight_2"
              schedule="arrival"
              item={item}
            />
            <DepartureTime
              flight="flight_2"
              schedule="arrival"
              item={item}
              isMobile={isMobile}
            />
            <DepartureDate
              flight="flight_2"
              schedule="arrival"
              item={item}
              isMobile={isMobile}
            />
          </section>
          {/* Arrival */}
          {/* Price */}
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginTop: "-147px",
            }}
          >
            <p
              style={{
                opacity: 0,
              }}
            >
              3 left at
            </p>
            <h2
              style={{
                margin: "0",
                padding: "0",
                textAlign: "right",
              }}
              className={
                isMobile
                  ? "font-12 text-grey-1 font-weight-700"
                  : "font-36 text-grey-1 font-weight-700"
              }
            >
              {item.price.currency == "INR" ? "₹" : "$"} {item.price.total}
            </h2>
            <p
              style={{
                color: "#525252",
                fontSize: isMobile ? "10px" : "12px",
                textAlign: "right",
                marginBottom: "8px",
              }}
            >
              per traveller
            </p>
            <button
              onClick={() => setFlightSelected(i + 1)}
              className="btn-primary web-view"
              style={{ padding: "6px 12px", fontSize: "15px", width: "122px" }}
            >
              Select
            </button>
          </section>
          {/* Price */}
        </div>
      </section>

      {isMobile && (
        <div className="divider" style={{ margin: "8px 0px" }}></div>
      )}
      <div className="mobile-view">
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img src={emiratesImg} width="30px" />
          <button
            onClick={() => setFlightSelected(i + 1)}
            className="btn-primary"
            style={{ padding: "6px 12px", fontSize: "15px" }}
          >
            Select
          </button>
        </section>
      </div>
    </section>
  );
};

const Pagination = ({
  totalPages,
  pageLimit = 3,
  currentPage,
  setCurrentPage,
}) => {
  const generatePagination = () => {
    let pages = [];

    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      pages.push(1);

      if (currentPage > pageLimit) {
        pages.push("...");
      }

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="pagination" style={{ display: "flex" }}>
      {/* Go to First Page */}
      <button
        onClick={() => setCurrentPage((prev) => (prev === 1 ? 1 : 1))} // Ensure re-render
        disabled={currentPage === 1}
        style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
      >
        <AllLeftArrow c={currentPage == 1 ? "grey" : "#000"} />
      </button>

      {/* Go to Previous Page */}
      <button
        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
      >
        <LeftArrowSvg c={currentPage == 1 ? "grey" : "#000"} />
      </button>

      {/* Dynamic Pagination Buttons */}
      {generatePagination().map((page, index) => (
        <button
          key={index}
          onClick={() =>
            typeof page === "number" &&
            setCurrentPage((prev) => (prev === page ? page : page))
          } // Fix click on same page
          style={{
            padding: "5px 10px",
            background: currentPage === page ? "#a64dff1f" : "white",
            color: currentPage === page ? "#a64dff" : "black",
            border: `1px solid ${
              currentPage === page ? "#a64dff80" : "#c4c4c4"
            }`,
            cursor: page === "..." ? "default" : "pointer",
          }}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      {/* Go to Next Page */}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
        style={{
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        <RightArrowSvg c={currentPage === totalPages ? "grey" : "#000"} />
      </button>

      {/* Go to Last Page */}
      <button
        onClick={() =>
          setCurrentPage((prev) =>
            prev === totalPages ? totalPages : totalPages
          )
        } // Ensure re-render
        disabled={currentPage === totalPages}
        style={{
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        <RightAll c={currentPage === totalPages ? "grey" : "#000"} />
      </button>
    </div>
  );
};

export { Pagination };
