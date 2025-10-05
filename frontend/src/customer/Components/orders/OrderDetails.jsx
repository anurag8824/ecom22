import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import OrderTraker from "./OrderTraker";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import AddressCard from "../adreess/AdreessCard";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import BackdropComponent from "../BackDrop/Backdrop";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  const currentOrder = order.order;

  const getStep = (status) => {
    switch (status) {
      case "PENDING":
        return 0;
      case "PLACED":
        return 1;
      case "CONFIRMED":
        return 2;
      case "SHIPPED":
        return 3;
      case "DELIVERED":
        return 5;
      default:
        return 0;
    }
  };

  return (
    <>
      {!order.loading && currentOrder && (
        <Box className="px-2 lg:px-36 space-y-7 my-5">
          {/* Delivery Address */}
          <Grid container className="p-4 shadow-lg rounded-md bg-white">
            <Grid item xs={12}>
              <Typography variant="h6" className="pb-2 font-bold">
                Delivery Address
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <AddressCard address={currentOrder.shippingAddress} />
            </Grid>
          </Grid>

          {/* Order Tracker & Action */}
          <Box className="p-5 shadow-lg border rounded-md bg-white">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={12} md={9}>
                <OrderTraker activeStep={getStep(currentOrder.orderStatus)} />
              </Grid>
              <Grid item>
                {currentOrder.orderStatus === "DELIVERED" ? (
                  <Button color="error" variant="text">
                    RETURN
                  </Button>
                ) : (
                  <Button sx={{ color: deepPurple[500] }} variant="text">
                    Cancel Order
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>

          {/* Order Items */}
          <Box className="space-y-5">
            {currentOrder.orderItems.map((item) => (
              <Grid
                container
                key={item._id}
                className="shadow-xl rounded-md p-5 border bg-white"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={6}>
                  <Box className="flex items-center">
                    <img
                      className="w-[5rem] h-[5rem] object-cover object-top"
                      src={item?.product.imageUrl}
                      alt=""
                    />
                    <Box className="ml-5 space-y-2">
                      <Typography variant="body1" className="font-medium">
                        {item.product.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Size: {item.size} | Qty: {item.quantity} | Color: Pink
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Seller: {item.product.brand}
                      </Typography>
                      <Typography variant="subtitle2" fontWeight="bold">
                        ₹{item.discountedPrice}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  {currentOrder.orderStatus === "DELIVERED" && (
                    <Box
                      sx={{ color: deepPurple[500] }}
                      onClick={() => navigate(`/account/rate/${item.product._id}`)}
                      className="flex items-center cursor-pointer"
                    >
                      <StarIcon sx={{ fontSize: "2rem" }} className="mr-1" />
                      <span>Rate & Review</span>
                    </Box>
                  )}
                </Grid>
              </Grid>
            ))}
          </Box>

          {/* Order Summary */}
          <Box className="p-5 shadow-lg border rounded-md bg-white space-y-4">
            <Typography variant="h6" className="font-bold">
              Order Summary
            </Typography>
            <Divider />
            <Grid container justifyContent="space-between">
              <Typography>Subtotal</Typography>
              <Typography>₹{currentOrder.totalPrice}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography>Shipping Fee</Typography>
              <Typography>₹{currentOrder.shippingCharges || 0}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography>Discount</Typography>
              <Typography>-₹{currentOrder.discounte || 0}</Typography>
            </Grid>
            <Divider />
            <Grid container justifyContent="space-between">
              <Typography variant="subtitle1" className="font-semibold">
                Total Amount
              </Typography>
              <Typography variant="subtitle1" className="font-semibold">
                ₹{currentOrder.totalDiscountedPrice}
              </Typography>
            </Grid>
          </Box>

          {/* Order Info */}
          <Box className="p-5 shadow-lg border rounded-md bg-white space-y-2">
            <Typography variant="h6" className="font-bold">
              Order Info
            </Typography>
            <Typography>Order No: {currentOrder.orderNumber}</Typography>
            <Typography>Order Date: {new Date(currentOrder.orderDate).toDateString()}</Typography>
            <Typography>Payment Method: {currentOrder.paymentMethod || "Online"}</Typography>
            <Typography>Payment Status: {currentOrder.paymentDetails.paymentStatus || "Unpaid"}</Typography>
            <Typography>Order Status: {currentOrder.orderStatus}</Typography>
          </Box>
        </Box>
      )}
      <BackdropComponent open={order.loading} />
    </>
  );
};

export default OrderDetails;
