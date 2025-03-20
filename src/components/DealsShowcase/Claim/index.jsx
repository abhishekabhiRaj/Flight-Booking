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
import React, { useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Title from "../../Title";
import shareDetailImg from "../../../img/shareDetail.png";
import "./index.css";

function Claim() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container maxWidth="lg" sx={{ my: 0 }}>
      <div className="cards">
        {/* <img src={travel} width="100%" alt="" /> */}
        <Title title="Share Details For Assistance" />
        <section className="shared_detail_container">
          <div className="left">
            <Paper
              elevation={0}
              sx={{
                p: isMobile ? 1 : 4,
                borderRadius: 2,
                // maxWidth: 900,
                mx: "auto",
                // backgroundColor: "rgba(255, 255, 255, 0.9)",
              }}
            >
              <Stack spacing={3}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    fullWidth
                    label="First Name *"
                    placeholder="Enter Your First Name..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Last Name *"
                    placeholder="Enter Your Last Name..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Email *"
                    // defaultValue="Enter Email No..."
                    placeholder="Enter Email No..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Mobile *"
                    placeholder="Enter Mobile No..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

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
                  Claim
                </Button>
              </Stack>
            </Paper>
          </div>
          <div className="right">
            <img width="90%" src={shareDetailImg} />
          </div>
        </section>
      </div>
    </Container>
  );
}

export default Claim;
