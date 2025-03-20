import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Newsletter from "../Newsletter";
import { messageSvg } from "../../svg/message";
import "./index.css";
import { useDispatch } from "react-redux";
import MyComponent from "../ChatBot";

const Layout = () => {
  const [isShowChatBot, setIsShowChatBot] = useState(false);
  const [isDealMenuVisible, setIsDealMenuVisible] = useState(false);
  const [justToggled, setJustToggled] = useState(false); // Flag to prevent instant close
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDealMenu = () => {
    setIsDealMenuVisible((prev) => !prev);
    setJustToggled(true); // Set flag to prevent immediate closure

    setTimeout(() => setJustToggled(false), 100); // Reset flag after 100ms
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (justToggled) return; // Don't close if menu was just toggled

      if (
        !event.target.closest(".deal-menu") &&
        !event.target.closest(".deal-button")
      ) {
        setIsDealMenuVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [justToggled]);

  return (
    <Suspense fallback={"Loading..."}>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header
          isDealMenuVisible={isDealMenuVisible}
          toggleDealMenu={toggleDealMenu}
        />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>

        {isDealMenuVisible && (
          <div
            className="deal-menu"
            id="deal-menu-id"
            onMouseLeave={toggleDealMenu}
          >
            <section className="deal-menu-inner">
              <ul className="menu-deals">
                <li
                  onClick={() =>
                    navigate("/booking", {
                      state: {
                        departure_airport: "SFO",
                        departure_airport_name: "San Francisco",
                        arrival_airport: "DEL",
                        arrival_airport_name: "New Delhi",
                      },
                    })
                  }
                >
                  San Francisco to New Delhi
                </li>
                <li
                  onClick={() =>
                    navigate("/booking", {
                      state: {
                        departure_airport: "SFO",
                        departure_airport_name: "San Francisco",
                        arrival_airport: "BLG",
                        arrival_airport_name: "Bangalore",
                      },
                    })
                  }
                >
                  San Francisco to Bangalore
                </li>
                <li>San Francisco to Pune</li>
                <li>San Francisco to Mumbai</li>
              </ul>
            </section>
          </div>
        )}

        <div className="chat-bot-icon" onClick={() => setIsShowChatBot(true)}>
          {messageSvg}
        </div>

        {isShowChatBot && (
          <div className="chat-bot-box">
            <div
              onClick={() => setIsShowChatBot(false)}
              className="chat-bot-icon-close"
              style={{ float: "right", marginTop: "-60px" }}
            >
              {messageSvg}
            </div>
            <div className="chat-bot">
              <div className="heading">Stephen</div>
              <section className="chat"></section>
              <input placeholder='Type your message and hit "Enter"' />
            </div>
            {/* <MyComponent /> */}
          </div>
        )}

        <Newsletter />
        <Footer />
      </Box>
    </Suspense>
  );
};

export default Layout;
