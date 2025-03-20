import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Title from "../Title";
import shareDetailImg from "../../img/shareDetail.png";
import "./index.css";

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

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
  });

  const validate = () => {
    const newErrors = {};
    if (!inputValue.fname) newErrors.fname = "First name is required";
    if (!inputValue.lname) newErrors.lname = "Last name is required";
    if (!inputValue.email) newErrors.email = "Email is required";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inputValue.email)) newErrors.email = "Invalid email format";
    if (!inputValue.mobile) newErrors.mobile = "Mobile number is required";
    if (!/^\d{10}$/.test(inputValue.mobile)) newErrors.mobile = "Invalid mobile number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Form submitted", inputValue);
      // Add your form submission logic here
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <div className="cards" id="contact_us">
        <Title title="Share Details For Assistance" />
        <section className="shared_detail_container">
          <div className="mobile-view">
            <img style={{ marginBottom: "24px" }} width="100%" src={shareDetailImg} />
          </div>
          <div className="left">
            <Paper elevation={0} sx={{ borderRadius: 2, mx: "auto" }}>
              <Stack spacing={3}>
                <Box sx={{ display: !isMobile ? "flex" : "", gap: 2 }}>
                  <TextField
                    fullWidth
                    error={Boolean(errors.fname)}
                    helperText={errors.fname}
                    label="First Name *"
                    value={inputValue.fname}
                    onChange={(e) => setInputValue({ ...inputValue, fname: e.target.value })}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    error={Boolean(errors.lname)}
                    helperText={errors.lname}
                    label="Last Name *"
                    value={inputValue.lname}
                    onChange={(e) => setInputValue({ ...inputValue, lname: e.target.value })}
                    variant="outlined"
                  />
                </Box>
                <TextField
                  fullWidth
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  label="Email *"
                  value={inputValue.email}
                  onChange={(e) => setInputValue({ ...inputValue, email: e.target.value })}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  error={Boolean(errors.mobile)}
                  helperText={errors.mobile}
                  label="Mobile *"
                  value={inputValue.mobile}
                  onChange={(e) => setInputValue({ ...inputValue, mobile: e.target.value })}
                  variant="outlined"
                />
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="I accept the Terms and Conditions"
                />
                <Button variant="contained" size="large" onClick={handleSubmit}>
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
