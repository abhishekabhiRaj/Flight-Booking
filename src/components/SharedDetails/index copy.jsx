import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Title from "../Title";
import shareDetailImg from "../../img/shareDetail.png";
import "./index.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

function SharedDetails() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [inputValue, setInputValue] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
  });

  const [shrink, setShrink] = useState({
    fname: false,
    lname: false,
    email: false,
    mobile: false,
  });
  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <div className="cards" id="contact_us">
        {/* <img src={travel} width="100%" alt="" /> */}
        <Title title="Share Details For Assistance" />
        <section className="shared_detail_container">
          <div className="mobile-view">
            {/* <section className="img" style={{ height: "100px" }}></section> */}
            <img
              style={{ marginBottom: "24px" }}
              width="100%"
              src={shareDetailImg}
            />
          </div>
          <div className="left">
            <Paper
              elevation={0}
              sx={{
                // p: isMobile ? 1 : 4,
                borderRadius: 2,
                // maxWidth: 900,
                mx: "auto",
                // backgroundColor: "rgba(255, 255, 255, 0.9)",
              }}
            >
              <Stack spacing={3}>
                <Box sx={{ display: !isMobile ? "flex" : "", gap: 2 }}>
                  <TextField
                    fullWidth
                    onFocus={() =>
                      setShrink({
                        fname: true,
                        lname: inputValue.lname ? true : false,
                        email: inputValue.email ? true : false,
                        mobile: inputValue.mobile ? true : false,
                      })
                    }
                    onBlur={() =>
                      setShrink({
                        fname: inputValue.fname ? true : false,
                        lname: inputValue.lname ? true : false,
                        email: inputValue.email ? true : false,
                        mobile: inputValue.mobile ? true : false,
                      })
                    } // Keep label shrunk if there's a value
                    onChange={(e) =>
                      setInputValue({ ...inputValue, fname: e.target.value })
                    } // Update input state
                    value={inputValue.fname}
                    label="First Name *"
                    variant="outlined"
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <PersonIcon
                    //         color={inputValue.fname ? "primary-" : ""}
                    //       />
                    //     </InputAdornment>
                    //   ),
                    // }}
                    InputLabelProps={{
                      shrink: shrink.fname,
                    }}
                    sx={{ marginBottom: isMobile ? "24px" : "" }}
                    // sx={{
                    //   "& .MuiInputBase-root": {
                    //     paddingLeft: "8px",
                    //   },
                    //   "& .MuiInputLabel-root": {
                    //     left: "20px",
                    //   },
                    //   "& .MuiInputLabel-shrink": {
                    //     left: "0px",
                    //   },
                    // }}
                  />
                  <TextField
                    fullWidth
                    onFocus={() =>
                      setShrink({
                        fname: inputValue.fname ? true : false,
                        lname: true,
                        email: inputValue.email ? true : false,
                        mobile: inputValue.mobile ? true : false,
                      })
                    }
                    onBlur={() =>
                      setShrink({
                        fname: inputValue.fname ? true : false,
                        lname: inputValue.lname ? true : false,
                        email: inputValue.email ? true : false,
                        mobile: inputValue.mobile ? true : false,
                      })
                    } // Keep label shrunk if there's a value
                    onChange={(e) =>
                      setInputValue({ ...inputValue, lname: e.target.value })
                    } // Update input state
                    value={inputValue.lname}
                    label="Last Name *"
                    variant="outlined"
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <PersonIcon color={shrink == "2" ? "primary" : ""} />
                    //     </InputAdornment>
                    //   ),
                    // }}
                    InputLabelProps={{
                      shrink: shrink.lname, // Ensures label moves to top when typing or focused
                    }}
                  />
                </Box>

                <Box sx={{ gap: 2 }}>
                  <TextField
                    fullWidth
                    onFocus={() =>
                      setShrink({
                        fname: inputValue.fname ? true : false,
                        lname: inputValue.lname ? true : false,
                        email: true,
                        mobile: inputValue.mobile ? true : false,
                      })
                    }
                    onBlur={() =>
                      setShrink({
                        fname: inputValue.fname ? true : false,
                        lname: inputValue.lname ? true : false,
                        email: inputValue.email ? true : false,
                        mobile: inputValue.mobile ? true : false,
                      })
                    } // Keep label shrunk if there's a value
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        email: e.target.value,
                      })
                    } // Update input state
                    value={inputValue.email}
                    label="Email *"
                    variant="outlined"
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <PersonIcon color={shrink == "3" ? "primary" : ""} />
                    //     </InputAdornment>
                    //   ),
                    // }}
                    InputLabelProps={{
                      shrink: shrink.email, // Ensures label moves to top when typing or focused
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    fullWidth
                    onFocus={() =>
                      setShrink({
                        fname: inputValue.fname ? true : false,
                        lname: inputValue.lname ? true : false,
                        email: inputValue.email ? true : false,
                        mobile: true,
                      })
                    }
                    onBlur={() =>
                      setShrink({
                        fname: inputValue.fname ? true : false,
                        lname: inputValue.lname ? true : false,
                        email: inputValue.email ? true : false,
                        mobile: inputValue.mobile ? true : false,
                      })
                    }
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        mobile: e.target.value,
                      })
                    } // Update input state
                    value={inputValue.mobile}
                    label="Mobile *"
                    variant="outlined"
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <PersonIcon color={shrink == "4" ? "primary" : ""} />
                    //     </InputAdornment>
                    //   ),
                    // }}
                    InputLabelProps={{
                      shrink: shrink.mobile, // Ensures label moves to top when typing or focused
                    }}
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
                >
                  Send
                </Button>
              </Stack>
            </Paper>
          </div>
          <div className="right web-view">
            <section className="img"></section>
            {/* <img width="90%" src={shareDetailImg} /> */}
          </div>
        </section>
      </div>
    </Container>
  );
}

export default SharedDetails;
