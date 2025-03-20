// import deal1 from "../../img/bg/deal_1_bg.jpeg";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Title from "../Title";
import bg from "../../img/flight_bg.png";
import { headphoneSvg } from "../../svg/headphone";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AutocompleteDropdown } from "../Form/AutoCompleteDropdown";
import ThankYouModal from "../ThankYou";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "../../store/slices/searchFilterSlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import deal1 from "../../img/deals/deals_1.png";
import deal2 from "../../img/deals/deals_2.png";
import deal3 from "../../img/deals/deals_3.png";

function BookingForm({ id }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    window.scrollTo(0, 300);
  }, []);

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

  return (
    <div>
      <Box>
        <div className="flight-search-">
          <div>
            <section>
              <img width="100%" style={{ zIndex: "-1" }} src={bg} alt="bg" />
            </section>
          </div>
          <section className="form-book-">
            <Form_ setOpen={setOpen} id={id} />
          </section>
          <ThankYouModal open={open} setOpen={setOpen} />
        </div>
      </Box>
    </div>
  );
}

export default BookingForm;

function Form_({ setOpen, id }) {
  const searchFilterData = useSelector((state) => state.searchFilter);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const deals = [
    {
      title: "Weekend Deal",
      description: "20% OFF",
      subtext: "on your first booking.*",
      bgColor: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
    },
  ];
  const options = ["AK", "AL", "AZ", "AR", "CA", "LHR", "LGW", "STN", "LTN"];

  const onChangeFrom = (newValue) => {
    dispatch(
      setSearchFilter({
        ...searchFilterData,
        departure_airport: newValue,
      })
    );
  };

  return (
    <Container maxWidth="lg" sx={{ zIndex: 100 }}>
      <div
        className="cards"
        style={{
          zIndex: "100",
          background: "#e5e5e5",
          border: "1px solid rgba(197, 197, 197, 0.14)",
          padding: "24px",
        }}
      >
        <section style={{ display: isMobile ? "unset" : "flex" }}>
          {isMobile && (
            <div style={{ width: isMobile ? "100%" : "70%" }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  // maxWidth: 900,
                  mx: "auto",
                  // backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}
              >
                <Stack spacing={3}>
                  <Title title="Fill in the details" />
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <TextField
                      fullWidth
                      label="First Name *"
                      placeholder="Enter Your First Name..."
                      // InputProps={{
                      //   startAdornment: (
                      //     <InputAdornment position="start">
                      //       <PersonIcon color="primary" />
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                    <TextField
                      fullWidth
                      label="Last Name *"
                      placeholder="Enter Your Last Name..."
                      // InputProps={{
                      //   startAdornment: (
                      //     <InputAdornment position="start">
                      //       <PersonIcon color="primary" />
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    {/* <AutocompleteDropdown
                      label="From *"
                      options={options}
                      width="100%"
                      border={true}
                      onChangeFrom={onChangeFrom}
                      value={searchFilterData.departure_airport}
                    /> */}
                    <Autocomplete
                      value={searchFilterData.departure_airport}
                      onChange={(event, newValue) =>
                        // setSearchFilterData({
                        //   ...searchFilterData,
                        //   departure_airport: newValue,
                        // })
                        dispatch(
                          setSearchFilter({
                            ...searchFilterData,
                            departure_airport: newValue,
                          })
                        )
                      }
                      options={options}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="From"
                          onChange={(e) => {
                            // setSearchFilterData({
                            //   ...searchFilterData,
                            //   departure_airport: e.target.value,
                            // });
                            // dispatch(
                            //   setSearchFilter({
                            //     ...searchFilterData,
                            //     departure_airport: e.target.value,
                            //   })
                            // );
                          }}
                          placeholder="Select From"
                          // InputProps={{
                          //   ...params.InputProps,
                          //   startAdornment: (
                          //     <InputAdornment position="start">
                          //       <LocationOnIcon color="#7C8DB0" />
                          //     </InputAdornment>
                          //   ),
                          // }}
                          fullWidth
                        />
                      )}
                    />
                    <Autocomplete
                      value={searchFilterData.arrival_airport}
                      onChange={(event, newValue) =>
                        // setSearchFilterData({
                        //   ...searchFilterData,
                        //   departure_airport: newValue,
                        // })
                        dispatch(
                          setSearchFilter({
                            ...searchFilterData,
                            arrival_airport: newValue,
                          })
                        )
                      }
                      options={options}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="To"
                          onChange={(e) => {
                            // setSearchFilterData({
                            //   ...searchFilterData,
                            //   departure_airport: e.target.value,
                            // });
                            // dispatch(
                            //   setSearchFilter({
                            //     ...searchFilterData,
                            //     departure_airport: e.target.value,
                            //   })
                            // );
                          }}
                          placeholder="Select To"
                          // InputProps={{
                          //   ...params.InputProps,
                          //   startAdornment: (
                          //     <InputAdornment position="start">
                          //       <LocationOnIcon color="#7C8DB0" />
                          //     </InputAdornment>
                          //   ),
                          // }}
                          fullWidth
                        />
                      )}
                    />
                    {/* <AutocompleteDropdown
                      label="To *"
                      options={options}
                      width="100%"
                      border={true}
                      onChangeFrom={onChangeFrom}
                      value={searchFilterData.arrival_airport}
                    /> */}
                  </Box>
                  {/* DatePicker */}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      width: "100%",
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Departure Date"
                        format="DD/MM/YYYY"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            fullWidth: true,
                            sx: { flex: 1 },
                          },
                        }}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Return Date"
                        format="DD/MM/YYYY"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            fullWidth: true,
                            sx: { flex: 1 },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Email *"
                      placeholder="Enter Your Email..."
                      // InputProps={{
                      //   startAdornment: (
                      //     <InputAdornment position="start">
                      //       <PersonIcon color="primary" />
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                    <TextField
                      fullWidth
                      label="Phone Number *"
                      placeholder="Enter Your Phone Number..."
                      // InputProps={{
                      //   startAdornment: (
                      //     <InputAdornment position="start">
                      //       <PersonIcon color="primary" />
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                  </Box>

                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="I agree to the Privacy Policy"
                  />

                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 2,
                      py: 1.5,
                      fontSize: "1.1rem",
                      borderRadius: "8px",
                      textTransform: "none",
                    }}
                    onClick={() => setOpen(true)}
                  >
                    Submit
                  </Button>
                </Stack>
              </Paper>
            </div>
          )}
          <div
            style={{
              width: isMobile ? "100%" : "30%",
              paddingRight: "24px",
              marginTop: isMobile ? "24px" : "",
              //   display: "flex",
              //   alignItems: "center",
              //   justifyContent: "center",
            }}
          >
            {searchFilterData.departure_airport &&
              searchFilterData.arrival_airport && (
                <h2 style={{ marginBottom: "12px" }}>
                  {searchFilterData.departure_airport} To{" "}
                  {searchFilterData.arrival_airport}
                </h2>
              )}
            <h3 style={{ marginBottom: "12px" }}>Get best deals</h3>
            <p style={{ marginBottom: "12px" }}>
              Connect to our customer representative by filling out the details
              and save more on your flight.{" "}
            </p>
            {/* <img width="110%" src={`deal${id + 1}`} /> */}
            <img width="100%" src={[deal1, deal2, deal3][id]} alt={"ll"} />
            {deals.map((deal, index) => (
              <Grid item xs={12} md={4} key={index}>
                <h2 style={{ marginBottom: "12px", marginTop: "12px" }}>
                  Why Triwize?
                </h2>
                {[
                  { text: "24/7 Customer Support", icon: headphoneSvg },
                  { text: "Transparent Pricing", icon: headphoneSvg },
                  { text: "Unlock Exclusive Deals", icon: headphoneSvg },
                ].map((item, i) => (
                  <p
                    key={i}
                    style={{
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <span style={{ marginRight: "8px", marginTop: "3px" }}>
                      {item.icon}
                    </span>{" "}
                    {item.text}
                  </p>
                ))}
              </Grid>
            ))}
          </div>
          {!isMobile && (
            <div style={{ width: isMobile ? "100%" : "70%" }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  // maxWidth: 900,
                  mx: "auto",
                  // backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}
              >
                <Stack spacing={3}>
                  <Title title="Fill in the details" />
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <TextField
                      fullWidth
                      label="First Name *"
                      placeholder="Enter Your First Name..."
                      // InputProps={{
                      //   startAdornment: (
                      //     <InputAdornment position="start">
                      //       <PersonIcon color="primary" />
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                    <TextField
                      fullWidth
                      label="Last Name *"
                      placeholder="Enter Your Last Name..."
                      // InputProps={{
                      //   startAdornment: (
                      //     <InputAdornment position="start">
                      //       <PersonIcon color="primary" />
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    {/* <AutocompleteDropdown
                      label="From *"
                      options={options}
                      width="100%"
                      border={true}
                    /> */}
                    <Autocomplete
                      value={searchFilterData.departure_airport}
                      onChange={(event, newValue) =>
                        // setSearchFilterData({
                        //   ...searchFilterData,
                        //   departure_airport: newValue,
                        // })
                        dispatch(
                          setSearchFilter({
                            ...searchFilterData,
                            departure_airport: newValue,
                          })
                        )
                      }
                      options={options}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="From"
                          onChange={(e) => {
                            // setSearchFilterData({
                            //   ...searchFilterData,
                            //   departure_airport: e.target.value,
                            // });
                            // dispatch(
                            //   setSearchFilter({
                            //     ...searchFilterData,
                            //     departure_airport: e.target.value,
                            //   })
                            // );
                          }}
                          placeholder="Select From"
                          // InputProps={{
                          //   ...params.InputProps,
                          //   startAdornment: (
                          //     <InputAdornment position="start">
                          //       <LocationOnIcon color="#7C8DB0" />
                          //     </InputAdornment>
                          //   ),
                          // }}
                          fullWidth
                        />
                      )}
                    />
                    {/* <AutocompleteDropdown
                      label="To *"
                      options={options}
                      width="100%"
                      border={true}
                    /> */}
                    <Autocomplete
                      value={searchFilterData.arrival_airport}
                      onChange={(event, newValue) =>
                        // setSearchFilterData({
                        //   ...searchFilterData,
                        //   departure_airport: newValue,
                        // })
                        dispatch(
                          setSearchFilter({
                            ...searchFilterData,
                            arrival_airport: newValue,
                          })
                        )
                      }
                      options={options}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="To"
                          onChange={(e) => {
                            // setSearchFilterData({
                            //   ...searchFilterData,
                            //   departure_airport: e.target.value,
                            // });
                            // dispatch(
                            //   setSearchFilter({
                            //     ...searchFilterData,
                            //     departure_airport: e.target.value,
                            //   })
                            // );
                          }}
                          placeholder="Select To"
                          // InputProps={{
                          //   ...params.InputProps,
                          //   startAdornment: (
                          //     <InputAdornment position="start">
                          //       <LocationOnIcon color="#7C8DB0" />
                          //     </InputAdornment>
                          //   ),
                          // }}
                          fullWidth
                        />
                      )}
                    />
                  </Box>
                  {/* DatePicker */}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      width: "100%",
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Departure Date"
                        format="DD/MM/YYYY"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            fullWidth: true,
                            sx: { flex: 1 },
                          },
                        }}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Return Date"
                        format="DD/MM/YYYY"
                        slotProps={{
                          textField: {
                            variant: "outlined",
                            fullWidth: true,
                            sx: { flex: 1 },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Email *"
                      placeholder="Enter Your Email..."
                      // InputProps={{
                      //   startAdornment: (
                      //     <InputAdornment position="start">
                      //       <PersonIcon color="primary" />
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                    <TextField
                      fullWidth
                      label="Phone Number *"
                      placeholder="Enter Your Phone Number..."
                      // InputProps={{
                      //   startAdornment: (
                      //     <InputAdornment position="start">
                      //       <PersonIcon color="primary" />
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                  </Box>

                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="I accept the Terms and Conditions"
                  />

                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 2,
                      py: 1.5,
                      fontSize: "1.1rem",
                      borderRadius: "8px",
                      textTransform: "none",
                    }}
                    onClick={() => setOpen(true)}
                  >
                    Submit
                  </Button>
                </Stack>
              </Paper>
            </div>
          )}
        </section>
      </div>
    </Container>
  );
}

// function LocationSelector({ label }) {
//   const options = [
//     "New York",
//     "Los Angeles",
//     "Chicago",
//     "Houston",
//     "San Francisco",
//     "Miami",
//   ];
//   const [inputValue, setInputValue] = useState("");

//   return (
//     <Autocomplete
//       freeSolo
//       options={options}
//       inputValue={inputValue}
//       onInputChange={(event, newInputValue) => {
//         setInputValue(newInputValue);
//       }}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={label}
//           placeholder="Enter..."
//           fullWidth
//           InputProps={{
//             ...params.InputProps,
//             startAdornment: (
//               <InputAdornment position="start">
//                 <PersonIcon color="primary" />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ flex: 1 }} // Makes it take 50% of the available space
//         />
//       )}
//       sx={{ flex: 1 }} // Ensures both Autocomplete fields take equal space
//     />
//   );
// }
