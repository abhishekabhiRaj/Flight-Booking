import React from "react";
import { investSvg } from "../../svg/invest.jsx";
import img from "../../img/invest.png";
import { Container } from "@mui/material";
import "./index.css";

function Invest() {
  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <div style={{ position: "relative" }}>
        {/* <img style={{ borderRadius: "8px" }} width="100%" src={img} /> */}
        <section className="image-invest"></section>
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "30px",
            // background: "red",
            width: "130px",
            height: "40px",
            cursor: "pointer",
          }}
          onClick={() => window.alert("CLicked")}
        >
          {" "}
        </div>
      </div>
    </Container>
  );
}

export default Invest;
