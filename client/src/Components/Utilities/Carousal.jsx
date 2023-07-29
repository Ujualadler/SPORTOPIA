import { useEffect, useRef, useState } from "react";
import "./Carousal.css";

export default function Carousal({ slides }) {
  const sliderTrackRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(null);
  const [sliderLength, setSliderLength] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const sliders = document.getElementsByClassName("carousel-item");
    const slider = sliders[0];
    if (slider) {
      setSliderWidth(slider.offsetWidth);
      setSliderLength(sliders.length);
    }
  }, []);

  const handleNextClick = () => {
    if (currentSlide == 1) sliderTrackRef.current.scrollLeft = sliderWidth;
    else sliderTrackRef.current.scrollLeft = currentSlide * sliderWidth;
    console.log();
    setCurrentSlide((prevSlider) => prevSlider + 1);
  };
  const handlePrevClick = () => {
    if (currentSlide === 1) {
      sliderTrackRef.current.scrollLeft = 0;
      setCurrentSlide((prevSlider) => prevSlider - 1);
    } else if (currentSlide > 1) {
      sliderTrackRef.current.scrollLeft = (currentSlide - 2) * sliderWidth;
      setCurrentSlide((prevSlider) => prevSlider - 1);
    }
  };

  return (
    <>
      <div className="bg-white relative carousel w- h-1/3 mt-3 ml-5 mr-5 rounded-lg">
        <div className="slider  overflow-hidden">
          <div className="slider-track flex" ref={sliderTrackRef}>
            {slides.length > 0 &&
              slides.map((slide) => (
                <div
                  id={`slide-${slide.id}`}
                  className="carousel-item relative w-full h-auto"
                >
                  <img src={slide.image} className="w-full rounded-lg" />
                  <div className="slide-text absolute">
                    <h3 className="slider-head font-extrabold hover:text-slate-300 text-3xl font-mono tracking-widest">
                      {slide.title}
                    </h3>
                    <p className="sub-text font-bold  text-slate-300 text-xl mt-3 font-mono tracking-widest">
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="absolute flex justify-between text-white transform -translate-y-1/2 left-5 right-5 top-1/2">
          {currentSlide > 1 ? (
            <button
              className="btn btn-circle  absolute left-0"
              onClick={handlePrevClick}
            >
              ❮
            </button>
          ) : null}
          {currentSlide < sliderLength ? (
            <button
              className="btn btn-circle absolute right-0"
              onClick={handleNextClick}
            >
              ❯
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
