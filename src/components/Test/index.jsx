import React from "react";
import ReactDOM from "react-dom/client";
import EmblaCarousel from "./EmblaCarousel";
import "./index.css";
import img1 from "../../img/footer/1.png";
import img2 from "../../img/footer/2.png";
import img3 from "../../img/footer/3.png";
import img4 from "../../img/footer/4.png";
import img5 from "../../img/footer/5.png";
import img6 from "../../img/footer/6.png";

const OPTIONS = { loop: true };
const paymentMethods = [
  { name: "American Express", src: img1 },
  { name: "PayPal", src: img2 },
  { name: "Visa", src: img3 },
  { name: "Mastercard", src: img4 },
  { name: "Discover", src: img5 },
  { name: "ICICI", src: img6 },
  { name: "American Express", src: img1 },
  { name: "PayPal", src: img2 },
  { name: "Visa", src: img3 },
  { name: "Mastercard", src: img4 },
  { name: "Discover", src: img5 },
  { name: "ICICI", src: img6 },
  { name: "American Express", src: img1 },
  { name: "PayPal", src: img2 },
  { name: "Visa", src: img3 },
  { name: "Mastercard", src: img4 },
  { name: "Discover", src: img5 },
  { name: "ICICI", src: img6 },
];
const SLIDE_COUNT = paymentMethods.length;

const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Test = () => (
  <>
    {/* <Header /> */}
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    {/* <Footer /> */}
  </>
);

export default Test;
