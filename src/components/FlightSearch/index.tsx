import React, { useState } from "react";
import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import PersonIcon from "@mui/icons-material/Person";
import DateRangeIcon from "@mui/icons-material/DateRange";

const FlightSearch = () => {
  const [tripType, setTripType] = useState("roundTrip");
  const [cabinClass, setCabinClass] = useState("economy");

  const handleTripTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newTripType: string | null
  ) => {
    if (newTripType !== null) {
      setTripType(newTripType);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 2,
        maxWidth: 900,
        mx: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <ToggleButtonGroup
          value={tripType}
          exclusive
          onChange={handleTripTypeChange}
          aria-label="trip type"
          sx={{
            "& .MuiToggleButton-root.Mui-selected": {
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            },
          }}
        >
          <ToggleButton value="roundTrip" aria-label="round trip">
            Round Trip
          </ToggleButton>
          <ToggleButton value="oneWay" aria-label="one way">
            One Way
          </ToggleButton>
        </ToggleButtonGroup>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="cabin-class-label">Class</InputLabel>
          <Select
            labelId="cabin-class-label"
            value={cabinClass}
            label="Class"
            onChange={(e) => setCabinClass(e.target.value)}
            size="small"
          >
            <MenuItem value="economy">Economy</MenuItem>
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="firstClass">First Class</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Stack spacing={3}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="From where?"
            placeholder="Enter city or airport"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FlightTakeoffIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Where to?"
            placeholder="Enter city or airport"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FlightLandIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label={tripType === "roundTrip" ? "Depart - Return" : "Departure"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DateRangeIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Passengers"
            defaultValue="1 Adult"
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
          Search
        </Button>
      </Stack>
    </Paper>
  );
};

export default FlightSearch;
