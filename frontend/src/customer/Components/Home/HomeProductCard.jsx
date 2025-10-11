import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    window.scrollTo(0, 0);
    navigate(`/product/${product?._id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const { rating, ratingCount } = useMemo(() => {
    const randomRating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
    const randomCount = Math.floor(Math.random() * (25000 - 100) + 100);
    return { rating: randomRating, ratingCount: randomCount };
  }, []);

  return (
    <div
      onClick={handleProductClick}
      className="cursor-pointer rounded flex flex-col bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden w-full max-w-[15rem] mx-1 relative"
    >
      {/* Top Badges */}
      <div className="absolute top-0 left-0 z-10">
      <span className="flex items-center gap-1 bg-gradient-to-r from-[rgb(106,74,191)] to-[rgb(187,164,249)] text-white text-[10px] font-semibold px-2 py-[2px] rounded-br">
  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
  Big Diwali Sale Live
</span>

      </div>
      <div className="absolute top-0 right-2 z-10">
        <button
          className="bg-white/80 backdrop-blur-sm p-1 rounded-full hover:bg-pink-100 transition"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-pink-500" />
        </button>
      </div>

      {/* Product Image */}
      <div className="aspect-square mt-2 w-full overflow-hidden relative bg-gray-50">
        <img
          className="object-contain object-center w-full h-full group-hover:scale-105 transition-transform duration-300 p-2"
          src={product?.imageUrl || product?.image}
          alt={product?.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
      </div>

      {/* Rating */}
      <div className="flex items-center justify-start px-3 mt-2">
        <div className="flex items-center space-x-1 bg-green-600 text-white text-[10px] px-2 py-[2px] rounded">
          <span>{rating}</span>
          <Star className="w-3 h-3 fill-current" />
        </div>
        <span className="text-[10px] text-gray-500 ml-1">({ratingCount})</span>
      </div>

      {/* Details */}
      <div className="px-3 pt-1 pb-3 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-[13px] font-medium text-gray-900 mb-1 line-clamp-2">
          {truncateText(product?.title, 14)}
        </h3>

        {/* Price Section */}
        <div className="flex items-baseline space-x-1">
          {product.discountPersent > 0 && (
            <span className="text-green-600 font-semibold text-[12px]">
              {product.discountPersent}% OFF
            </span>
          )}
          {product?.discountedPrice && product?.price !== product?.discountedPrice && (
            <span className="text-xs text-gray-500 line-through">
              {formatPrice(product.price)}
            </span>
          )}
          <span className="text-base font-bold text-gray-900">
            {formatPrice(product?.discountedPrice || product?.price)}
          </span>
        </div>

        {/* Tag */}
        <div className="mt-2">
          <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-[2px] rounded">
            Top Rated
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;