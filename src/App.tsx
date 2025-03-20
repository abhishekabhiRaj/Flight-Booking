import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "./store";
import { router } from "./router";
import theme from "./theme";
import ChatBot from "./components/ChatBot";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <ChatBot />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
