import { Container } from "@mui/material";
import React, { useState } from "react";
import Title from "../Title";
import { phoneSvg } from "../../svg/phone";
import help_1 from "../../img/help_1.png";
import help_1_mobile from "../../img/help_1_mobile.png";
import help_2 from "../../img/help_2.png";
import help_2_mobile from "../../img/help_2_mobile.png";
import { searchArrowSvg } from "../../svg/searchArrow";
import "./index.css";

function Help() {
  const [email, setEmail] = useState("");
  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <div className="cards">
        <Title title="We are here to help" />
        <div className="mobile-view">
          <img width="100%" src={help_1_mobile} />
        </div>
        <div className="help-card-container">
          <section className="help_left_card">
            <div className="bb">
              <h3 style={{ marginBottom: "12px",marginTop: "12px" }}>
                Change or Cancel Your Booking?
              </h3>
              <p
                style={{
                  marginBottom: "12px",
                  color: "#525252",
                  fontSize: "12px",
                }}
              >
                If you need assistance with changes or cancellations to your
                current booking, our customer support team is just a call away.
              </p>
              <button
                className="help-btn"
                // style={{
                //   border: "2px solid #FC7300",
                //   borderRadius: "8px",
                //   color: "#FC7300",
                //   display: "flex",
                //   alignItems: "center",
                //   background: "transparent",
                //   fontSize: "24px",
                //   padding: "10px",
                // }}
                onClick={() => {
                  window.location.href = "tel:1234-5678-9012";
                }}
              >
                {phoneSvg}{" "}
                <span style={{ marginLeft: "4px" }}>1234-5678-9012</span>
              </button>
            </div>
            <div className="right" style={{ marginLeft: "12px" }}>
              <div className="web-view">
                <img width="100%" src={help_1} />
              </div>
            </div>
          </section>
          <section className="vertical_line"></section>
          <section className="help_left_card">
            <div className="">
              <div className="mobile-view">
                <img width="100%" src={help_2_mobile} />
              </div>
              <h3 style={{ marginBottom: "12px" }}>
                Save More with TriWize Coins!
              </h3>
              <p
                style={{
                  marginBottom: "12px",
                  color: "#525252",
                  fontSize: "12px",
                }}
              >
                Share your details with us, and our customer representative will
                connect with you to guide you on how to redeem your coins.
              </p>
              <section
              className="email-"
                style={{
                  border: "1px solid #989DA8",
                  width: "max-content",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <input
                  style={{
                    border: "none",
                    outline: "none",
                    padding: "16px",
                    width: "220px",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email..."
                />
                <div
                  style={{
                    background: "#FFDFBD",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    borderLeft: "1px solid #989DA8",
                  }}
                  onClick={() => {
                    if (email != "") {
                      window.alert(`Email Sent to ${email}...`);
                    } else {
                      window.alert(`Email field is empty...`);
                    }
                  }}
                >
                  {searchArrowSvg}
                </div>
              </section>
            </div>
            <div className="right" style={{ marginLeft: "12px" }}>
              <div className="web-view">
                <img width="102%" src={help_2} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}

export default Help;
