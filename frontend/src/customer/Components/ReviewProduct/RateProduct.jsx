import {
  Button,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../../Redux/Customers/Review/Action";
import { createRating } from "../../../Redux/Customers/Rating/Action";
import { useNavigate, useParams } from "react-router-dom";
import { findProductById } from "../../../Redux/Customers/Product/Action";
import CustomerRoutes from "../../../Routers/CustomerRoutes";

const RateProduct = () => {
  const [formData, setFormData] = useState({ title: "" });
  const [rating, setRating] = useState(0);
  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const product = customersProduct.product?.data || customersProduct.product;
  const { productId } = useParams();
  const navigate = useNavigate();

  const handleRateProduct = (e, value) => {
    setRating(value);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create rating if user has provided a rating
      if (rating > 0) {
        await dispatch(createRating({
          rating: rating,
          productId: productId
        }));
      }

      // Create review if user has provided review text
      if (formData.title.trim()) {
        await dispatch(createReview({
          review: formData.title,
          productId: productId
        }));
      }

      // Reset form
      setFormData({ title: "" });
      setRating(0);
      
      // Navigate back to product page
      navigate(`/product/${productId}`);
    } catch (error) {
      console.error("Error submitting review/rating:", error);
    }
  };

  useEffect(() => {
    dispatch(findProductById({ productId }));
  }, [dispatch, productId]);

  return (
    <div className="px-5 lg:px-20">
      <h1 className="text-xl p-5 shadow-lg mb-8 font-bold">
        Rate & Review Product
      </h1>
      <Grid sx={{ justifyContent: "space-between" }} container>
        <Grid
          className="flex lg:items-center shadow-lg border rounded-md p-5"
          item
          xs={12}
          lg={5.8}
        >
          <div>
            <img
              className="w-[5rem] lg:w-[15rem]"
              src={product?.imageUrl}
              alt={product?.title || "Product"}
            />
          </div>
          <div className="ml-3 lg:ml-5 space-y-2 lg:space-y-4">
            <p className="lg:text-lg">{product?.title}</p>
            <p className="opacity-50 font-semibold">
              {product?.brand}
            </p>
            <p>₹{product?.price}</p>
            <p>Size: Free</p>
            {product?.color && (
              <p>Color: {product?.color}</p>
            )}
            <div className="flex items-center space-x-3">
              <Rating name="read-only" value={4.6} precision={0.5} readOnly />
              <p className="opacity-60 text-sm">42807 Ratings</p>
              <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {3789} reviews
              </p>
            </div>
            <div>
              <p className="space-y-2 font-semibold">
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 mr-2"
                />
                <span>Delivered On Mar 03</span>
              </p>
              <p className="text-xs">Your Item Has Been Delivered</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className={`${!isLargeScreen ? "py-10" : ""} space-y-5`}>
            <div className="shadow-md border rounded-md p-5">
              <Typography className="font-semibold" component="legend">
                Rate This Product
              </Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  handleRateProduct(event, newValue);
                }}
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5 shadow-md border rounded-md"
            >
              <TextField
                label="Review Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.title}
                onChange={handleChange}
                name="title"
                placeholder="Write a brief title for your review"
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={rating === 0 && !formData.title.trim()}
              >
                Submit Review
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default RateProduct;