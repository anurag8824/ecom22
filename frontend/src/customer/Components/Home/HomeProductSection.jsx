import AliceCarousel from "react-alice-carousel";
import HomeProductCard from "./HomeProductCard";
import "./HomeProductSection.css";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";

const HomeProductSection = ({ section, data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  const responsive = {
    0: {
      items: 1, // Changed from 2 to 1 for mobile
      itemsFit: "contain",
    },
    568: {
      items: 3,
      itemsFit: "contain",
    },
    1024: {
      items: 5,
      itemsFit: "contain",
    },
  };

  // Update items per slide based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth >= 1024) setItemsPerSlide(5);
      else if (window.innerWidth >= 568) setItemsPerSlide(3);
      else setItemsPerSlide(1); // Changed from 2 to 1 for mobile
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const slidePrev = () => {
    setActiveIndex(Math.max(0, activeIndex - 1));
  };

  const slideNext = () => {
    const maxIndex = Math.max(0, (data?.length || 0) - itemsPerSlide);
    setActiveIndex(Math.min(maxIndex, activeIndex + 1));
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  // Safety check for data
  if (!data || data.length === 0) {
    return (
      <div className="relative px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 py-5">{section}</h2>
        <div className="text-center py-10 text-gray-500 border rounded-lg">
          <p>No products available in this category.</p>
        </div>
      </div>
    );
  }

  const displayData = data.slice(0, 10);
  const items = displayData.map((item, index) => (
    <div key={item._id || index} className="px-2">
      <HomeProductCard product={item} />
    </div>
  ));

  const maxIndex = Math.max(0, displayData.length - itemsPerSlide);
  const canGoNext = activeIndex < maxIndex;
  const canGoPrev = activeIndex > 0;

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-extrabold text-gray-900 py-5">{section}</h2>
      <div className="relative border rounded-lg p-5 bg-white shadow-sm">
        <AliceCarousel
          disableButtonsControls
          disableDotsControls
          mouseTracking
          items={items}
          activeIndex={activeIndex}
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          animationType="slide"
          animationDuration={300}
          touchTracking={true}
          infinite={false}
          paddingLeft={0}
          paddingRight={0}
        />
        
        {/* Next Button */}
        {canGoNext && (
          <Button
            onClick={slideNext}
            variant="contained"
            className="z-50"
            sx={{
              position: "absolute",
              top: "50%",
              right: "-15px",
              transform: "translateY(-50%)",
              minWidth: "45px",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              color: "#374151",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor: "#f9fafb",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                transform: "translateY(-50%) scale(1.05)",
              },
              "&:active": {
                transform: "translateY(-50%) scale(0.95)",
              },
              transition: "all 0.2s ease-in-out",
            }}
            aria-label="Next products"
          >
            <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />
          </Button>
        )}

        {/* Previous Button */}
        {canGoPrev && (
          <Button
            onClick={slidePrev}
            variant="contained"
            className="z-50"
            sx={{
              position: "absolute",
              top: "50%",
              left: "-15px",
              transform: "translateY(-50%)",
              minWidth: "45px",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              color: "#374151",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor: "#f9fafb",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                transform: "translateY(-50%) scale(1.05)",
              },
              "&:active": {
                transform: "translateY(-50%) scale(0.95)",
              },
              transition: "all 0.2s ease-in-out",
            }}
            aria-label="Previous products"
          >
            <ArrowForwardIosIcon 
              sx={{ 
                fontSize: "18px",
                transform: "rotate(180deg)" 
              }} 
            />
          </Button>
        )}

        {/* Optional: Add dots indicator for small screens */}
        {displayData.length > itemsPerSlide && (
          <div className="flex justify-center mt-4 space-x-2 md:hidden">
            {Array.from({ length: Math.ceil(displayData.length / itemsPerSlide) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(activeIndex / itemsPerSlide) === index
                    ? 'bg-gray-800'
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProductSection;