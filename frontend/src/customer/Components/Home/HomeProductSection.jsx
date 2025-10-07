import React from "react";
import HomeProductCard from "./HomeProductCard";
import "./HomeProductSection.css";

const HomeProductSection = ({ section, data }) => {
  console.log("HomeProductSection data:", data, section);

  // If no products available
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

  return (
    <div className="relative px-2 sm:px-6 lg:px-8">
      {/* Section Title */}
      {/* <h2 className="text-2xl font-extrabold text-gray-900 py-5">{section} </h2> */}

      {/* Product Grid */}
      <div
        className="
          grid 
          grid-cols-2 
          md:grid-cols-5 
          lg:grid-cols-6 
            justify-center 
          gap-2 
          rounded-lg 
        "
      >
        {data.map((item, index) => (
          <div key={item._id || index}
          className="flex justify-center items-center">
            <HomeProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeProductSection;
