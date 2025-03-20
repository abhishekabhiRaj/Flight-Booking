import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  MenuItem,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../svg/logo.jsx";
import india from "../../img/india.png";
import usa from "../../img/usa.png";
import "./index.css";
import { phoneSvg } from "../../svg/phone.jsx";
import { dealsArrow } from "../../svg/dealsArrow.jsx";
import { useDispatch, useSelector } from "react-redux";
import { BiChevronDown } from "react-icons/bi";
import { setSearchFilter } from "../../store/slices/searchFilterSlice.js";

const Header = ({ isDealMenuVisible, toggleDealMenu }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const menuItems = [
    { label: "Flights", path: "/flights" },
    { label: "Deals", path: "#" },
    { label: "Blogs", path: "/blogs" },
    { label: "Contact Us", path: "#" },
  ];

  const handleToggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const handleContactClick = () => {
  //   setTimeout(() => {
  //     document
  //       .getElementById("contact")
  //       ?.scrollIntoView({ behavior: "smooth" });
  //   }, 100);
  // };

  const handleContactClick = () => {
    setTimeout(() => {
      const contactElement = document.getElementById("contact");
      const headerOffset = 60; // Adjust this value according to your header height
      const elementPosition = contactElement?.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }, 100);
  };



  return (
    <Container maxWidth="lg">
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{ px: 13, boxShadow: "0 4px 24px rgba(0, 0, 0, 0.25)", py: 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            {isMobile && (
              <IconButton color="inherit" onClick={handleToggleSideBar}>
                <MenuIcon />
              </IconButton>
            )}
            <div
              style={{
                cursor: "pointer",
                marginRight: "24px",
                marginLeft: "24px",
                marginTop: "6px",
              }}
              onClick={() => navigate("/")}
            >
              {logo}
            </div>
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    sx={{
                      textTransform: "capitalize",
                      color:
                        item.label === "Deals" && isDealMenuVisible
                          ? "#FC7300"
                          : location.pathname === item.path
                          ? "#FC7300"
                          : "text.primary",
                      fontWeight: 700,
                      fontSize: "16px",
                      backgroundColor: "transparent",
                      "&:hover": { color: "#FC7300" },
                    }}
                    onClick={() => {
                      if (item.label === "Deals") {
                        toggleDealMenu();
                      }
                      if (item.label === "Contact Us") {
                        handleContactClick();
                      }
                    }}
                    onMouseEnter={() =>
                      item.label === "Deals" && toggleDealMenu()
                    }
                  >
                    {item.label}{" "}
                    {item.label == "Deals" ? (
                      !isDealMenuVisible ? (
                        <BiChevronDown fontSize={"24px"} />
                      ) : (
                        <span
                          style={{
                            transform: "rotate(180deg)",
                            marginTop: "-5px",
                          }}
                        >
                          <BiChevronDown fontSize={"24px"} />
                        </span>
                      )
                    ) : (
                      ""
                    )}
                  </Button>
                ))}
              </Box>
            )}
          </div>
          <section className="d-flex">
            <button
              className="header-book-btn"
              onClick={() => (window.location.href = "tel:012345678901")}
            >
              {phoneSvg}
              {!isMobile && (
                <>
                  <span className="book-now-text">Book Now - Call us 24/7</span>
                  <span className="book-now-phone-no">01-234-567-89-01</span>
                </>
              )}
            </button>
            {!isMobile && <CustomDropdown />}
          </section>
        </Toolbar>
        <div
          className="sidebar"
          style={{
            left: isSidebarOpen ? "0%" : "-90%",
            transition: "left 0.3s ease-in-out",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => navigate("/")}
          >
            <p>{logo}</p>
            <p onClick={handleToggleSideBar}>X</p>
          </div>
          {menuItems.map((item) => (
            <MenuItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleToggleSideBar}
            >
              {item.label}
            </MenuItem>
          ))}
        </div>
      </AppBar>
    </Container>
  );
};

export default Header;

const CustomDropdown = () => {
  // const
  const searchFilterData = useSelector((state) => state.searchFilter);
  const dispatch = useDispatch();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    value: "USD",
    label: "USD",
    img: usa,
  });

  const options = [
    { value: "USD", label: "USD", img: usa },
    { value: "INR", label: "INR", img: india },
  ];


  useEffect(()=>{
    setSelectedOption({ value: "USD", label: "USD", img: usa });
    dispatch(
      setSearchFilter({
        ...searchFilterData,
        currency: "USD",
      })
    );
  },[location])

  return (
    <div className="custom-dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={selectedOption.img}
          alt={selectedOption.label}
          className="dropdown-icon"
        />
        <p>{selectedOption.label}</p>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}></span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              key={option.value}
              className="dropdown-item"
              onClick={() => {
                setSelectedOption(option);
                dispatch(
                  setSearchFilter({
                    ...searchFilterData,
                    currency: option.value,
                  })
                );
                setIsOpen(false);
              }}
            >
              <img
                src={option.img}
                alt={option.label}
                className="dropdown-icon"
              />
              <p>{option.label}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
