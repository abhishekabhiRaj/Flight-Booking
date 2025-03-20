import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";

// export function AutocompleteDropdown({
//   label,
//   options,
//   width = "100%",
//   border = true,
//   onChangeFrom = () => {},
//   value,
// }) {
//   const [inputValue, setInputValue] = useState("");

//   useEffect(() => {
//     onChangeFrom(inputValue);
//   }, [inputValue]);

//   return (
//     <Autocomplete
//       freeSolo
//       options={options}
//       inputValue={inputValue ? inputValue : value}
//       onInputChange={(event, newInputValue) => {
//         setInputValue(newInputValue);
//       }}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={label}
//           value={value}
//           placeholder="Enter..."
//           fullWidth
//           variant={border ? "outlined" : "filled"} // Use 'filled' to remove bottom border
//           InputProps={{
//             ...params.InputProps,
//             startAdornment: (
//               <InputAdornment position="start">
//                 <PersonIcon color="primary" />
//               </InputAdornment>
//             ),
//             disableUnderline: !border, // Ensures no underline when border is false
//           }}
//           sx={{
//             width,
//             backgroundColor: border ? "transparent" : "white", // Optional: keeps consistent background
//             "& .MuiOutlinedInput-notchedOutline": border
//               ? {}
//               : { border: "none" }, // Removes outline when border is false
//             "& .MuiFilledInput-root": border
//               ? {}
//               : { backgroundColor: "transparent", boxShadow: "none" }, // Removes filled background
//           }}
//         />
//       )}
//       sx={{ width }}
//     />
//   );
// }

export function AutocompleteDropdown({
  label,
  options,
  width = "100%",
  border = true,
  onChangeFrom = () => {},
  value, // Default empty value
}) {
  const [inputValue, setInputValue] = useState(value); // Initialize state with value

  useEffect(() => {
    setInputValue(value); // Sync inputValue with value from props
  }, [value]); // Runs only when value changes

  useEffect(() => {
    onChangeFrom(inputValue);
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder="Enter..."
          fullWidth
          variant={border ? "outlined" : "filled"}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="primary" />
              </InputAdornment>
            ),
            disableUnderline: !border,
          }}
          sx={{
            width,
            backgroundColor: border ? "transparent" : "white",
            "& .MuiOutlinedInput-notchedOutline": border
              ? {}
              : { border: "none" },
            "& .MuiFilledInput-root": border
              ? {}
              : { backgroundColor: "transparent", boxShadow: "none" },
          }}
        />
      )}
      sx={{ width }}
    />
  );
}

function AutocompleteDropdownSecondVariant({
  options,
  width = "100%",
  border = true,
  placeholder,
}) {
  const [inputValue, setInputValue] = useState("");

  return (
    <Autocomplete
      freeSolo
      options={options}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          fullWidth
          variant={border ? "outlined" : "filled"} // Use 'filled' to remove bottom border
          InputProps={{
            ...params.InputProps,
            disableUnderline: !border, // Ensures no underline when border is false
          }}
          sx={{
            width,
            padding: 0,
            backgroundColor: border ? "transparent" : "white", // Keeps consistent background
            "& .MuiOutlinedInput-notchedOutline": border
              ? {}
              : { border: "none" }, // Removes outline
            "& .MuiFilledInput-root": border
              ? {}
              : { backgroundColor: "transparent", boxShadow: "none" }, // Removes filled background
          }}
        />
      )}
      sx={{ width }}
    />
  );
}

export { AutocompleteDropdownSecondVariant };
