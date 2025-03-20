import { Container } from "@mui/material";
import React from "react";
import { googleSvg } from "../../svg/google";
import { facebookSvg } from "../../svg/facebook";
import { starSvg } from "../../svg/star";
import "./index.css";

function Review() {
  let data = [
    {
      img: googleSvg,
      rating: "4.8",
      title: "Google Review",
      para: '"Amazing service! I was able to book my dream trip at a fantastic price. The customer support team was super helpful and available 24/7 to answer all my questions. I especially appreciated the transparency in pricing—no hidden fees! Highly recommend for anyone looking to save on travel."',
      author: "Sophia L",
    },
    {
      img: facebookSvg,
      rating: "4.2",
      title: "FaceBook Review",
      para: '"Amazing service! I was able to book my dream trip at a fantastic price. The customer support team was super helpful and available 24/7 to answer all my questions. I especially appreciated the transparency in pricing—no hidden fees! Highly recommend for anyone looking to save on travel."',
      author: "Sophia L",
    },
    {
      img: starSvg,
      rating: "4.8",
      title: "Trustpilot Review",
      para: '"Amazing service! I was able to book my dream trip at a fantastic price. The customer support team was super helpful and available 24/7 to answer all my questions. I especially appreciated the transparency in pricing—no hidden fees! Highly recommend for anyone looking to save on travel."',
      author: "Sophia L",
    },
  ];
  return (
    <Container maxWidth="lg" sx={{ my: 0 }}>
      <div className="cards--">
        <div className="review-card-container">
          {data.map((item, i) => (
            <ReviewCard
              key={i}
              img={item.img}
              rating={item.rating}
              title={item.title}
              para={item.para}
              author={item.author}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Review;

const ReviewCard = ({ img, rating, title, para, author }) => {
  return (
    <section className="reveiw_card">
      <div className="cards ">
        <h1
          style={{
            margin: "0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "40px" }}>{rating}</span>
          <span>{img}</span>
        </h1>
        <h2>{title}</h2>
        <p style={{ color: "#525252", marginTop: "8px" }}>{para}</p>
        <p style={{ color: "#525252", marginTop: "8px" }}>— {author}.</p>
      </div>
    </section>
  );
};
