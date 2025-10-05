import React from "react";
import { Avatar, Box, Typography, Grid } from "@mui/material";

const ProductReviewCard = ({ item }) => {
  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (error) {
      return "Date not available";
    }
  };

  // Helper function to get user initial
  const getUserInitial = (user) => {
    if (!user) return "U";
    
    const firstName = user.firstName || user.name || "";
    return firstName.charAt(0).toUpperCase() || "U";
  };

  // Helper function to get user name
  const getUserName = (user) => {
    if (!user) return "Anonymous User";
    
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (user.name) {
      return user.name;
    }
    
    return "Anonymous User";
  };

  // Safety check for item
  if (!item) return null;

  return (
    <Box className="border-b border-gray-200 pb-4 mb-4">
      <Grid container spacing={2} alignItems="flex-start">
        {/* User Avatar and Info */}
        <Grid item xs={12} sm={3} md={2}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar 
              sx={{ 
                width: 48, 
                height: 48, 
                bgcolor: "primary.main",
                mb: 1
              }}
            >
              {getUserInitial(item.user)}
            </Avatar>
            <Typography variant="body2" fontWeight="medium" textAlign="center">
              {getUserName(item.user)}
            </Typography>
            <Typography variant="caption" color="text.secondary" textAlign="center">
              {formatDate(item.createdAt || item.date)}
            </Typography>
          </Box>
        </Grid>

        {/* Review Content */}
        <Grid item xs={12} sm={9} md={10}>
          <Box>
            {/* Review Title (if exists) */}
            {item.title && (
              <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                {item.title}
              </Typography>
            )}

            {/* Review Text */}
            <Typography variant="body2" color="text.primary" paragraph>
              {item.review || item.comment || "No review text provided"}
            </Typography>

            {/* Helpful/Likes count (if exists) */}
            {item.helpful && (
              <Typography variant="caption" color="text.secondary">
                {item.helpful} people found this helpful
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductReviewCard;