import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import img1 from "../../img/footer/1.png";
import img2 from "../../img/footer/2.png";
import img3 from "../../img/footer/3.png";
import img4 from "../../img/footer/4.png";
import img5 from "../../img/footer/5.png";
import img6 from "../../img/footer/6.png";

const EmblaCarousel = (props) => {
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
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true }),
  ]);
  const [isPlaying, setIsPlaying] = useState(true);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onButtonAutoplayClick = useCallback(
    (callback) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());
    emblaApi
      .on("autoScroll:play", () => setIsPlaying(true))
      .on("autoScroll:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoScroll.isPlaying()));
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                {/* <span>{index + 1}</span> */}
                <img width="30%" src={paymentMethods[index].src} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls" style={{ display: "none" }}>
        <div className="embla__buttons">
          <PrevButton
            onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onButtonAutoplayClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>

        <button className="embla__play" onClick={toggleAutoplay} type="button">
          {isPlaying ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default EmblaCarousel;
