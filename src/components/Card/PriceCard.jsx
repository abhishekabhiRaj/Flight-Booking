import React from "react";
import { dividerSvg } from "../../svg/divider";
import "./index.css";
import flightLogo from "../../img/plane_img.png";
import { useNavigate } from "react-router-dom";

const OneWayPriceCard = () => {
  const navigate = useNavigate();
  return (
    <div className="card flight-price shadow-small">
      <section className="top">
        {" "}
        <section style={{ display: "flex", alignItems: "center" }}>
          <img width="35px" src={flightLogo} />
          <p
            className="font-16 font-weight-700 text-grey-1"
            style={{ marginLeft: "8px" }}
          >
            {" "}
            AIR INDIA
          </p>
        </section>
        <p className="font-24 font-weight-700 text-grey-1"> $200 </p>{" "}
      </section>
      <section className="bottom">
        <div>
          <p className="font-24 font-weight-700 text-grey-1">JKF</p>
          <p className="font-10 font-weight-400 text-grey-2"> 2024/05/03</p>
        </div>
        <div>
          <p
            className="font-14 font-weight-700 text-grey-1"
            style={{ textAlign: "center" }}
          >
            9hr 50min
          </p>
          {dividerSvg}
          <p
            className="font-14 font-weight-700 text-grey-1"
            style={{ textAlign: "center" }}
          >
            <span className="font-10 font-weight-700 text-primary mr-1">
              1 Stop
            </span>{" "}
            <span className="font-10 font-weight-700 text-grey-3">DEL</span>
          </p>
        </div>
        <div>
          <p className="font-24 font-weight-700 text-grey-1">MCO</p>
        </div>
        <div className="web-view">
          <button
            style={{ width: "96px", borderRadius: "8px" }}
            className="btn-primary font-14 font-weight-400"
            onClick={() => {
              navigate("/booking");
            }}
          >
            Book
          </button>
        </div>
      </section>
      <div className="divider mobile-view"></div>

      <section className="mobile-view">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px",
          }}
        >
          {/* <img src={flightLogo} /> */}
          <button
            style={{ width: "100%" }}
            onClick={() => {
              navigate("/booking");
            }}
            className="btn-primary"
          >
            Book
          </button>
        </div>
      </section>
    </div>
  );
};

const RoundWayPriceCard = () => {
  const navigate = useNavigate();
  return (
    <div
      className="card flight-price round-card shadow-small"
      style={{ marginBottom: "24px" }}
    >
      <section className="left" style={{ padding: 0, paddingRight: "28px" }}>
        <section className="top">
          {" "}
          <section style={{ display: "flex", alignItems: "center" }}>
            <img width="35px" src={flightLogo} />
            <p
              className="font-16 font-weight-700 text-grey-1"
              style={{ marginLeft: "8px" }}
            >
              {" "}
              AIR INDIA
            </p>
          </section>
          <p className="font-24 font-weight-700 text-grey-1 web-opacity-0">
            {" "}
            $200{" "}
          </p>{" "}
        </section>
        <section className="bottom">
          <div>
            <p className="font-24 font-weight-700 text-grey-1">JKF</p>
            <p className="font-10 font-weight-400 text-grey-2"> 2024/05/03</p>
          </div>
          <div>
            <p
              className="font-14 font-weight-700 text-grey-1"
              style={{ textAlign: "center" }}
            >
              9hr 50min
            </p>
            {dividerSvg}
            <p
              className="font-14 font-weight-700 text-grey-1"
              style={{ textAlign: "center" }}
            >
              <span className="font-10 font-weight-700 text-primary mr-1">
                1 Stop
              </span>{" "}
              <span className="font-10 font-weight-700 text-grey-3">DEL</span>
            </p>
          </div>
          <div>
            <p className="font-24 font-weight-700 text-grey-1">MCO</p>
          </div>
          {/* <div className="web-view">
            <button
              style={{ width: "96px", borderRadius: "8px", opacity: "0" }}
              className="btn-primary font-14 font-weight-400 "
            >
              Book
            </button>
          </div> */}
        </section>
      </section>
      <div className="divider" style={{ marginTop: "8px" }}></div>
      <section className="right" style={{ padding: 0, paddingLeft: "28px" }}>
        <section className="top web-view">
          {" "}
          <section style={{ display: "flex", alignItems: "center" }}>
            <img width="35px" src={flightLogo} />
            <p
              className="font-16 font-weight-700 text-grey-1"
              style={{ marginLeft: "8px" }}
            >
              {" "}
              AIR INDIA
            </p>
          </section>
          <p className="font-24 font-weight-700 text-grey-1"> $200 </p>{" "}
        </section>
        <section className="bottom">
          <div>
            <p className="font-24 font-weight-700 text-grey-1">JKF</p>
            <p className="font-10 font-weight-400 text-grey-2"> 2024/05/03</p>
          </div>
          <div>
            <p
              className="font-14 font-weight-700 text-grey-1"
              style={{ textAlign: "center" }}
            >
              9hr 50min
            </p>
            {dividerSvg}
            <p
              className="font-14 font-weight-700 text-grey-1"
              style={{ textAlign: "center" }}
            >
              <span className="font-10 font-weight-700 text-primary mr-1">
                1 Stop
              </span>{" "}
              <span className="font-10 font-weight-700 text-grey-3">DEL</span>
            </p>
          </div>
          <div>
            <p className="font-24 font-weight-700 text-grey-1">MCO</p>
          </div>
          <div className="web-view">
            <button
              onClick={() => {
                navigate("/booking");
              }}
              style={{ width: "96px", borderRadius: "8px" }}
              className="btn-primary font-14 font-weight-400 "
            >
              Book
            </button>
          </div>
        </section>
        <div className="divider  mobile-view"></div>

        <section className="mobile-view">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px",
            }}
          >
            {/* <img src={flightLogo} /> */}
            <button
              style={{ width: "100%" }}
              onClick={() => {
                navigate("/booking");
              }}
              className="btn-primary"
            >
              Book
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};

export { OneWayPriceCard, RoundWayPriceCard };
