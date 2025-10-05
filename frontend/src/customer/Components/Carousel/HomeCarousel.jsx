import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCaroselData";
import { useNavigate } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = () => {
  const navigate = useNavigate();
  const item = homeCarouselData.map((item, index) => (
    <img
      key={index}
      className="cursor-pointer w-full h-46 object-cover"
      onClick={() => navigate(item.path)}
      src={item.image}
      alt={item.alt || `Carousel image ${index + 1}`}
      onDragStart={handleDragStart}
      role="presentation"
    />
  ));
  
  return (
    <AliceCarousel
      mouseTracking
      items={item}
      autoPlay
      infinite
      autoPlayInterval={2000}
      disableButtonsControls
    />
  );
};

export default HomeCarousel;