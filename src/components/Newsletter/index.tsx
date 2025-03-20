import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { logoWhiteSvg } from "../../svg/logoWhite";
import {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoPinterestAlt,
  BiLogoYoutube,
  BiLogoInstagram,
  BiLogoLinkedin,
} from "react-icons/bi";
import "./index.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add subscription logic here
  };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const socialLinks = [
    { icon: <BiLogoFacebook />, url: "#", label: "Facebook" },
    { icon: <BiLogoTwitter />, url: "#", label: "Twitter" },
    { icon: <BiLogoPinterestAlt />, url: "#", label: "Pinterest" },
    { icon: <BiLogoYoutube />, url: "#", label: "YouTube" },
    { icon: <BiLogoInstagram />, url: "#", label: "Instagram" },
    { icon: <BiLogoLinkedin />, url: "#", label: "LinkedIn" },
  ];

  return (
    <Box sx={{ bgcolor: "black", color: "white", py: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Logo Section */}
          <Box sx={{ width: { xs: "100%", md: "20%" } }}>
            <div className="center">
              {logoWhiteSvg}
            </div>
          </Box>

          {/* Subscribe Section */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              textAlign: "center",
            }}
          >
            <p className="font-24 font-weight-700 mb-1">
              Are you looking for deals?
            </p>
            <p className="font-12 font-weight-400 mb-2">
              Subscribe and be the first to receive personalized offers in your
              inbox.
            </p>
            <Box
              component="form"
              onSubmit={handleSubscribe}
              sx={{
                display: "flex",
                gap: 1,
                maxWidth: "500px",
                mx: "auto",
              }}
            >
              <TextField
                fullWidth
                placeholder="Enter your email for the best deals"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  bgcolor: "white",
                  // borderRadius: 1,
                  outline: 0,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#EAD5FF",
                  color: "#311355",
                  px: 3,
                  marginLeft: -1,
                  borderRadius: 0,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                  "&:hover": {
                    bgcolor: "#A64DFF",
                    color: "#fff",
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
            <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      sx={{
                        color: "#fff", // Default color
                        "&.Mui-checked": { color: "primary" }, // When checked
                      }}
                    />
                  }
                />
                <p style={{ marginLeft: "-18px" }}>
                  By subscribing, I agree to the{" "}
                  <Link
                    href="/privacy-policy"
                    color="inherit"
                    underline="hover"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </Typography>
          </Box>

          {/* Social Links Section */}
          <Box
            sx={{
              width: { xs: "100%", md: !isMobile?"20%":"100%" },
              // textAlign: { xs: "center", md: "center" },
            }}
          >
            <p
              className="font-20 font-weight-700 mb-1"
              style={{ textAlign: "center" }}
            >
              Follow us!
            </p>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "max-content",
                justifyContent: { xs: "center", md: "flex-end" },
              }}
            >
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.url}
                  color="inherit"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 30,
                    height: 30,
                    borderRadius: "50%",
                    color: "#A64DFF",
                    bgcolor: "rgb(255, 255, 255)",
                    transition: ".3s linear",
                    "&:hover": {
                      bgcolor: "#A64DFF",
                      color: "#fff",
                    },
                  }}
                >
                  {social.icon}
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Newsletter;
