import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";
import { Box, Button, Grid, LinearProgress, Rating, IconButton, Tooltip, Chip, Alert, Snackbar } from "@mui/material";
import { FavoriteOutlined, Favorite, ShoppingCart, LocalShipping, Security, Verified } from "@mui/icons-material";
import HomeProductCard from "../../Home/HomeProductCard";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
import { gounsPage1 } from "../../../../Data/Gouns/gouns";
import { addToWishlist } from "../../../../Redux/Customers/Wishlist/Action";

const highlights = ["Hand cut and sewn locally", "Dyed with our proprietary colors", "Pre-washed & pre-shrunk", "Ultra-soft 100% cotton"];
const details = 'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors.';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct, review, wishlist } = useSelector((store) => store);
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");

  const showAlertMsg = (msg, severity = "success") => {
    setAlertMessage(msg);
    setAlertSeverity(severity);
    setShowAlert(true);
  };

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  const checkAuth = () => {
    if (!jwt || isTokenExpired(jwt)) {
      localStorage.removeItem("jwt");
      showAlertMsg("Please login or signup to continue", "warning");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkAuth()) return;
    
    const data = { productId, size: selectedSize?.name };
    dispatch(addItemToCart({ data, jwt }))
      .then(() => {
        showAlertMsg("Item added to cart successfully!");
        setTimeout(() => navigate("/cart"), 1500);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("jwt");
          showAlertMsg("Session expired. Please login again", "warning");
  
        } else {
          showAlertMsg("Failed to add item to cart", "error");
        }
      });
  };

  const handleAddToWishlist = async () => {
    if (!checkAuth()) return;

    try {
      await dispatch(addToWishlist(productId, jwt));
      setIsWishlisted(!isWishlisted);
      showAlertMsg(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("jwt");
        showAlertMsg("Session expired. Please login again", "warning");

      } else {
        showAlertMsg("Failed to update wishlist", "error");
      }
    }
  };

  useEffect(() => {
    if (productId) {
      dispatch(findProductById({ productId, jwt }));
      dispatch(getAllReviews(productId));
    }
  }, [productId, dispatch, jwt]);

  const currentProduct = customersProduct.product?.data;
  const shouldShowSizeSelector = currentProduct?.category?.name === "cloths";

  // Check if product is in wishlist
  useEffect(() => {
    if (wishlist?.wishlistItems && Array.isArray(wishlist.wishlistItems) && currentProduct) {
      const isInWishlist = wishlist.wishlistItems.some(item => item.product?.id === currentProduct.id);
      setIsWishlisted(isInWishlist);
    }
  }, [wishlist, currentProduct]);

  if (!currentProduct && productId) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-lg font-medium text-gray-700">Loading product details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Alert Snackbar */}
      <Snackbar open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setShowAlert(false)} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Home</a></li>
            <li className="text-gray-400">/</li>
            <li><span className="text-gray-500">{currentProduct?.category?.name}</span></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{currentProduct?.brand}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
            <img src={currentProduct?.imageUrl} alt={currentProduct?.title} className="h-full w-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{currentProduct?.brand}</h1>
                <p className="text-lg text-gray-600 mt-1">{currentProduct?.title}</p>
              </div>
              <Tooltip title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}>
                <IconButton onClick={handleAddToWishlist} sx={{ color: isWishlisted ? '#e91e63' : '#9ca3af' }}>
                  {isWishlisted ? <Favorite /> : <FavoriteOutlined />}
                </IconButton>
              </Tooltip>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">₹{currentProduct?.discountedPrice}</span>
              <span className="text-xl text-gray-500 line-through">₹{currentProduct?.price}</span>
              <Chip label={`${currentProduct?.discountPersent}% OFF`} color="success" size="small" />
            </div>

            {/* Reviews */}
            <div className="flex items-center space-x-4 py-4 border-y border-gray-200">
              <Rating value={4.6} precision={0.5} readOnly size="small" />
              <span className="text-sm text-gray-600">4.6 (42,807 ratings)</span>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <LocalShipping className="h-5 w-5 text-green-600" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Security className="h-5 w-5 text-blue-600" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Verified className="h-5 w-5 text-purple-600" />
                <span>Authentic</span>
              </div>
            </div>

            {/* Size Selection */}
            {shouldShowSizeSelector && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Select Size</h3>
                <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                  <div className="grid grid-cols-4 gap-3">
                    {currentProduct?.sizes?.map((size) => {
                      const sizeWithStock = { ...size, inStock: size.quantity > 0 };
                      return (
                        <RadioGroup.Option key={size.name} value={sizeWithStock} disabled={!sizeWithStock.inStock}
                          className={({ checked }) => classNames(
                            sizeWithStock.inStock ? "cursor-pointer bg-white text-gray-900 shadow-sm border-gray-300" : "cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200",
                            checked ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                            "relative flex items-center justify-center rounded-lg border py-3 px-3 text-sm font-medium uppercase hover:bg-gray-50"
                          )}>
                          <RadioGroup.Label>{size.name}</RadioGroup.Label>
                          {!sizeWithStock.inStock && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </span>
                          )}
                        </RadioGroup.Option>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="space-y-4 pt-6">
              <Button variant="contained" onClick={handleSubmit} disabled={shouldShowSizeSelector && !selectedSize} startIcon={<ShoppingCart />}
                sx={{ width: '100%', padding: '12px 24px', fontSize: '16px', fontWeight: 600, borderRadius: '12px', textTransform: 'none' }}>
                Add to Cart
              </Button>
              {shouldShowSizeSelector && !selectedSize && (
                <p className="text-sm text-amber-600 text-center">Please select a size to continue</p>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{currentProduct?.description}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h3>
              <ul className="space-y-2">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Reviews & Ratings</h2>
          <div className="bg-gray-50 rounded-2xl p-6">
            <Grid container spacing={6}>
              <Grid item xs={12} lg={8}>
                <div className="space-y-6">
                  {review.reviews?.length > 0 ? (
                    review.reviews.map((item, i) => (
                      <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                        <ProductReviewCard item={item} />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} lg={4}>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Ratings</h3>
                  <div className="flex items-center space-x-3 mb-6">
                    <Rating value={4.6} precision={0.1} readOnly size="large" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">4.6</div>
                      <div className="text-sm text-gray-500">42,807 ratings</div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* Similar Products */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gounsPage1.slice(0, 8).map((item, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform duration-200">
                <HomeProductCard product={item} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}