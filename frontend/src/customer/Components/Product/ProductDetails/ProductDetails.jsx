// import { useState, useEffect } from "react";
// import { RadioGroup } from "@headlessui/react";
// import { useNavigate, useParams } from "react-router-dom";
// import ProductReviewCard from "./ProductReviewCard";
// import { Box, Button, Grid, LinearProgress, Rating, IconButton, Tooltip, Chip, Alert, Snackbar } from "@mui/material";
// import { FavoriteOutlined, Favorite, ShoppingCart, LocalShipping, Security, Verified } from "@mui/icons-material";
// import HomeProductCard from "../../Home/HomeProductCard";
// import { useDispatch, useSelector } from "react-redux";
// import { findProductById } from "../../../../Redux/Customers/Product/Action";
// import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
// import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
// import { gounsPage1 } from "../../../../Data/Gouns/gouns";
// import { addToWishlist } from "../../../../Redux/Customers/Wishlist/Action";
// import TopNoticeBar from "../../TopNoticeBar";

// const highlights = ["Hand cut and sewn locally", "Dyed with our proprietary colors", "Pre-washed & pre-shrunk", "Ultra-soft 100% cotton"];
// const details = 'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors.';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductDetails() {
//   const [selectedSize, setSelectedSize] = useState();
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertSeverity, setAlertSeverity] = useState("success");

  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { customersProduct, review, wishlist } = useSelector((store) => store);
//   const { productId } = useParams();
//   const jwt = localStorage.getItem("jwt");

//   const showAlertMsg = (msg, severity = "success") => {
//     setAlertMessage(msg);
//     setAlertSeverity(severity);
//     setShowAlert(true);
//   };

//   const isTokenExpired = (token) => {
//     if (!token) return true;
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return payload.exp * 1000 < Date.now();
//     } catch (error) {
//       return true;
//     }
//   };

//   const checkAuth = () => {
//     if (!jwt || isTokenExpired(jwt)) {
//       localStorage.removeItem("jwt");
//       showAlertMsg("Please login or signup to continue", "warning");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!checkAuth()) return;
    
//     const data = { productId, size: selectedSize?.name };
//     dispatch(addItemToCart({ data, jwt }))
//       .then(() => {
//         showAlertMsg("Item added to cart successfully!");
//         setTimeout(() => navigate("/cart"), 1500);
//       })
//       .catch((error) => {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("jwt");
//           showAlertMsg("Session expired. Please login again", "warning");
  
//         } else {
//           showAlertMsg("Failed to add item to cart", "error");
//         }
//       });
//   };

//   const handleAddToWishlist = async () => {
//     if (!checkAuth()) return;

//     try {
//       await dispatch(addToWishlist(productId, jwt));
//       setIsWishlisted(!isWishlisted);
//       showAlertMsg(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
//     } catch (error) {
//       if (error.response?.status === 401) {
//         localStorage.removeItem("jwt");
//         showAlertMsg("Session expired. Please login again", "warning");

//       } else {
//         showAlertMsg("Failed to update wishlist", "error");
//       }
//     }
//   };

//   useEffect(() => {
//     if (productId) {
//       dispatch(findProductById({ productId, jwt }));
//       dispatch(getAllReviews(productId));
//     }
//   }, [productId, dispatch, jwt]);

//   const currentProduct = customersProduct.product?.data;
//   const shouldShowSizeSelector = currentProduct?.category?.name === "cloths";

//   // Check if product is in wishlist
//   useEffect(() => {
//     if (wishlist?.wishlistItems && Array.isArray(wishlist.wishlistItems) && currentProduct) {
//       const isInWishlist = wishlist.wishlistItems.some(item => item.product?.id === currentProduct.id);
//       setIsWishlisted(isInWishlist);
//     }
//   }, [wishlist, currentProduct]);

//   if (!currentProduct && productId) {
//     return (
//       <div className="bg-white min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//           <div className="text-lg font-medium text-gray-700">Loading product details...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white">
//       {/* Alert Snackbar */}
//       <Snackbar open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
//         <Alert onClose={() => setShowAlert(false)} severity={alertSeverity} sx={{ width: '100%' }}>
//           {alertMessage}
//         </Alert>
//       </Snackbar>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Breadcrumb */}
//         <nav className="mb-8">
//           <ol className="flex items-center space-x-2 text-sm">
//             <li><a href="/" className="text-gray-500 hover:text-gray-700">Home</a></li>
//             <li className="text-gray-400">/</li>
//             <li><span className="text-gray-500">{currentProduct?.category?.name}</span></li>
//             <li className="text-gray-400">/</li>
//             <li className="text-gray-900 font-medium">{currentProduct?.brand}</li>
//           </ol>
//         </nav>

// <TopNoticeBar/>
//         {/* Product Details */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
//           {/* Image */}
//           <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
//             <img src={currentProduct?.imageUrl} alt={currentProduct?.title} className="h-full w-full object-cover hover:scale-105 transition-transform duration-300" />
//           </div>

//           {/* Product Info */}
//           <div className="space-y-6">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{currentProduct?.brand}</h1>
//                 <p className="text-lg text-gray-600 mt-1">{currentProduct?.title}</p>
//               </div>
//               <Tooltip title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}>
//                 <IconButton onClick={handleAddToWishlist} sx={{ color: isWishlisted ? '#e91e63' : '#9ca3af' }}>
//                   {isWishlisted ? <Favorite /> : <FavoriteOutlined />}
//                 </IconButton>
//               </Tooltip>
//             </div>

//             {/* Price */}
//             <div className="flex items-center space-x-4">
//               <span className="text-3xl font-bold text-gray-900">₹{currentProduct?.discountedPrice}</span>
//               <span className="text-xl text-gray-500 line-through">₹{currentProduct?.price}</span>
//               <Chip label={`${currentProduct?.discountPersent}% OFF`} color="success" size="small" />
//             </div>

//             {/* Reviews */}
//             <div className="flex items-center space-x-4 py-4 border-y border-gray-200">
//               <Rating value={4.6} precision={0.5} readOnly size="small" />
//               <span className="text-sm text-gray-600">4.6 (42,807 ratings)</span>
//             </div>

//             {/* Trust Badges */}
//             <div className="grid grid-cols-3 gap-4 py-4">
//               <div className="flex items-center space-x-2 text-sm text-gray-600">
//                 <LocalShipping className="h-5 w-5 text-green-600" />
//                 <span>Free Shipping</span>
//               </div>
//               <div className="flex items-center space-x-2 text-sm text-gray-600">
//                 <Security className="h-5 w-5 text-blue-600" />
//                 <span>Secure Payment</span>
//               </div>
//               <div className="flex items-center space-x-2 text-sm text-gray-600">
//                 <Verified className="h-5 w-5 text-purple-600" />
//                 <span>Authentic</span>
//               </div>
//             </div>

//             {/* Size Selection */}
//             {shouldShowSizeSelector && (
//               <div className="space-y-4">
//                 <h3 className="text-lg font-medium text-gray-900">Select Size</h3>
//                 <RadioGroup value={selectedSize} onChange={setSelectedSize}>
//                   <div className="grid grid-cols-4 gap-3">
//                     {currentProduct?.sizes?.map((size) => {
//                       const sizeWithStock = { ...size, inStock: size.quantity > 0 };
//                       return (
//                         <RadioGroup.Option key={size.name} value={sizeWithStock} disabled={!sizeWithStock.inStock}
//                           className={({ checked }) => classNames(
//                             sizeWithStock.inStock ? "cursor-pointer bg-white text-gray-900 shadow-sm border-gray-300" : "cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200",
//                             checked ? "border-indigo-500 ring-2 ring-indigo-500" : "",
//                             "relative flex items-center justify-center rounded-lg border py-3 px-3 text-sm font-medium uppercase hover:bg-gray-50"
//                           )}>
//                           <RadioGroup.Label>{size.name}</RadioGroup.Label>
//                           {!sizeWithStock.inStock && (
//                             <span className="absolute inset-0 flex items-center justify-center">
//                               <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                               </svg>
//                             </span>
//                           )}
//                         </RadioGroup.Option>
//                       );
//                     })}
//                   </div>
//                 </RadioGroup>
//               </div>
//             )}

//             {/* Add to Cart Button */}
//             <div className="space-y-4 pt-6">
//               <Button variant="contained" onClick={handleSubmit} disabled={shouldShowSizeSelector && !selectedSize} startIcon={<ShoppingCart />}
//                 sx={{ width: '100%', padding: '12px 24px', fontSize: '16px', fontWeight: 600, borderRadius: '12px', textTransform: 'none' }}>
//                 Add to Cart
//               </Button>
//               {shouldShowSizeSelector && !selectedSize && (
//                 <p className="text-sm text-amber-600 text-center">Please select a size to continue</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
//           <div className="lg:col-span-2 space-y-8">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
//               <p className="text-gray-700 leading-relaxed">{currentProduct?.description}</p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h3>
//               <ul className="space-y-2">
//                 {highlights.map((highlight, index) => (
//                   <li key={index} className="flex items-start space-x-3">
//                     <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0"></div>
//                     <span className="text-gray-700">{highlight}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Reviews */}
//         <section className="mb-16">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Reviews & Ratings</h2>
//           <div className="bg-gray-50 rounded-2xl p-6">
//             <Grid container spacing={6}>
//               <Grid item xs={12} lg={8}>
//                 <div className="space-y-6">
//                   {review.reviews?.length > 0 ? (
//                     review.reviews.map((item, i) => (
//                       <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
//                         <ProductReviewCard item={item} />
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-center py-12">
//                       <p className="text-gray-500">No reviews yet. Be the first to review!</p>
//                     </div>
//                   )}
//                 </div>
//               </Grid>
//               <Grid item xs={12} lg={4}>
//                 <div className="bg-white rounded-xl p-6 shadow-sm">
//                   <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Ratings</h3>
//                   <div className="flex items-center space-x-3 mb-6">
//                     <Rating value={4.6} precision={0.1} readOnly size="large" />
//                     <div>
//                       <div className="text-2xl font-bold text-gray-900">4.6</div>
//                       <div className="text-sm text-gray-500">42,807 ratings</div>
//                     </div>
//                   </div>
//                 </div>
//               </Grid>
//             </Grid>
//           </div>
//         </section>

//         {/* Similar Products */}
//         <section>
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Products</h2>
//           <div className="flex overflow-x-auto space-x-1 scrollbar-hide py-2">
//             {gounsPage1.slice(0, 8).map((item, index) => (
//               <div key={index} className="transform flex justify-center hover:scale-105 transition-transform duration-200">
//                 <HomeProductCard product={item} />
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";
import { Box, Button, Grid, LinearProgress, Rating, IconButton, Tooltip, Chip, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { FavoriteOutlined, Favorite, ShoppingCart, LocalShipping, Security, Verified, Share, Close, ContentCopy, Check, LocalOffer, ChevronRight, Star } from "@mui/icons-material";
import HomeProductCard from "../../Home/HomeProductCard";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
import { gounsPage1 } from "../../../../Data/Gouns/gouns";
import { addToWishlist } from "../../../../Redux/Customers/Wishlist/Action";
import ImageDiv from "../../../../Pages/ImageDiv";

// Dummy offers data
const offers = [
  { id: 1, title: "Bank Offer", description: "10% Instant Discount on SBI Credit Cards", terms: "Min purchase ₹3000" },
  { id: 2, title: "Bank Offer", description: "5% Cashback on Flipkart Axis Bank Card", terms: "Up to ₹500" },
  { id: 3, title: "Special Price", description: "Get extra 5% off (price inclusive of cashback/coupon)", terms: "" },
  { id: 4, title: "Partner Offer", description: "Sign up for Flipkart Pay Later and get Flipkart Gift Card worth ₹100", terms: "T&C apply" },
  { id: 5, title: "Combo Offer", description: "Buy 2 items save 5%; Buy 3 or more save 10%", terms: "See all products" }
];

// Generate random reviews
const generateRandomReviews = () => {
  const names = ["Rajesh Kumar", "Priya Sharma", "Amit Singh", "Sneha Patel", "Vikram Reddy", "Anjali Gupta", "Rahul Verma", "Pooja Mehta"];
  const comments = [
    "Great product! Exactly as shown in pictures. Very satisfied with the quality.",
    "Value for money. Good quality and fast delivery. Highly recommended!",
    "Nice product but sizing is a bit different. Otherwise good purchase.",
    "Excellent quality! Better than expected. Will buy again.",
    "Good product for the price. Comfortable and durable.",
    "Happy with the purchase. Good material and finish."
  ];
  
  return Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: names[Math.floor(Math.random() * names.length)],
    rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
    comment: comments[Math.floor(Math.random() * comments.length)],
    date: `${Math.floor(Math.random() * 28) + 1} days ago`,
    helpful: Math.floor(Math.random() * 50) + 5
  }));
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [offersOpen, setOffersOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct, review, wishlist } = useSelector((store) => store);
  const { productId } = useParams();
  const jwt = typeof window !== 'undefined' ? localStorage.getItem("jwt") : null;

  useEffect(() => {
    setReviews(generateRandomReviews());
  }, [productId]);

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
      if (typeof window !== 'undefined') localStorage.removeItem("jwt");
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
          if (typeof window !== 'undefined') localStorage.removeItem("jwt");
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
        if (typeof window !== 'undefined') localStorage.removeItem("jwt");
        showAlertMsg("Session expired. Please login again", "warning");
      } else {
        showAlertMsg("Failed to update wishlist", "error");
      }
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShareOpen(false);
    }, 1500);
  };

  useEffect(() => {
    if (productId) {
      dispatch(findProductById({ productId, jwt }));
      dispatch(getAllReviews(productId));
    }
  }, [productId, dispatch, jwt]);

  const currentProduct = customersProduct.product?.data;
  const shouldShowSizeSelector = currentProduct?.category?.name === "cloths" || currentProduct?.sizes?.length > 0;

  useEffect(() => {
    if (wishlist?.wishlistItems && Array.isArray(wishlist.wishlistItems) && currentProduct) {
      const isInWishlist = wishlist.wishlistItems.some(item => item.product?.id === currentProduct.id);
      setIsWishlisted(isInWishlist);
    }
  }, [wishlist, currentProduct]);

  if (!currentProduct && productId) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <div className="text-base font-medium text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  const avgRating = 4.3;
  const totalRatings = 42807;
  const ratingDistribution = [
    { stars: 5, percentage: 65, count: 27824 },
    { stars: 4, percentage: 20, count: 8561 },
    { stars: 3, percentage: 8, count: 3424 },
    { stars: 2, percentage: 4, count: 1712 },
    { stars: 1, percentage: 3, count: 1286 }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Alert Snackbar */}
      <Snackbar open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setShowAlert(false)} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <ImageDiv src={"https://rukminim3.flixcart.com/fk-p-flap/780/108/image/fe32987e94f2004a.jpg?q=60"} />

      {/* Mobile View */}
      <div className="lg:hidden">
        {/* Image Section with Overlay Buttons */}
        <div className="relative bg-white">
          <div className="relative">
            <img src={currentProduct?.imageUrl} alt={currentProduct?.title} className="w-full h-[450px] object-contain" />
            
            {/* Diwali Sale Banner */}
            <div className="absolute top-4 left-0 bg-gradient-to-r from-[rgb(106,74,191)] to-[rgb(187,164,249)] text-white px-4 py-1.5 text-xs font-bold shadow-lg rounded-r-full flex items-center space-x-1">
              <LocalOffer className="h-3 w-3" />
              <span>BIG DIWALI SALE LIVE</span>
            </div>

            {/* Right Side Buttons */}
            <div className="absolute top-4 right-4 flex flex-col space-y-3">
              <button onClick={handleAddToWishlist} className="bg-white rounded-full p-2.5 shadow-lg hover:scale-110 transition-transform">
                {isWishlisted ? <Favorite className="h-5 w-5 text-red-500" /> : <FavoriteOutlined className="h-5 w-5 text-gray-700" />}
              </button>
              <button onClick={() => setShareOpen(true)} className="bg-white rounded-full p-2.5 shadow-lg hover:scale-110 transition-transform">
                <Share className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white px-4 py-4 border-b-8 border-gray-100">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-lg font-semibold text-gray-900 flex-1">{currentProduct?.brand}</h1>
          </div>
          <p className="text-sm text-gray-600 mb-3">{currentProduct?.title}</p>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
              <span>{avgRating}</span>
              <Star className="h-3 w-3 ml-0.5" />
            </div>
            <span className="text-xs text-gray-500">{totalRatings.toLocaleString()} ratings</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">₹{currentProduct?.discountedPrice}</span>
            <span className="text-sm text-gray-500 line-through">₹{currentProduct?.price}</span>
            <span className="text-sm font-semibold text-green-600">{currentProduct?.discountPersent}% off</span>
          </div>
        </div>

        {/* Available Offers */}
        <div className="bg-white px-4 py-4 border-b-8 border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Available Offers</h3>
          {offers.slice(0, 3).map((offer) => (
            <div key={offer.id} className="flex items-start space-x-2 mb-3">
              <LocalOffer className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-900">{offer.title}</p>
                <p className="text-xs text-gray-600">{offer.description}</p>
              </div>
            </div>
          ))}
          <button onClick={() => setOffersOpen(true)} className="text-xs font-semibold text-blue-600 flex items-center hover:underline">
            View More <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Not Available */}
        <div className="bg-white px-4 py-4 border-b-8 border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Delivery</span>
            <span className="text-xs text-red-600 font-medium">Not available at your location</span>
          </div>
        </div>

        {/* Size Selection */}
        {shouldShowSizeSelector && (
          <div className="bg-white px-4 py-4 border-b-8 border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Size</h3>
            <div className="grid grid-cols-4 gap-2">
              {currentProduct?.sizes?.map((size) => {
                const sizeWithStock = { ...size, inStock: size.quantity > 0 };
                return (
                  <button
                    key={size.name}
                    onClick={() => sizeWithStock.inStock && setSelectedSize(sizeWithStock)}
                    disabled={!sizeWithStock.inStock}
                    className={classNames(
                      "border rounded-lg py-2 text-sm font-medium transition-all",
                      selectedSize?.name === size.name ? "border-blue-600 bg-blue-50 text-blue-600" : "",
                      sizeWithStock.inStock ? "border-gray-300 text-gray-900 hover:border-gray-400" : "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                    )}
                  >
                    {size.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Product Details */}
        <div className="bg-white px-4 py-4 border-b-8 border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Product Details</h3>
          <div className="space-y-2">
            <div className="flex">
              <span className="text-xs text-gray-600 w-24">Brand</span>
              <span className="text-xs text-gray-900 font-medium">{currentProduct?.brand}</span>
            </div>
            <div className="flex">
              <span className="text-xs text-gray-600 w-24">Color</span>
              <span className="text-xs text-gray-900 font-medium">{currentProduct?.color}</span>
            </div>
            <div className="flex">
              <span className="text-xs text-gray-600 w-24">Category</span>
              <span className="text-xs text-gray-900 font-medium">{currentProduct?.category?.name}</span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xs text-gray-700 leading-relaxed">{currentProduct?.description}</p>
          </div>
        </div>

        {/* Ratings & Reviews */}
        <div className="bg-white px-4 py-4 border-b-8 border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Ratings & Reviews</h3>
          </div>

          {/* Overall Rating */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">{avgRating}</div>
                <Rating value={avgRating} precision={0.1} readOnly size="small" />
                <div className="text-xs text-gray-500 mt-1">{totalRatings.toLocaleString()} ratings</div>
              </div>
              <div className="flex-1 space-y-1">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600 w-4">{item.stars}</span>
                    <Star className="h-3 w-3 text-gray-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-4">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
                    <span>{review.rating}</span>
                    <Star className="h-2.5 w-2.5 ml-0.5" />
                  </div>
                  <span className="text-xs font-medium text-gray-900">{review.name}</span>
                </div>
                <p className="text-xs text-gray-700 mb-2">{review.comment}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{review.date}</span>
                  <button className="text-xs text-gray-600 hover:text-gray-900">👍 Helpful ({review.helpful})</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products */}
        <div className="bg-white px-4 py-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Similar Products</h3>
          <div className="flex overflow-x-auto space-x-3 pb-2 -mx-4 px-4 scrollbar-hide">
            {gounsPage1.slice(0, 6).map((item, index) => (
              <div key={index} className="flex-shrink-0 w-32">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                  <div className="p-2">
                    <p className="text-xs text-gray-900 font-medium truncate">{item.brand}</p>
                    <p className="text-xs font-bold text-gray-900">₹{item.selling_price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center space-x-3 z-50">
          <button onClick={handleAddToWishlist} className="border-2 border-gray-300 rounded-lg px-6 py-2.5 font-semibold text-sm text-gray-900 hover:bg-gray-50 transition-colors">
            {isWishlisted ? <Favorite className="h-5 w-5 text-red-500" /> : <FavoriteOutlined className="h-5 w-5" />}
          </button>
          <button onClick={handleSubmit} disabled={shouldShowSizeSelector && !selectedSize} className="flex-1 bg-orange-500 text-white rounded-lg px-6 py-2.5 font-semibold text-sm hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
            ADD TO CART
          </button>
        </div>
        <div className="h-16"></div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Left - Image */}
          <div className="sticky top-6 h-fit">
            <div className="relative bg-white rounded-lg overflow-hidden border border-gray-200">
              <img src={currentProduct?.imageUrl} alt={currentProduct?.title} className="w-full h-[600px] object-contain" />
              
              {/* Diwali Sale Banner */}
              <div className="absolute top-4 left-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 text-sm font-bold shadow-lg rounded-r-full flex items-center space-x-2">
                <LocalOffer className="h-4 w-4" />
                <span>DIWALI SALE LIVE</span>
              </div>

              {/* Right Side Buttons */}
              <div className="absolute top-4 right-4 flex flex-col space-y-3">
                <button onClick={handleAddToWishlist} className="bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform">
                  {isWishlisted ? <Favorite className="h-6 w-6 text-red-500" /> : <FavoriteOutlined className="h-6 w-6 text-gray-700" />}
                </button>
                <button onClick={() => setShareOpen(true)} className="bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform">
                  <Share className="h-6 w-6 text-gray-700" />
                </button>
              </div>

              <div className="flex justify-center space-x-3 p-4 bg-gray-50">
                <button className="w-20 h-20 border-2 border-blue-600 rounded-lg overflow-hidden">
                  <img src={currentProduct?.imageUrl} alt="" className="w-full h-full object-cover" />
                </button>
              </div>
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-6">
            {/* Title & Brand */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{currentProduct?.brand}</h1>
              <p className="text-base text-gray-600">{currentProduct?.title}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-green-600 text-white px-2.5 py-1 rounded text-sm font-semibold">
                <span>{avgRating}</span>
                <Star className="h-4 w-4 ml-1" />
              </div>
              <span className="text-sm text-gray-500">{totalRatings.toLocaleString()} ratings</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">₹{currentProduct?.discountedPrice}</span>
              <span className="text-lg text-gray-500 line-through">₹{currentProduct?.price}</span>
              <span className="text-base font-semibold text-green-600">{currentProduct?.discountPersent}% off</span>
            </div>

            {/* Available Offers */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Available Offers</h3>
              {offers.slice(0, 3).map((offer) => (
                <div key={offer.id} className="flex items-start space-x-3 mb-3 last:mb-0">
                  <LocalOffer className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{offer.title}</p>
                    <p className="text-sm text-gray-600">{offer.description}</p>
                  </div>
                </div>
              ))}
              <button onClick={() => setOffersOpen(true)} className="text-sm font-semibold text-blue-600 flex items-center hover:underline mt-2">
                View More <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Not Available */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-gray-700">Delivery</span>
                <span className="text-sm text-red-600 font-medium">Not available at your location</span>
              </div>
            </div>

            {/* Size Selection */}
            {shouldShowSizeSelector && (
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">Select Size</h3>
                <div className="grid grid-cols-6 gap-3">
                  {currentProduct?.sizes?.map((size) => {
                    const sizeWithStock = { ...size, inStock: size.quantity > 0 };
                    return (
                      <button
                        key={size.name}
                        onClick={() => sizeWithStock.inStock && setSelectedSize(sizeWithStock)}
                        disabled={!sizeWithStock.inStock}
                        className={classNames(
                          "border rounded-lg py-3 text-sm font-medium transition-all",
                          selectedSize?.name === size.name ? "border-blue-600 bg-blue-50 text-blue-600" : "",
                          sizeWithStock.inStock ? "border-gray-300 text-gray-900 hover:border-gray-400" : "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                        )}
                      >
                        {size.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button onClick={handleSubmit} disabled={shouldShowSizeSelector && !selectedSize} className="flex-1 bg-orange-500 text-white rounded-lg py-4 font-bold text-base hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>ADD TO CART</span>
              </button>
              <button className="flex-1 bg-orange-600 text-white rounded-lg py-4 font-bold text-base hover:bg-orange-700 transition-colors">
                BUY NOW
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
              <div className="space-y-3">
                <div className="flex">
                  <span className="text-sm text-gray-600 w-32">Brand</span>
                  <span className="text-sm text-gray-900 font-medium">{currentProduct?.brand}</span>
                </div>
                <div className="flex">
                  <span className="text-sm text-gray-600 w-32">Color</span>
                  <span className="text-sm text-gray-900 font-medium">{currentProduct?.color}</span>
                </div>
                <div className="flex">
                  <span className="text-sm text-gray-600 w-32">Category</span>
                  <span className="text-sm text-gray-900 font-medium">{currentProduct?.category?.name}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-700 leading-relaxed">{currentProduct?.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ratings & Reviews - Full Width */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Ratings & Reviews</h3>
          
          {/* Overall Rating */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">{avgRating}</div>
                <Rating value={avgRating} precision={0.1} readOnly size="medium" />
                <div className="text-sm text-gray-500 mt-2">{totalRatings.toLocaleString()} ratings</div>
              </div>
              <div className="flex-1 space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 w-6">{item.stars}</span>
                    <Star className="h-4 w-4 text-gray-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-500 w-16 text-right">{item.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded text-sm font-semibold">
                    <span>{review.rating}</span>
                    <Star className="h-3.5 w-3.5 ml-0.5" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{review.name}</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{review.date}</span>
                  <button className="text-xs text-gray-600 hover:text-gray-900">👍 Helpful ({review.helpful})</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Similar Products</h3>
          <div className="grid grid-cols-6 gap-4">
            {gounsPage1?.slice(0, 6).map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <img src={item?.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-3">
                  <p className="text-sm text-gray-900 font-medium truncate">{item?.brand}</p>
                  <p className="text-xs text-gray-600 truncate mb-2">{item?.title}</p>
                  <p className="text-sm font-bold text-gray-900">₹{item?.selling_price}</p>
                  <p className="text-xs text-gray-500 line-through">₹{item?.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offers Dialog */}
      <Dialog open={offersOpen} onClose={() => setOffersOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="flex items-center justify-between">
          <span className="text-lg font-bold">Available Offers</span>
          <IconButton onClick={() => setOffersOpen(false)} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div className="space-y-4">
            {offers.map((offer) => (
              <div key={offer.id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-start space-x-3">
                  <LocalOffer className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{offer.title}</p>
                    <p className="text-sm text-gray-700 mb-1">{offer.description}</p>
                    {offer.terms && <p className="text-xs text-gray-500">{offer.terms}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareOpen} onClose={() => setShareOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle className="flex items-center justify-between">
          <span className="text-lg font-bold">Share Product</span>
          <IconButton onClick={() => setShareOpen(false)} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="text-center py-4">
            <p className="text-sm text-gray-600 mb-4">Share this product with your friends</p>
            <button onClick={handleShare} className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors">
              {copied ? <Check className="h-5 w-5" /> : <ContentCopy className="h-5 w-5" />}
              <span>{copied ? "Link Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}