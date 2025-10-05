
// OrderCard.js - Enhanced Order Card Component
import { Box, Grid, Typography, Divider, Button, useMediaQuery, useTheme } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order, isMobile }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-600';
      case 'returned':
        return 'text-orange-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getStatusIcon = (status) => {
    return status?.toLowerCase() === 'delivered' ? (
      <FiberManualRecordIcon className="text-green-600" sx={{ fontSize: "1rem" }} />
    ) : (
      <AdjustIcon className="text-yellow-600" sx={{ fontSize: "1rem" }} />
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Box 
      className={`${
        isMobile ? 'p-4' : 'p-6'
      } shadow-lg hover:shadow-xl border rounded-lg space-y-4 cursor-pointer transition-shadow bg-white`}
      onClick={() => navigate(`/account/order/${order._id}`)}
    >
      {/* Header Section */}
      <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'justify-between items-start'}`}>
        <div className="flex-1">
          <Typography 
            variant={isMobile ? "subtitle2" : "subtitle1"} 
            fontWeight="bold" 
            className="text-gray-800"
          >
            Order #{order.orderNumber || order._id?.slice(-8).toUpperCase()}
          </Typography>
          <Typography 
            variant="caption" 
            color="textSecondary"
            className="block mt-1"
          >
            Ordered on {formatDate(order.orderDate)}
          </Typography>
        </div>
        
        <div className={`${isMobile ? 'self-start' : 'text-right'}`}>
          <div className="flex items-center gap-2">
            {getStatusIcon(order.orderStatus)}
            <Typography 
              variant="subtitle2" 
              className={`font-medium ${getStatusColor(order.orderStatus)}`}
            >
              {order.orderStatus === "DELIVERED" ? "Delivered" : "Expected Delivery"}
            </Typography>
          </div>
          <Typography variant="body2" color="textSecondary" className="mt-1">
            {formatDate(order.deliveryDate)}
          </Typography>
        </div>

        {isMobile && (
          <ArrowForwardIosIcon className="text-gray-400 self-end" sx={{ fontSize: "1rem" }} />
        )}
      </div>

      <Divider />

      {/* Order Items */}
      <div className="space-y-4">
        {order?.orderItems?.slice(0, isMobile ? 2 : order.orderItems.length).map((item, index) => (
          <div key={item._id || index}>
            {isMobile ? (
              // Mobile Layout
              <div className="space-y-3">
                <div className="flex gap-3">
                  <img
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover object-top rounded-lg flex-shrink-0"
                    src={item?.product?.imageUrl}
                    alt={item?.product?.title}
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-800 truncate">
                      {item?.product?.title}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500">
                      <span>Size: {item?.size}</span>
                      <span>Qty: {item?.quantity}</span>
                    </div>
                    <p className="font-bold text-lg text-gray-900 mt-2">
                      ₹{item?.discountedPrice?.toLocaleString()}
                    </p>
                  </div>
                </div>

                {order.orderStatus === "DELIVERED" && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/account/rate/${item.product._id}`);
                    }}
                    startIcon={<StarIcon />}
                    variant="outlined"
                    size="small"
                    className="w-full mt-2"
                    sx={{ 
                      borderColor: '#3B82F6', 
                      color: '#3B82F6',
                      '&:hover': { borderColor: '#2563EB', backgroundColor: '#EFF6FF' }
                    }}
                  >
                    Rate & Review
                  </Button>
                )}
              </div>
            ) : (
              // Desktop Layout
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={7}>
                  <div className="flex gap-4">
                    <img
                      className="w-20 h-20 object-cover object-top rounded-lg flex-shrink-0"
                      src={item?.product?.imageUrl}
                      alt={item?.product?.title}
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-2">
                        {item?.product?.title}
                      </p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>Size: {item?.size}</span>
                        <span>Quantity: {item?.quantity}</span>
                      </div>
                    </div>
                  </div>
                </Grid>

                <Grid item xs={6} sm={3} md={2}>
                  <p className="font-bold text-lg text-gray-900">
                    ₹{item?.discountedPrice?.toLocaleString()}
                  </p>
                </Grid>

                <Grid item xs={6} sm={3} md={3}>
                  {order.orderStatus === "DELIVERED" && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/account/rate/${item.product._id}`);
                      }}
                      startIcon={<StarIcon />}
                      variant="outlined"
                      size="small"
                      sx={{ 
                        borderColor: '#3B82F6', 
                        color: '#3B82F6',
                        '&:hover': { borderColor: '#2563EB', backgroundColor: '#EFF6FF' }
                      }}
                    >
                      Rate & Review
                    </Button>
                  )}
                </Grid>
              </Grid>
            )}

            {index < (isMobile ? Math.min(2, order.orderItems.length) - 1 : order.orderItems.length - 1) && (
              <Divider className="mt-4" />
            )}
          </div>
        ))}

        {/* Show more items indicator for mobile */}
        {isMobile && order?.orderItems?.length > 2 && (
          <div className="text-center py-2">
            <Typography variant="body2" color="textSecondary">
              +{order.orderItems.length - 2} more items
            </Typography>
          </div>
        )}
      </div>

      {/* Order Total for Mobile */}
      {isMobile && (
        <>
          <Divider />
          <div className="flex justify-between items-center">
            <Typography variant="subtitle2" className="text-gray-600">
              Order Total
            </Typography>
            <Typography variant="h6" className="font-bold text-gray-900">
              ₹{order?.totalDiscountedPrice?.toLocaleString() || 
                order?.orderItems?.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0)?.toLocaleString()}
            </Typography>
          </div>
        </>
      )}
    </Box>
  );
};

export default OrderCard;