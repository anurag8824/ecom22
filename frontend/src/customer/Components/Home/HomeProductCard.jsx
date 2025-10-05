import React from "react";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
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

  return (
    <div
      onClick={handleProductClick}
      className="cursor-pointer flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden w-full max-w-[15rem] mx-2 group relative"
    >
      {/* Discount Badge */}
      {product?.discountPersent > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {product.discountPersent}% OFF
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="aspect-square w-full overflow-hidden relative">
        <img
          className="object-contain object-center w-full h-full group-hover:scale-105 transition-transform duration-300 p-2"
          src={product?.imageUrl || product?.image}
          alt={product?.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Brand */}
        {product?.brand && (
          <p className="text-xs text-gray-500 uppercase font-medium mb-1">
            {product.brand}
          </p>
        )}

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-900 mb-2 flex-1">
          {truncateText(product?.title, 45)}
        </h3>

        {/* Pricing */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product?.discountedPrice || product?.price)}
          </span>
          {product?.discountedPrice && product?.price !== product?.discountedPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product?.quantity !== undefined && (
          <div className="mt-1">
            {product.quantity > 0 ? (
              <span className="text-xs text-green-600">
                {product.quantity > 10 ? 'In Stock' : `Only ${product.quantity} left`}
              </span>
            ) : (
              <span className="text-xs text-red-600">Out of Stock</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProductCard;